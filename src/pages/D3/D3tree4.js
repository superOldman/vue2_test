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
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
import update from './mock/update.json'

let k = 38
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
      textMaxLength: 11
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
  }

  create(data) {
    this.sourceData = data
    this.root = d3.hierarchy(data)

    this.createLayout()
    this.createTreeNode()
    this.container.appendChild(this.svg.node())
    this.drawTree()
  }

  drawTree() {
    const root = this.root
    root.x0 = this.height / 2
    root.y0 = 0
    root.descendants().forEach(d => {
      d.id = uuid()
      d._children = d.children
    })

    this.update(this.root)
  }

  createLayout() {
    this.svg = d3.create('svg')
      .attr('width', this.width)
      .attr('style', 'font: 12px sans-serif; user-select: none;')
      .attr('id', 'structureSVG')

    this.wrap = this.svg.append('g')
  }

  createTreeNode(className) {
    this.gLink = this.wrap.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#ADB3C2')
      .attr('stroke-width', 0.5)
      // .attr('stroke-dasharray', 3)
      .attr('stroke-opacity', 0.6)
      .attr('class', 'link-group')

    this.gNode = this.wrap.append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all')
      .attr('class', 'node-group')


    if (className) {
      this.gNode.attr('class', `node-group ${className}`)
      this.gLink.attr('class', `link-group ${className}`)
    }
  }
  calcRowWidth(t) {
    let e = 900 - 16.5 * t.depth;
    return e > 495 ? e : 495
  }
  calcTitleLeng(t) {
    return parseInt((this.calcRowWidth(t) - k) / 18)
  }
  calcSvgHeight(t) {
    let e = 0;
    this.root.eachBefore((function (t) {
      t.style = 'node_' + t.depth
      t.x = 16.5 * t.depth
      t.x = t.x > 425 ? 425 : t.x
      // t.data && (t.data.color = Object(m.c)());
      t.data && (t.data.color = 'red');
      let r = 44;
      t.depth ? (r = t.data.label ? 92 : 67, t.y = 8 + e) : t.y = 8
      t.data.stockPercentRation || t.data.shouldCapi || (r = t.data.label ? 69 : 44)
      e += r + 8
      t.height = r
    }
    ))
    d3.select('#structureSVG').attr('height', e + 60)
  }
  update(t) {
    const self = this;
    const descendants = this.root.descendants();

    // 计算并更新 SVG 高度
    this.calcSvgHeight(descendants);

    // 绑定数据
    const nodes = this.gNode.selectAll('g.node')
      .data(descendants, d => d.id || (d.id = w++))

    // 处理新增节点
    const enterNodes = nodes.enter()
      .append('g')
      .attr('id', d => `g${d.id}`)
      .attr('class', d => `node node_${d.depth} ${t.data.class || ''}`)
      .attr('transform', d => `translate(${d.x},${d.y})`)

    // 添加矩形
    enterNodes.append('rect')
      .attr('y', 0)
      .attr('height', d => d.height)
      .attr('width', self.calcRowWidth)
      .style('stroke', '#DAE4EC')
      .style('fill', '#fff')
      .attr('stroke-width', 1);

    // 添加标记
    enterNodes.append('rect')
      .attr('y', 0)
      .attr('height', d => d.height)
      .attr('width', 6)
      .style('fill', d => (d.data.type === 2) ? '#3981F4' : '#FF4B4B');

    // 添加文本
    enterNodes.append('text')
      .attr('dy', d => d.depth ? 26 : d.height / 2 + 4)
      .attr('dx', k)
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('fill', d => (d.data.type === 2 && d.data.url) ? '#5E667D' : '#292A2D')
      .text(d => {
        const titleLength = self.calcTitleLeng(d);
        return (d.data.name.length > titleLength) ? `${d.data.name.substring(0, titleLength)}...` : d.data.name;
      })
      .style('cursor', d => (d.data.type === 2) ? 'pointer' : 'default')
      .on('click', (d, i) => {
        if (d.data.url) window.open(`${window.location.origin}${d.data.url}`, '_self');
      });

    // 添加标签背景
    enterNodes.append('rect')
      .attr('y', 36)
      .attr('x', k)
      .attr('height', 20)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('width', 52)
      .style('fill', '#FCECEC')
      .style('opacity', d => (d.data.label && d.data.label.majorShareholder) ? 1 : 0);

    // 添加标签文本
    enterNodes.append('text')
      .attr('dy', 50)
      .attr('dx', 46)
      .style('font-size', '12px')
      .style('fill', '#E36560')
      .text(d => (d.data.label && d.data.label.majorShareholder) ? d.data.label.majorShareholder : '');

    // 添加受益人背景
    enterNodes.append('rect')
      .attr('y', 36)
      .attr('x', d => (d.data.label && d.data.label.majorShareholder) ? 94 : k)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('height', 20)
      .attr('width', 100)
      .style('fill', '#EBF2FD')
      .style('opacity', d => (d.data.label && d.data.label.beneficiary) ? 1 : 0);

    // 添加受益人文本
    enterNodes.append('text')
      .attr('dy', 50)
      .attr('dx', d => (d.data.label && d.data.label.majorShareholder) ? 102 : k)
      .style('font-size', '12px')
      .style('fill', '#3981F4')
      .text(d => (d.data.label && d.data.label.beneficiary) ? d.data.label.beneficiary : '');

    // 添加持股比例标签
    enterNodes.append('text')
      .attr('dy', d => (d.data.label) ? 73 : 50)
      .attr('dx', 38)
      .style('font-size', '12px')
      .style('fill', '#292A2D')
      .text(d => (d.depth && d.data.stockPercentRation) ? '持股比例:' : '');

    // 添加持股比例数值
    enterNodes.append('text')
      .attr('dy', d => (d.data.label) ? 73 : 50)
      .attr('dx', 98)
      .style('font-size', '12px')
      .style('fill', '#FF9838')
      .text(d => (d.depth && d.data.stockPercentRation) ? d.data.stockPercent || '--' : '');

    // 添加认缴金额标签
    enterNodes.append('text')
      .attr('dy', d => (d.data.label) ? 73 : 50)
      .attr('dx', d => (d.data.stockPercentRation) ? 258 : 38)
      .style('font-size', '12px')
      .text(d => (d.depth && d.data.shouldCapi) ? '认缴金额:' : '');

    // 添加认缴金额数值
    enterNodes.append('text')
      .attr('dy', d => (d.data.label) ? 73 : 50)
      .attr('dx', d => (d.data.stockPercentRation) ? 314 : 94)
      .style('font-size', '12px')
      .style('fill', '#FF9838')
      .text(d => (d.depth && d.data.shouldCapi) ? d.data.shouldCapi || '--' : '');

    // 更新操作
    nodes.transition().duration(200)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('opacity', 1);

    nodes.select('rect')
      .style('stroke', 'DAE4EC')
      .style('fill', '#fff');

    nodes.exit().transition().duration(200)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('opacity', 0)
      .remove();

    // 绘制按钮
    this.drawBtn(enterNodes);

    // 绘制连线
    this.drawLink(t);

    // 更新节点位置信息
    this.root.each(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    })
  }

  drawLink(t) {
    let e = this
    const data = this.root.links()
    // const data = this.root.descendants();

    let r = this.gLink.selectAll('g.link').data(data, d => d.target.id)
    r.enter().insert('path', 'g').attr('class', (function (t) {
      return 'link link_' + t.target.depth + ' ' + e.getClass(t.target)
    }
    )).style('shape-rendering', 'crispEdges').style('fill', 'none').style('stroke', '#afb1b7').style(' stroke-width', '1px').attr('d', (function (r) {
      let a = {
        x: t.x + 4,
        y: t.y
      };
      return e.elbow({
        source: a,
        target: a
      })
    }
    )).transition().duration(200).attr('d', e.elbow)
    r.transition().duration(200).attr('d', e.elbow)


    r.exit().transition().duration(200).attr('d', (function (r) {
      let a = {
        x: t.x,
        y: t.y
      };
      return e.elbow({
        source: a,
        target: a
      })
    }
    )).remove()
  }

  getClass(t) {
    return t.data.class || ''
  }
  elbow(t) {
    let e = t.target.height ? t.target.height / 2 : 22;
    return 'M'.concat(t.source.x + 2, ',').concat(t.source.y + 20, 'V').concat(t.target.y + e, 'H').concat(t.source.x + 2 + 20)
  }

  drawBtn(t) {
    // 获取当前对象
    const self = this;

    // 创建 g 元素
    const container = t.append('g')
      .attr('class', 'circle')
      .on('click', (d, i) => self.clickBtn(i, d));

    // 添加圆形
    container.append('circle')
      .style('fill', '#fff')
      .style('stroke', '#000')
      .style('stroke-width', 1)
      .attr('cy', d => d.height / 2)
      .attr('r', d => d.data.hasNext ? 6.5 : 0)
      .attr('transform', 'translate(20,0)');

    // 添加文本
    container.append('text')
      .attr('dy', d => d.height / 2 + 3)
      .attr('text-anchor', 'middle')
      .attr('class', 'fa')
      .style('fill', '#000')
      .attr('transform', 'translate(20,0)')
      .text(d => d.data.hasNext ? (d.children ? '-' : '+') : '');
  }

  clickBtn(t, e) {
    const self = this
    return async function () {
      try {
        // 切换子节点的显示状态
        if (t.children) {
          t._children = t.children;
          t.children = null;
        } else {
          t.children = t._children || null;
        }

        // 如果节点没有子节点或者标记为 hasNext
        if (!t._children && !t.hasNext) {
          // 构造请求参数
          // const requestData = {
          //   _id: t.data._id,
          //   name: t.data.name,
          //   code: t.data.code,
          //   oriCompanyName: this.treeData.name,
          //   hideLabel: t.depth ? 1 : 0,
          //   ...this.filterCondition,
          //   oriCompanyNameId: this.$route.query.id
          // };

          // 发送请求
          const data = await update //this.$axios(Object.assign({}, c.J(requestData)));
          // 
          // 处理响应
          if (data.success) {
            const responseData = data.data;
            if (responseData.children && responseData.children.length && responseData.children[0].children.length) {
              // 处理子节点数据
              const childrenNodes = responseData.children[0].children.map(item => ({
                data: item,
                depth: t.depth + 1,
                parent: t,
                id: uuid()
              }));
              t.children = childrenNodes;
              t._children = childrenNodes;
            } else {
              // 如果没有子节点数据，则标记为没有下级节点，并移除按钮
              t.data.hasNext = 0;
              d3.select(`#g${t.id} .circle`).remove();
            }
          }
          // 更新节点状态
        }
        self.update(t);

      } catch (error) {
        console.error(error);
      }
    }();
  }
}
