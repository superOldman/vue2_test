<template>
  <div ref="container">
  </div>
</template>

<script>
import data from './data.json'
import { createNode, createResource } from '@/pages/D3/D3tree'
export default {
  name: 'd3_collapsibleTree_test',
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
      // Specify the charts’ dimensions. The height is variable, depending on the layout.
      const width = 1920;
      const marginTop = 10;
      const marginRight = 10;
      const marginBottom = 10;
      const marginLeft = 40;

      // Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
      // (dx is a height, and dy a width). This because the tree must be viewed with the root at the
      // “bottom”, in the data domain. The width of a column is based on the tree’s height.
      const root = d3.hierarchy(data);
      const dx = 1080;
      const dy = (width - marginRight - marginLeft) / (1 + root.height);

      // Define the tree layout and the shape for links.
      const tree = d3.tree().nodeSize([60, 200]).separation((a, b) => {
        return 1//(a.parent == b.parent ? 1 : 2) / a.depth;
      });
      const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

      // Create the SVG container, a layer for the links and a layer for the nodes.
      const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", dx)
        .attr("viewBox", [-marginLeft, -marginTop, width, dx])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");

      const gLink = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

      const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");
      createResource(svg)
      function update(event, source) {
        const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition


        const nodes = root.descendants() //.reverse();
        const links = root.links();

        // Compute the new tree layout.
        tree(root);

        let left = root;
        let right = root;
        root.eachBefore(node => {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
        });

        const height = dx// right.x - left.x + marginTop + marginBottom;

        const transition = svg.transition()
          .duration(duration)
          .attr("height", height)
          .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
          .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

        // console.log('gNode',gNode.selectAll(".node"))
        // console.log('gNode.selectAll("g")',gNode.selectAll("g"))
        // console.log('gNode.selectAll("g")',gNode.selectAll("g").data(nodes))
        // gNode.selectAll("node").data()
        // Update the nodes…

        

        console.log(111)
        d3.selectAll(".add_").text(d=>{

          if( d.children){
            return '-'
          }else{
            return '+'
          }
          debugger
        })

        const node = gNode.selectAll(".node")
          .data(nodes, d =>  d.id)
        // console.log('gNode.selectAll("g") node',node)

        // // 创建Node
        createNode(node, source, transition, update)

        // Enter any new nodes at the parent's previous position.
        // const nodeEnter = node.enter().append("g")
        //   .attr("transform", d => `translate(${source.y0},${source.x0})`)
        //   .attr("fill-opacity", 0)
        //   .attr("stroke-opacity", 0)
        //   .on("click", (event, d) => {
        //     d.children = d.children ? null : d._children;
        //     update(event, d);
        //   });

        // nodeEnter.append("circle")
        //   .attr("r", 2.5)
        //   .attr("fill", d => d._children ? "#555" : "#999")
        //   .attr("stroke-width", 10);

        // nodeEnter.append("text")
        //   .attr("dy", "0.31em")
        //   .attr("x", d => d._children ? -6 : 6)
        //   .attr("text-anchor", d => d._children ? "end" : "start")
        //   .text(d => d.data.name)
        //   .clone(true).lower()
        //   .attr("stroke-linejoin", "round")
        //   .attr("stroke-width", 3)
        //   .attr("stroke", "white");

        // Transition nodes to their new position.
        // const nodeUpdate = node.merge(nodeEnter).transition(transition)
        //   .attr("transform", d => `translate(${d.y},${d.x})`)
        //   .attr("fill-opacity", 1)
        //   .attr("stroke-opacity", 1);



        // Transition exiting nodes to the parent's new position.
        // const nodeExit = node.exit().transition(transition).remove()
        //   .attr("transform", d => `translate(${source.y},${source.x})`)
        //   .attr("fill-opacity", 0)
        //   .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path")
          .data(links, d => {
            return d.target.id
          });


        function twoPoints(a, b) {
          let length = Math.abs(a.x - b.x)
          let minX
          if (a.x > b.x) {
            minX = b.x
          } else {
            minX = a.x
          }
          const midPointX = length / 2 + minX
          return {
            az: { x: midPointX, y: a.y },
            bz: { x: midPointX, y: b.y }
          }
        }

        // 创建路径数据
        function getPathData(sp, ep) {
          sp = { x: sp.y, y: sp.x }
          ep = { x: ep.y, y: ep.x }
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
        const theLine = d3.line().x(d => d.x).y(d => d.y)

        function createLine(d) {
          const sp = { x: d.source.x, y: d.source.y }
          const ep = { x: d.target.x, y: d.target.y }
          const pathData = getPathData(sp, ep)
          return theLine(pathData)
        }




        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append("path")
          .attr("stroke-opacity", 1)
          .attr("d", d => {
            const o = { x: source.x0, y: source.y0 };
            return createLine({ source: o, target: o });
            // return diagonal({ source: o, target: o });
          });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition)
          .attr("d", createLine);
        // .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition(transition).remove()
          .attr("d", d => {
            const o = { x: source.x, y: source.y };
            return createLine({ source: o, target: o });
            // return diagonal({ source: o, target: o });
          });

        // Stash the old positions for transition.
        root.eachBefore(d => {
          d.x0 = d.x;
          d.y0 = d.y;
        })


        // d3.selectAll('.icon-text').

      }

      // Do the first update to the initial configuration of the tree — where a number of nodes
      // are open (arbitrarily selected as the root, plus nodes with 7 letters).
      root.x0 = dy / 2;
      root.y0 = 0;
      root.descendants().forEach((d, i) => {

        d.id = i;
        d._children = d.children;
        if (d.depth > 1) d.children = null
        // d.id = i;
        // d._children = d.children;
        // if (d.depth && d.data.name.length !== 7) d.children = null;
      });

      update(null, root);
      // 缩放
      function setZoom() {
        // 创建一个缩放对象
        const zoom = d3.zoom()
          .scaleExtent([0.1, 100]) // 设置缩放范围
          .on("zoom", (current) => {
            const { transform } = current
            if (isNaN(transform.x)) return
            gLink.attr("transform", `translate(${transform.x},${transform.y}) scale(${transform.k})`);
            gNode.attr("transform", `translate(${transform.x},${transform.y}) scale(${transform.k})`);
          }); // 指定缩放时的回调函数

        // 将缩放对象应用于SVG元素
        svg.call(zoom);
      }
      setZoom()

      console.log(svg.node())

      this.$refs.container.appendChild(svg.node())


    }
  }
}
</script>

<style scoped lang="scss">
</style>
