//随机数，用于绑定id
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  )
}

export default class D3Tree {
  constructor(data, container, options) {
    this.width = 1920;
    this.height = 1080
    this.marginTop = 500;
    this.marginRight = 10;
    this.marginBottom = 10;
    this.marginLeft = 500;
    this.container = container

    this.root = d3.hierarchy(data)
    this.dx = this.height
    this.dy = this.width //- this.marginRight - this.marginLeft) / (1 + this.root.height)
    this.tree = d3.tree().nodeSize([60, 200])
    // .separation((a, b) => {
    //   return 1//(a.parent == b.parent ? 1 : 2) / a.depth;
    // });
    this.createLayout()
    this.createResource()
    // 将缩放对象应用于SVG元素
    this.zoomHandler()
    
    this.drawTree()
  }

  drawTree() {
    this.root.x0 = this.dy / 2
    this.root.y0 = 0
    this.root.descendants().forEach((d, i) => {
      d.id = uuid()
      d._children = d.children
      if (d.depth > 1) d.children = null
    })
    this.update(null, this.root)

    this.container.appendChild(this.svg.node())
  }

  createLayout() {
    this.svg = d3.create('svg')
      .attr('width', this.width)
      .attr('height', this.dx)
      .attr('viewBox', [-this.marginLeft, -this.marginTop, this.width, this.dx])
      .attr('style', 'max-width: 100%; height: auto; font: 12px sans-serif; user-select: none;')

    this.wrap = this.svg.append('g')

    this.gLink = this.wrap.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#ADB3C2')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', 3)
      .attr('stroke-opacity', 1)
      .attr('class', 'link-group')

    this.gNode = this.wrap.append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all')
      .attr('class', 'node-group')

  }

  update(event, source) {
    const duration = event?.altKey ? 3500 : 250
    const nodesData = this.root.descendants() //.reverse()
    const linksData = this.root.links()

    // Compute the new tree layout.
    this.tree(this.root)

    let left = this.root
    let right = this.root
    this.root.eachBefore(node => {
      if (node.x < left.x) left = node
      if (node.x > right.x) right = node
    })

    const height = this.dx // right.x - left.x + marginTop + marginBottom;

    const transition = this.svg.transition().duration(duration)
    // .attr('height', height)
    // .attr('viewBox', [-this.marginLeft, left.x - this.marginTop, this.width, height])
    // .tween('resize', window.ResizeObserver ? null : () => () => this.svg.dispatch('toggle'))


    d3.selectAll('.add-btn').text(d => {
      if (d.children) return '-'
      return '+'
    })

    const node = this.gNode.selectAll('.node').data(nodesData, d => d.id)
    const link = this.gLink.selectAll('.link').data(linksData, d => d.target.id)

    // 创建 Node
    this.createNode(node, source, transition, this.update.bind(this))

    // 创建 Link
    this.createLink(link, source, transition)

    // 更新位置
    this.root.eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })

  }

  createNode(node, source, transition, handleFunction) {
    console.log('--------', node)

    const nodeEnter = node.enter().append('g')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('class', 'node')
      .attr('id', d => `g${d.id}`)

    // 添加框
    const nodeRect = nodeEnter.append('rect')
      .attr('width', 132)
      .attr('height', 38)
      .attr('x', -66)
      .attr('y', -19)
      .attr('rx', 8)
      .attr('ry', 8)

    nodeRect.filter(d => d.depth < 2).attr('fill', d => `url(#stream_level${d.depth})`)
    nodeRect.filter(d => d.depth >= 2).attr('fill', '#fff')
      .attr('stroke-width', 1)
      .attr('stroke', '#D0D1D6')


    nodeEnter.append('text')
      .attr('y', 5)
      .attr('x', 0)
      .attr('fill', d => d.depth < 2 ? '#fff' : '#000')
      .attr('text-anchor', 'middle')
      .attr('paint-order', 'stroke')
      .attr('title', d => d.data.name)
      .style('font-weight', 'bold')
      .text(d => {
        let text = d?.data?.name
        if (text.length > 8) {
          text = text.slice(0, 8) + '...'
        }
        return text
      })

    // 添加title
    nodeEnter.append('title').text(d => d.data.name)


    // 添加按钮
    const icon = nodeEnter
      .filter(d => d._children)
      .append('g')
      .attr('class', 'icon-text')
      .attr('opacity', 1)

    icon.append('circle')
      .attr('class', 'icon-circle')
      .attr('fill', '#B4BACA')
      .attr('r', 8)
      .attr('cx', 66)
      .attr('cy', 0)


    icon.append('text')
      .attr('class', 'add-btn')
      .attr('x', 66)
      .attr('y', 4)
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(d => {
        if (d.children) return '-'
        return '+'
      }).on('click', (event, d) => {
        d.children = d.children ? null : d._children
        handleFunction && handleFunction(event, d)
      })


    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter)
      .transition(transition)
      .attr('transform', d => {
        return `translate(${d.y},${d.x})`
      })
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    // Transition exiting nodes to the parent's new position.

    const height = 132
    const padding = 10
    const transitionY = height / 2 + padding
    const nodeExit = node.exit().transition(transition)
      .attr('transform', d => `translate(${source.y + transitionY},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .remove()
  }

  createLink(link, source, transition) {
    // 
    function twoPoints(a, b) {
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
        bz: { x: b.x, y: midPointY }
      }
    }

    // function twoPoints(a, b) {
    //   let length = Math.abs(a.x - b.x)
    //   let minX
    //   if (a.x > b.x) {
    //     minX = b.x
    //   } else {
    //     minX = a.x
    //   }
    //   const midPointX = length / 2 + minX
    //   return {
    //     az: { x: midPointX, y: a.y },
    //     bz: { x: midPointX, y: b.y }
    //   }
    // }

    // 创建路径数据
    function getPathData(sp, ep) {
      // sp = { x: sp.y, y: sp.x }
      // ep = { x: ep.y, y: ep.x }
      sp = { x: sp.x, y: sp.y }
      ep = { x: ep.x, y: ep.y }
      // 计算两个直角折点的坐标
      const { az: midPoint1, bz: midPoint2 } = twoPoints(sp, ep)
      return [
        sp,
        midPoint1,
        midPoint2,
        ep
      ]
    }
    // 创建折线生成器
    const theLine = d3.line().x(d => d.y).y(d => d.x)

    function createLine(d) {
      const height = 132
      const padding = 10
      const transitionY = height / 2 + padding
      const sp = { x: d.source.x, y: d.source.y + transitionY }
      const ep = { x: d.target.x, y: d.target.y - transitionY }
      const pathData = getPathData(sp, ep)
      return theLine(pathData)
    }


    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append('path')
      .attr('d', d => {
        const o = { x: source.x0, y: source.y0 }
        return createLine({ source: o, target: o })
      })

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
      .attr('d', (d) => {
        return createLine(d)
      })
      .attr('stroke-opacity', 1)
      .attr('fill-opacity', 1)
      .attr('class', 'link')
      .transition()
      .attr('marker-end', 'url(#marker_arrow)')


    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition)
      .attr('d', (d) => {
        const o = { x: source.x, y: source.y }
        return createLine({ source: o, target: o })
      })
      .attr('marker-end', 'none')
      .attr('stroke-opacity', 0)
      .attr('fill-opacity', 0)
      .remove()
  }

  createResource() {
    // 复用集合
    const defs = this.svg.append('defs')
    defs.append('pattern')
      .attr('id', 'stream_level0')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('patternContentUnits', 'objectBoundingBox')
      .append('image')
      .attr('href', '/img/cylbg01.svg')
      .attr('width', '1')
      .attr('height', '1')
      .attr('preserveAspectRatio', 'none')

    defs.append('pattern')
      .attr('id', 'stream_level1')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('patternContentUnits', 'objectBoundingBox')
      .append('image')
      .attr('href', '/img/cylbg02.svg')
      .attr('width', '1')
      .attr('height', '1')
      .attr('preserveAspectRatio', 'none')

    defs.append('marker')
      .attr('id', 'marker_arrow')
      .attr('markerHeight', '8')
      .attr('markerWidth', '8')
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto')
      .attr('refX', '0')
      .attr('refY', '0')
      .attr('viewBox', '-8 -8 16 16')
      .append('path')
      .attr('fill', '#ADB3C2')
      .attr('d', 'M 0,0 m -8,-8 L 8,0 L -8,8 Z')
  }

  zoomHandler() {
    // 创建一个缩放对象
    const zoom = d3.zoom()
      .scaleExtent([0.1, 100]) // 设置缩放范围
      .on('zoom', current => {
        const { transform } = current
        if (isNaN(transform.x)) return
        this.wrap.attr('transform', `translate(${transform.x},${transform.y}) scale(${transform.k})`)
      }) // 指定缩放时的回调函数

    // 将缩放对象应用于SVG元素
    this.svg.call(zoom)

    return zoom
  }
}
