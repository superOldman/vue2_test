//随机数，用于绑定id
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

import qwe from '@/pages/D3/mock/0b410d7fcb1acb75d8bb31b0a811affd'

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
      textMaxLength: 15,
    }

    const { width, height, marginTop, marginRight, marginBottom, marginLeft, textMaxLength } = Object.assign(defaultOptions, options)
    this.width = width
    this.height = height
    this.marginTop = marginTop
    this.marginRight = marginRight
    this.marginBottom = marginBottom
    this.marginLeft = marginLeft
    this.textMaxLength = textMaxLength

    this.container = container
    // 初始比例
    // this.scale = width / container.offsetWidth

    // 创建折线生成器
    this.theLine = d3
      .line()
      .x(d => d.y)
      .y(d => d.x)

    //
    this.root = []
  }
  create(data) {
    this.sourceData = data
    this.tree = d3.tree().nodeSize([50, 240])
    //
    // 区分左右
    this.left = { ...data, children: data.children.filter((e, i) => i < Math.floor(data.children.length / 2)) }
    this.right = { ...data, children: data.children.filter((e, i) => i >= Math.floor(data.children.length / 2)) }

    this.root = [d3.hierarchy(this.left), d3.hierarchy(this.right)]

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
        d.id = d.data.Id || d.data.Name + d.data.Type // uuid()
        d._children = d.children

        if (index) {
          d.y = -d.y
        }
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
    if (text.length > this.textMaxLength) {
      text = text.slice(0, this.textMaxLength) + '...'
    }
    return text
  }

  asyncExpandNode(event, source, i) {
    this.sourceData.children[5].children[0].children = qwe.Result.Children

    const data = JSON.parse(JSON.stringify(this.sourceData))
    // 区分左右
    this.left = { ...data, children: data.children.filter((e, i) => i <= Math.floor(data.children.length / 2)) }
    this.right = { ...data, children: data.children.filter((e, i) => i > Math.floor(data.children.length / 2)) }

    this.root = [d3.hierarchy(this.left), d3.hierarchy(this.right)]

    this.drawTree()
  }

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
      if (i) d.y = -d.y
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

  createNode(node, source, transition, i) {
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('class', `node_${i}`)
      .attr('id', d => `g${d.id}`)

    nodeEnter
      .filter(d => d.depth == 1)
      .on('mouseenter', (event, d) => {
        d.correlation.forEach(e => {
          e.style.stroke = '#000'
          e.style['stroke-opacity'] = 1
        })
      })
      .on('mouseleave', (event, d) => {
        d.correlation.forEach(e => {
          e.style.stroke = null
          e.style['stroke-opacity'] = null
        })
      })
      .on('click', (event, d) => {
        d.children = d.children ? null : d._children

        d3.select(event.currentTarget)
          .selectAll('.vertical-line')
          .attr('style', d => `stroke: rgb(102, 102, 102); stroke-width: 1; ${d.children ? 'visibility: hidden;' : null}`)

        this.expandNode && this.expandNode(event, d, i)
      })

    // TODO 动态加载
    // nodeEnter.filter(d => d.depth == 2)
    //   .on('click', (event, d) => {
    //     // d.children = d.children ? null : d._children
    //     //
    //     d.children = qwe.Result.Children
    //     d.data.children = qwe.Result.Children
    //     this.asyncExpandNode && this.asyncExpandNode(event, d, i)
    //   })

    // 添加框
    const nodeRect = nodeEnter
      .append('rect')
      .attr('width', d => {
        const marginW = 16
        d.width = this.getActualWidthOfChars(d.data.Name, { size: 12, family: 'Microsoft YaHei' }) + marginW * 2
        d.halfWidth = d.width / 2
        return d.width
      })
      .attr('height', 32)
      .attr('x', d => -d.halfWidth)
      .attr('y', -16)
      .attr('rx', 2)
      .attr('ry', 2)

    // nodeRect.filter(d => d.depth < 2).attr('fill', d => `url(#stream_level${d.depth})`)
    nodeRect.filter(d => d.depth == 0).attr('fill', '#128BED')
    nodeRect
      .filter(d => d.depth == 1)
      .attr('stroke-width', 0)
      .attr('fill', '#fff')

    nodeRect
      .filter(d => d.depth >= 2)
      .attr('fill', '#fff')
      .attr('stroke-width', 0.5)
      .attr('stroke', '#D0D1D6')

    nodeEnter
      .append('text')
      .attr('y', 5)
      .attr('x', 0)
      .attr('fill', d => (d.depth ? '#000' : '#fff'))
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('paint-order', 'stroke')
      // .style('font-weight', 'bold')
      .text(d => this.setTextMaxLength(d?.data?.nodeName || d?.data?.Name || d.Name || ''))

    // 添加title
    nodeEnter.append('title').text(d => d.data?.Name || d.Name)

    // 添加按钮

    const icon = nodeEnter
      // .filter(d => d._children)
      .filter(d => d.parent && d._children)
      .append('g')
      .attr('class', 'icon-text')
      .attr('opacity', 1)
      .attr('transform', d => `translate(${i ? -d.halfWidth : d.halfWidth},${0})`)

    icon
      .append('circle')
      .attr('class', 'icon-circle')
      .attr('stroke', 'rgb(102, 102, 102)')
      .attr('fill', 'rgb(255, 255, 255)')
      .attr('stroke-width', '1')
      .attr('r', 5)
      .attr('cy', 0)

    icon
      .append('line')
      .attr('x1', '-2')
      .attr('y1', '0')
      .attr('x2', '2')
      .attr('y2', '0')
      .attr('stroke', 'rgb(102, 102, 102)')
      .attr('stroke-width', '1')

    icon
      .append('line')
      .attr('class', 'vertical-line')
      .attr('x1', '0')
      .attr('y1', '-2')
      .attr('x2', '0')
      .attr('y2', '2')
      .attr('stroke', 'rgb(102, 102, 102)')
      .attr('stroke-width', '1')
      .attr('style', d => `${d.children ? 'visibility: hidden;' : null}`)

    // 添加圆
    const iconCircle = nodeEnter
      // .filter(d => d._children)
      .filter(d => d.depth == 1)
      .append('g')
      .attr('class', 'icon-circle')
      .attr('opacity', 1)

    iconCircle
      .append('circle')
      .attr('class', 'icon-circle')
      .attr('fill', '#D4B106')
      .attr('r', 4)
      .attr('cx', d => (i ? d.halfWidth - 10 : -d.halfWidth + 10))
      .attr('y', 2)

    // 添加三角
    const iconTriangle = nodeEnter
      // .filter(d => d._children)
      .filter(d => d.depth == 1)
      .append('g')
      .attr('class', 'icon-circle')
      .attr('opacity', 1)
      .attr('transform', d => `translate(${i ? d.halfWidth + 10 : -d.halfWidth - 10},${0})`)

    iconTriangle
      .append('path')
      .attr('stroke-width', 0)
      .attr('fill', '#128BED')
      .attr('d', 'M0,0L9,-3L9,3Z')
    // M0,0L0,3L9,0L0,-3Z

    // 添加移入动画
    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(transition)
      .attr('transform', d => {
        if (d.depth) return `translate(${i ? d.y - d.halfWidth : d.y + d.halfWidth},${d.x})`
        return `translate(${d.y},${d.x})`
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
        return `translate(${source.y + transitionY},${source.x})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .remove()
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
