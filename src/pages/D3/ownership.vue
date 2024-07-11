<template>
  <div class="svg-wrap">
    <div ref="container" style="width: 100%;height:100%;">
    </div>
    <!-- <svg style="width: 100%;height:100%;">
      <path class="bottomToTop" stroke="black" stroke-width="1" d="M0,0L100,0" transform="translate(400, 0)"></path>

      <path class="upgNode bottomToTop" d="M 1066.5 486.5
                    L 1066.5 430.5
                    L 796.5 430.5
                    796.5 370.5 " fill="none" stroke-width="1.5" stroke="#3981F4"></path>
    </svg>
    <el-popover placement="bottom" trigger="manual" :visible-arrow="false" :content="content" v-model="visible" popper-class="d3-scale-percent">
      <div class="btn" slot="reference" @click="visible = !visible"></div>
    </el-popover> -->
  </div>
</template>

<script>
import findOwnership2 from '@/pages/D3/mock/findOwnership2'
import findOwnership from '@/pages/D3/mock/findOwnership'
// import equityPenetration2 from '@/pages/D3/mock/equityPenetration2'
import data from './mock/data'
// import { createNode, createResource } from '@/pages/D3/D3tree'
import { D3Tree } from '@/pages/D3/D3tree4'
export default {
  name: 'Ownership',
  components: {

  },
  props: {

  },
  data() {
    return {
      visible: false,
      content: '100%'
    }
  },
  mounted() {
    // D3Tree.prototype.emit = this.percentHandle
    const tree = new D3Tree(this.$refs.container)
    tree.create(findOwnership.data.children[0])
    // tree.create(findOwnership2.data.children[0])
  },
  methods: {
    percentHandle(scale) {
      this.visible = true
      this.content = Math.floor(scale * 100) + '%'
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.visible = false
      }, 1000)
    },

    initSvg() {
      // 定义初始值
      let marginX = 0;
      let marginY = 0;
      let paddingX = 0;
      let paddingY = 0;

      // 计算可用空间
      const availableWidth = document.body.clientWidth - paddingX - marginX;
      const availableHeight = document.body.clientHeight - paddingY - marginY;

      // 计算中心点
      const centerX = availableWidth / 2 + paddingX;
      const centerY = availableHeight / 2 + marginY;

      // 设置中心点属性
      this.centerPoint = [centerX, centerY];

      // 创建 SVG 元素
      const svg = d3.select("#svg")
        .append("svg")
        .attr("width", availableWidth)
        .attr("id", "stock-rpt-svg")
        .attr("height", availableHeight)
        .style("user-select", "none")
        .style("color", "#292A2D")
        .attr("font-size", this.fontSize);

      // 创建容器组并设置变换
      this.container = svg.append("g")
        .attr("id", "container")
        .attr("transform", `translate(${paddingX},${marginY}) scale(1)`);

      // 绘制根节点
      this.drawRoot();

      // 创建缩放行为
      const zoomBehavior = d3.zoom()
        .scaleExtent(this.scaleRange)
        .on("zoom", this.zoomFn);

      // 应用缩放行为
      this.d3Zoom = zoomBehavior;
      svg.call(zoomBehavior);

      // 处理数据
      this.dealData();
    },
    update(t, direction) {
      const reverse = direction === "up" ? -1 : 1;
      const groupClassName = `${direction}gNode`;

      const tree = this.treeMap(this.root[direction]);
      const nodes = tree.descendants();
      const links = tree.links();

      nodes.forEach(node => {
        if (!node.depth && reverse > 0) {
          node.x = node.x + this.centerPoint[0];
          node.y = reverse * node.y + this.centerPoint[1] - this.textNodeHeight / 2;
        } else {
          node.x = node.x + this.centerPoint[0];
          node.y = reverse * node.y + this.centerPoint[1];
        }
      });

      const nodeSelection = this.container.selectAll(`g.${groupClassName}`)
        .data(nodes, d => `${d.id}`);

      const nodeEnter = nodeSelection.enter().append("g")
        .attr("id", d => `g${d.id}`)
        .attr("class", groupClassName)
        .attr("transform", d => `translate(${t.x0},${t.y0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .style("cursor", "pointer")
        .on("mouseenter", (t, d) => {
          if (d && d.data.type !== -1) this.mouseovered(true, d, reverse);
        })
        .on("mouseleave", (t, d) => {
          if (d && d.data.type !== -1) this.mouseovered(false, d, reverse);
        })
        .on("click", (t, d) => {
          t.stopPropagation();
          if (d && d.data.type === -1) this.addNodeByClick(d, direction);
          else this.handleCenterNode(d);
        });

      nodeEnter.each(node => {
        if (node.depth !== 0) {
          if (node.data.name.length <= 11) this.drawText(`g${node.id}`, reverse, node);
          else this.drawTextMultiline(`g${node.id}`, reverse);

          if (node.data.headLabel) this.drawPopup(`g${node.id}`, reverse);

          const cornerLabelParams = {
            id: `g${node.id}`,
            dirTop: reverse,
            x: () => this.textNodeWidth / 3 - 6,
            y: () => -this.textNodeHeight / 2 + 1,
            key: "cornerLabel",
            offsetX: () => this.textNodeWidth / 3 - this.subTextWidth / 2 - 6,
            offsetY: () => -this.textNodeHeight / 2 - this.fontSize,
            rectColor: this.getStatusColor(node.data).rectColor,
            textColor: this.getStatusColor(node.data).textColor
          };

          if (node.data.lineText && node.data.lineText.stockPercent) this.drawLineText(`g${node.id}`, direction, node);
          if (node.data.cornerLabel) this.drawTextWidthRect(cornerLabelParams);
          if (node.depth && node.data.hasNext) this.drawCircle(`g${node.id}`, direction);
          if (node.depth) this.drawTriangle(`g${node.id}`, reverse);
        }
      });

      const nodeMerge = nodeEnter.merge(nodeSelection);
      nodeMerge.transition().duration(this.duration)
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      nodeSelection.exit().transition().duration(this.duration)
        .attr("transform", d => `translate(${t.x},${t.y})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .remove();

      const linkSelection = this.container.selectAll(`path.${groupClassName}`)
        .data(links, d => d.target.id);

      const linkEnter = linkSelection.enter().insert("path", "g")
        .each(function (d) { d.target.linkNode = this; })
        .attr("class", groupClassName)
        .attr("d", d => {
          const source = { x: t.x0, y: t.y0, depth: d.source.depth };
          return this.diagonal({ source, target: source }, reverse);
        })
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#AFB1B7");

      linkEnter.merge(linkSelection).transition().duration(this.duration)
        .attr("d", d => this.diagonal(d, reverse));

      linkSelection.exit().transition().duration(this.duration)
        .attr("d", d => {
          const source = { x: t.x, y: t.y, depth: d.depth };
          return this.diagonal({ source, target: source, depth: d.source.depth }, reverse);
        })
        .remove();

      this.root[direction].eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }




  }
}
</script>

<style scoped lang="less">
//
::v-deep {
  .bottomToTop {
    stroke-dasharray: 10;
    animation: dashTop 10s linear infinite;
  }
  .topToBottom {
    stroke-dasharray: 10;
    animation: dashBottom 10s linear infinite;
  }
}

@keyframes dashTop {
  to {
    stroke-dashoffset: 300;
  }
}

@keyframes dashBottom {
  to {
    stroke-dashoffset: -300;
  }
}
.svg-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .btn {
    position: absolute;
    left: 50%;
    bottom: 100px;
  }
}

::v-deep .d3-scale-percent {
  width: 90px;
  min-width: 0px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}
</style>
<style>
.d3-scale-percent {
  width: 60px;
  min-width: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 30px;
  line-height: 30px;
  padding: 0;
  text-align: center;
  border-radius: 4px;
  border: none;
}
</style>
