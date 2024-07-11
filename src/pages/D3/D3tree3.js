//随机数，用于绑定id
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export class D3Tree {
  constructor(container, options = {}) {
    if (!container) return
    const { offsetWidth, offsetHeight } = container

    const defaultOptions = {
      width: offsetWidth,
      height: offsetHeight - 20,
      marginTop: (offsetHeight - 20) / 2,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: offsetWidth,
      textMaxLength: 11,
    }

    const { width, height, marginTop, marginRight, marginBottom, marginLeft, textMaxLength } = Object.assign(defaultOptions, options)
    this.width = width
    this.height = height
    this.marginTop = marginTop
    this.marginRight = marginRight
    this.marginBottom = marginBottom
    this.marginLeft = marginLeft
    this.textMaxLength = textMaxLength

    this.textPadding = 8
    this.rootNodeLength = 0
    this.rootNodeHeight = 40
    this.textNodeWidth = 156
    this.textNodeHeight = 52
    this.textNodePadding = 8
    this.subTextWidth = 44
    this.subTextHeight = 18
    this.circleRadius = 6
    this.visibility = 'hidden'
    this.fontSize = 12
    this.nodeSize = [180, 160]
    this.container = container
    // 初始比例
    // this.scale = width / container.offsetWidth

    // 创建折线生成器
    this.theLine = d3
      .line()
      .x(d => d.x)
      .y(d => d.y)

    //
    this.root = []
  }
  create(data) {
    this.sourceData = data
    this.tree = d3
      .tree()
      .nodeSize([180, 160])
      .separation(function(t, e) {
        let n = t.parent === e.parent ? 1 : 2
        if (n > 1) {
          let r = 0
          r = t.children ? r + t.children.length : r
          n = (r = e.children ? r + e.children.length : r) / 2 + 1
        }
        return n
      })
    // 区分上下
    this.top = data[0]
    this.bottom = data[1]
    // this.root = [d3.hierarchy(this.top)]
    this.root = [d3.hierarchy(this.top), d3.hierarchy(this.bottom)]

    this.createLayout()
    this.createTreeNode()
    // 将缩放对象应用于SVG元素
    this.zoomHandler()
    this.drawTree()

    this.container.appendChild(this.svg.node())
  }

  drawTree() {
    for (let index = 0; index < this.root.length; index++) {
      // 计算布局

      const root = this.root[index]
      root.x0 = this.height / 2
      root.y0 = 0
      root.descendants().forEach(d => {
        d.id = uuid()
        d._children = d.children

        // if (index) {
        //   d.y = -d.y
        // }
      })

      this.update(null, this.root[index], index)
    }
  }
  expandNode(event, source, i) {
    return this.update(event, source, i)
  }
  getActualWidthOfChars(text, options = {}) {
    text = this.setTextMaxLength(text)
    const { size = 14, family = 'Microsoft YaHei' } = options
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = `${size}px ${family}`
    const metrics = ctx.measureText(text)
    const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight)
    return Math.max(metrics.width, actual)
  }

  setTextMaxLength(text) {
    if (!text) return
    if (text.length > this.textMaxLength) {
      text = text.slice(0, this.textMaxLength) + '...'
    }
    return text
  }

  // asyncExpandNode(event, source, i) {
  //   this.sourceData.children[5].children[0].children = qwe.Result.Children

  //   const data = JSON.parse(JSON.stringify(this.sourceData))
  //   // 区分左右
  //   this.left = { ...data, children: data.children.filter((e, i) => i <= Math.floor(data.children.length / 2)) }
  //   this.right = { ...data, children: data.children.filter((e, i) => i > Math.floor(data.children.length / 2)) }

  //   this.root = [d3.hierarchy(this.left), d3.hierarchy(this.right)]

  //   this.drawTree()
  // }

  createLayout() {
    this.svg = d3
      .create('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      // .attr('viewBox', [-this.width/2, -this.height/2, this.width/2, this.height/2])
      .attr('viewBox', [0, 0, this.width, this.height])
      .attr('style', 'max-width: 100%; height: auto; font: 12px sans-serif; user-select: none;')

    this.wrap = this.svg.append('g')
  }

  createTreeNode(className) {
    this.gLink = this.wrap
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#ADB3C2')
      .attr('stroke-width', 0.5)
      // .attr('stroke-dasharray', 3)
      .attr('stroke-opacity', 0.6)
      .attr('class', 'link-group')

    this.gNode = this.wrap
      .append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all')
      .attr('class', 'node-group')

    if (className) {
      this.gNode.attr('class', `node-group ${className}`)
      this.gLink.attr('class', `link-group ${className}`)
    }
  }

  update(event, source, i) {
    // 更新位置
    const tree = this.tree(this.root[i])
    this.root[i].descendants().forEach(d => {
      if (i == 0) d.y = -d.y
    })

    const duration = event?.altKey ? 3500 : 250
    const nodesData = this.root[i].descendants()
    const linksData = this.root[i].links()

    const transition = this.svg.transition().duration(duration)

    const node = this.gNode.selectAll(`.node_${i}`).data(nodesData, d => d.id)
    const link = this.gLink.selectAll(`.link_${i}`).data(linksData, d => d.target.id)

    // 创建 Node
    this.createNode(node, source, transition, i)

    // 创建 Link
    this.createLink(link, source, transition, i)

    // 更新位置
    this.root[i].eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  drawRect(t, e, n) {
    // 获取元素并插入矩形
    const container = d3.select(`#${t}`)
    container
      .append('rect')
      .attr('x', -this.textNodeWidth / 2)
      .attr('y', d => -(this.textNodeHeight + this.fontSize) / 2)
      .attr('height', this.textNodeHeight)
      .attr('width', this.textNodeWidth)
      .attr('id', d => {
        const id = 'rect' + uuid()
        d.uuid = id
        return id
      })
      // .on('mouseover', this.rectMo(true))
      // .on('mouseout', this.rectMo(false))
      .attr('rx', 2)
      .attr('stroke', d => {
        return [-1, 2].includes(d.data.type) ? '#3981F4' : '#FF4B4B'
      })
      .attr('fill', d => {
        return d.data.type === -1 ? '#E7EFFF' : '#ebeff7'
      })

    // 添加删除节点图标
    const removeCircle = container
      .append('g')
      .attr('class', 'circle-remove')
      .attr('transform', `translate(${this.textNodeWidth / 2},${-this.textNodeHeight / 2 - this.circleRadius}) rotate(45)`)
      .attr('visibility', this.visibility)
      .style('cursor', 'pointer')
    // .on('click', (d, i) => {
    //   d3.event.stopPropagation();
    //   this.deleteNode(i, n);
    // });

    // 绘制删除节点图标
    removeCircle
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', this.circleRadius)
      .attr('fill', '#E85454')

    removeCircle
      .append('path')
      .attr('d', 'm 0 -4 l 0 8')
      .attr('stroke-width', 1)
      .attr('stroke', '#fff')

    removeCircle
      .append('path')
      .attr('d', `m -4 0 l ${8} 0`)
      .attr('stroke-width', 1)
      .attr('stroke', '#fff')
  }

  createNode(node, source, transition, i) {
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', d => `translate(${source.x0},${source.y0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('class', `node_${i}`)
      .attr('id', d => `g${d.id}`)

    nodeEnter
      .filter(d => d.depth == 1)
      .on('mouseenter', (event, d) => {
        this.mouseovered(true, d, i)
      })
      .on('mouseleave', (event, d) => {
        this.mouseovered(false, d, i)
      })

    // nodeEnter.each(node => {
    //   if (node.depth !== 0) {
    // if (node.data.name.length <= 11) this.drawText(`g${node.id}`, i, node);
    // else this.drawTextMultiline(`g${node.id}`, i);
    // this.drawRect(`g${node.id}`, i, node)

    // if (node.data.headLabel) this.drawPopup(`g${node.id}`, i);

    // const cornerLabelParams = {
    //   id: `g${node.id}`,
    //   dirTop: i,
    //   x: () => this.textNodeWidth / 3 - 6,
    //   y: () => -this.textNodeHeight / 2 + 1,
    //   key: 'cornerLabel',
    //   offsetX: () => this.textNodeWidth / 3 - this.subTextWidth / 2 - 6,
    //   offsetY: () => -this.textNodeHeight / 2 - this.fontSize,
    //   rectColor: this.getStatusColor(node.data).rectColor,
    //   textColor: this.getStatusColor(node.data).textColor
    // };

    // if (node.data.lineText && node.data.lineText.stockPercent) this.drawLineText(`g${node.id}`, direction, node);
    // if (node.data.cornerLabel) this.drawTextWidthRect(cornerLabelParams);
    // if (node.depth && node.data.hasNext) this.drawCircle(`g${node.id}`, direction);
    // if (node.depth) this.drawTriangle(`g${node.id}`, i);
    //   }
    // })

    // 添加框
    const nodeRect = nodeEnter
      .append('rect')
      .attr('width', d => {
        d.width = 156
        d.halfWidth = d.width / 2
        return d.width
      })
      .attr('height', 52)
      .attr('x', d => -d.halfWidth)
      .attr('y', -26)
      .attr('rx', 2)
      .attr('ry', 2)

    nodeRect.filter(d => d.depth == 0).attr('fill', '#128BED')

    nodeRect
      .filter(d => d.depth >= 1)
      // .attr('fill', '#fff')
      //   .attr('fill', '#ebeff7')
      //   .attr('stroke', '#FF4B4B')
      .attr('stroke', d => {
        return [-1, 2].includes(d.data.type) ? '#3981F4' : '#FF4B4B'
      })
      .attr('fill', d => {
        return d.data.type === -1 ? '#E7EFFF' : '#ebeff7'
      })

    nodeEnter
      .append('text')
      .attr('y', 5)
      .attr('x', 0)
      .attr('fill', d => (d.depth ? '#000' : '#fff'))
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('paint-order', 'stroke')
      .text(d => {
        return this.setTextMaxLength(d?.data?.name)
      })

    // 添加title
    nodeEnter.append('title').text(d => d?.data?.name)

    // 最终受益人
    const popup = nodeEnter.filter(d => d.data.headLabel)
    popup && this.drawPopup(popup)

    // 百分比
    const childRect = nodeEnter.filter(d => d.depth >= 1)
    childRect && this.drawLineText(childRect, i)

    childRect && this.drawTriangle(childRect, i)
    // childRect && this.drawRect(childRect, i)

    // 添加移入动画
    const nodeUpdate = nodeEnter
      .merge(node)
      .transition(transition)
      .attr('transform', d => {
        if (d.depth) return `translate(${d.x},${d.y})`
        // if (d.depth) return `translate(${i ? d.x - d.halfWidth : d.x + d.halfWidth},${d.y})`
        return `translate(${d.x},${d.y})`
      })
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    // 移除动画偏移
    const height = 132
    const padding = 10
    let transitionY = 0
    if (i) transitionY = -(height / 2 + padding)
    const nodeExit = node
      .exit()
      .transition(transition)
      .attr('transform', d => {
        return `translate(${source.x},${source.y + transitionY})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .remove()
  }

  drawTriangle(wrap, e) {
    // 获取当前对象
    const self = this

    // 创建 g 元素
    const container = wrap
      .append('g')
      .attr('class', 'node-triangle')
      .attr('fill', '#3981f4')
      .attr('transform', d => {
        if (!d.depth) {
          return `translate(0,${-self.textNodeHeight / 2 + self.fontSize / 4})`
        } else if (e > 0) {
          return `translate(0,${-self.textNodeHeight / 2 - self.fontSize / 2})`
        } else {
          const parentSize = self.nodeSize[1]
          if (d.parent && d.parent.children.length > 1) {
            return `translate(0,${parentSize / 2})`
          } else if (d.depth !== 1) {
            return `translate(0,${-e * parentSize - self.textNodeHeight + self.circleRadius})`
          } else {
            return `translate(0,${-e * parentSize - self.textNodeHeight / 2 + 3})`
          }
        }
      })

    // 添加三角形路径
    container
      .append('path')
      .attr('d', d => (d.depth || (e < 0 && d.children) ? 'M 0 0 L -5 -10  L 5 -10' : undefined))
      .each(function(d) {
        d.triangle = this
      })
  }

  drawLineText(wrap, i, n) {
    const reverse = i

    // 创建 g 元素
    const container = wrap.append('g')

    // 添加文本
    container
      .append('text')
      .attr('class', 'line-text')
      .attr('text-anchor', 'middle')
      .attr('y', d => {
        if (reverse > 0) {
          if (d.depth <= 1 && d.parent && d.parent.children.length > 1) return -this.textNodeHeight - this.fontSize / 2
          if (d.parent && d.parent.children.length > 1) return -this.textNodeHeight
          return (-this.nodeSize[1] - this.fontSize) / 2
        } else {
          if (d.parent && d.parent.children.length > 1) return this.textNodeHeight - this.fontSize / 2
          return this.nodeSize[1] / 2 - this.fontSize / 2
        }
      })
      .attr('fill', '#fff')
      .style('font-size', this.fontSize)
      .text(d => {
        return d.data?.lineText?.stockPercent
      })

    // 插入矩形
    container
      .insert('rect', 'text')
      .attr('height', d => this.subTextHeight)
      // .attr('width', d => textBoxWidth)

      .attr('width', d => {
        const marginW = 16

        d.width =
          this.getActualWidthOfChars(d.data?.lineText?.stockPercent, {
            size: 12,
            family: 'Microsoft YaHei',
          }) +
          marginW * 2
        d.halfWidth = d.width / 2
        return d.width
      })
      .attr('x', d => -d.halfWidth)
      .attr('y', d => {
        if (reverse > 0) {
          if (d.depth <= 1 && d.parent && d.parent.children.length > 1) return -this.textNodeHeight - this.subTextHeight - this.fontSize / 8
          if (d.parent && d.parent.children.length > 1) return -this.textNodeHeight - this.fontSize - this.fontSize / 8
          return -this.nodeSize[1] / 2 - this.subTextHeight - this.fontSize / 8
        } else {
          if (d.parent && d.parent.children.length > 1) return this.textNodeHeight / 2 + this.fontSize / 2
          return this.textNodeHeight - this.fontSize / 8 + this.fontSize - 2
        }
      })
      .attr('rx', 2)
      .attr('stroke', d => (d.data.type === 2 ? '#3981F4' : '#FF4B4B'))
      .attr('fill', d => (d.data.type === 2 ? '#3981F4' : '#FF4B4B'))

    // 如果存在描述，绘制描述
    // if (n.data.lineText && n.data.lineText.desc) this.drawDesc(container, reverse, textBoxWidth);
  }

  drawPopup(nodeEnter) {
    const popupHeight = 36

    // 创建 g 元素
    const container = nodeEnter
      .append('g')
      .attr('class', 'popup-text')
      .attr('transform', `translate(0,${-this.textNodeHeight - 4})`)
      .attr('fill', d => (d.data.isBeneficiaryShare ? '#1890ff' : '#ff3241'))

    // 添加文本
    container
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', this.fontSize)
      .text(d => `${d.data.headLabel}：${d.data.beneficiaryShare || '未披露'}`)

    // 计算文本框的宽度
    // const textBoxWidth = document.querySelector(`#${t} > .popup-text > text`).getBBox().width + 10;

    // 插入矩形
    container
      .insert('rect', 'text')
      .attr('width', d => {
        const marginW = 16
        d.width =
          this.getActualWidthOfChars(d.data.headLabel + d.data.beneficiaryShare, {
            size: 12,
            family: 'Microsoft YaHei',
          }) +
          marginW * 2
        d.halfWidth = d.width / 2
        return d.width
      })
      .attr('rx', 2)
      .attr('x', d => -d.halfWidth)
      .attr('y', -popupHeight / 2 - 4)
      .attr('height', popupHeight)

    // 插入三角形
    container
      .insert('path', 'rect')
      .attr('rx', 2)
      .attr('d', 'M 0 0 L -5 -10 L 5 -10')
      .attr('transform', `translate(0,${popupHeight / 2 + 4})`)
  }

  drawText(t, e, n) {
    let i,
      a = this
    e = e > 0
    if (-1 === n.data.type && null !== (i = n.parent) && void 0 !== i && i.data.sourceChild) {
      let o = d3.select('#'.concat(t))
      o.append('text')
        .attr('x', 0)
        .attr('y', function(t) {
          return -a.textNodePadding - 4
        })
        .attr('fill', '#8793A5')
        .attr('text-anchor', 'middle')
        .style('font-size', 12)
        .text(function(t) {
          let n
          return '共'.concat(null === (n = t.parent) || void 0 === n ? void 0 : n.data.sourceChild.length).concat(e ? '家控股企业' : '个股东')
        })
      o.append('text')
        .attr('x', 0)
        .attr('y', function(t) {
          return a.textNodePadding
        })
        .attr('fill', '#3981F4')
        .attr('text-anchor', 'middle')
        .style('font-size', 14)
        .style('font-weight', 500)
        .text(function(t) {
          let n
          return '展开其他'.concat((null === (n = t.parent) || void 0 === n ? void 0 : n.data.sourceChild.length) - 10).concat(e ? '家' : '个', ' >')
        })
    }
    return d3
      .select('#'.concat(t))
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', this.fontSize)
      .text(function(t) {
        return t.data.name
      })
    // .on('mouseover', this.rectMo(!0)).on('mouseout', this.rectMo(!1))
  }

  twoPoints(a, b) {
    let length = Math.abs(a.y - b.y)
    let minY
    if (a.y > b.y) {
      minY = b.y
    } else {
      minY = a.y
    }
    const midPointY = length / 2 + minY
    return {
      az: { x: a.x, y: midPointY },
      bz: { x: b.x, y: midPointY },
    }
  }

  getPathData(sp, ep) {
    // sp = { x: sp.y, y: sp.x }
    // ep = { x: ep.y, y: ep.x }
    sp = { x: sp.x, y: sp.y }
    ep = { x: ep.x, y: ep.y }
    // 计算两个直角折点的坐标
    const { az: midPoint1, bz: midPoint2 } = this.twoPoints(sp, ep)
    return [sp, midPoint1, midPoint2, ep]
  }

  createLine(d) {
    const sp = { x: d.source.x, y: d.source.y }
    const ep = { x: d.target.x, y: d.target.y }
    const pathData = this.getPathData(sp, ep)
    return this.theLine(pathData)
  }

  createLink(link, source, transition, i) {
    const linkEnter = link
      .enter()
      .append('path')
      .attr('d', (d, a, b, c, e) => {
        if (d.source.depth == 1) {
          if (d.source.correlation) {
            d.source.correlation.push(b[a])
          } else {
            d.source.correlation = [b[a]]
          }
        }
        if (d.target.depth == 1) {
          if (d.target.correlation) {
            d.target.correlation.push(b[a])
          } else {
            d.target.correlation = [b[a]]
          }
        }
        const o = { x: source.x0, y: source.y0 }
        return this.createLine({ source: o, target: o })
      })

    // Transition links to their new position.
    link
      .merge(linkEnter)
      .transition(transition)
      .attr('d', d => this.createLine(d))
      .attr('stroke-opacity', 0.6)
      .attr('fill-opacity', 0.6)
      .attr('class', `link_${i}`)
      .transition()

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition(transition)
      .attr('d', d => {
        const o = { x: source.x, y: source.y }
        return this.createLine({ source: o, target: o })
      })
      .attr('stroke-opacity', 0)
      .attr('fill-opacity', 0)
      .remove()
  }

  mouseovered(t, e, n) {
    let r = this
    if (t) {
      this.nodeRaise(e, n)
      e.children?.forEach(t => {
        r.nodeRaise(t, n)
      })
    } else {
      this.nodeLower(e, n)
      e.children?.forEach(t => {
        r.nodeLower(t, n)
      })
    }
  }

  nodeRaise(t, e) {
    let n = e > 0 ? 'topToBottom' : 'bottomToTop'
    d3.select(t.correlation[0])
      .attr('stroke', '#3981F4')
      .attr('stroke-width', 1.5)
      .classed(n, !0)
      .raise()
    d3.select('#g'.concat(t.id)).raise()
  }
  nodeLower(t, e) {
    let n = e > 0 ? 'topToBottom' : 'bottomToTop'
    d3.select(t.correlation[0])
      .attr('stroke', '#AFB1B7')
      .attr('stroke-width', 1)
      .classed(n, !1)
      .lower()
  }
  emit(scale) {
    return scale
  }

  zoomHandler() {
    const rang = this.r || [0.5, 2.5]

    this.wrap.attr('transform', `translate(${this.width / 2},${this.height / 2}) scale(${1})`)

    // 创建一个缩放对象
    const zoom = d3
      .zoom()
      .scaleExtent(rang) // 设置缩放范围
      .on('zoom', current => {
        const { transform, sourceEvent } = current
        if (isNaN(transform.x)) return
        this.wrap.attr('transform', `translate(${transform.x + (this.width / 2) * transform.k},${transform.y + (this.height / 2) * transform.k}) scale(${transform.k})`)

        // 滚轮事件
        if (sourceEvent.type == 'wheel') {
          this.emit(transform.k)
        }
      })

    // 将缩放对象应用于SVG元素
    this.svg.call(zoom).on('dblclick.zoom', event => event.preventDefault())
    return zoom
  }
}
