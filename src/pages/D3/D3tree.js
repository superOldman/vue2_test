
// <g class="node" transform="" fill-opacity="1" stroke-opacity="1">
//   <rect width="132" height="38" stroke-width="0" stroke="" stroke-dasharray="3" fill="url(#stream_level1)" rx="8" ry="8" x="-66" y="-19" text-anchor="middle"></rect>
//   <text fill="#FFF" x="0" y="5" text-anchor="middle" style="font-weight: bold;">
//     <tspan>手机产业链</tspan>
//   </text>
//   <rect width="132" height="38" fill="transparent" rx="8" ry="8" x="-66" y="-19" text-anchor="middle"></rect>
//   <g class="icon-text" opacity="1">
//     <circle class="icon-circle" r="8" fill="#B4BACA" cx="66" cy="0"></circle>
//     <text class="icon_undefined" x="66" y="4" fill="#FFF" text-anchor="middle" style="font-size: 14px; font-weight: bold;">
//       <tspan>-</tspan>
//     </text>
//   </g>
//   <title>手机产业链</title>
// </g>
export function createNode(node, source, transition, handleFunction) {

  console.log('--------', node)
  // debugger
  let nodeEnter = node.enter().append("g")
    .attr("transform", d => `translate(${source.y0},${source.x0})`)
    .attr("fill-opacity", 0)
    .attr("stroke-opacity", 0)
    .attr("class", 'node')
    .attr("id", (d) => `g${d.id}`)

  //添加框
  nodeEnter.append("rect")
    .attr("width", 132)
    .attr("height", 38)
    .attr("x", -66)
    .attr("y", -19)
    .attr("rx", 8)
    .attr("ry", 8)
    // .attr("stroke-width", 2)
    // .attr("stroke", '#D0D1D6')
    // .attr("stroke-dasharray", 0)
    // .attr("fill", "#fff")
    .attr("fill", "url(#stream_level0)")


  nodeEnter.append("text")
    .attr("y", 5)
    .attr("x", 0)
    .attr("text-anchor", 'middle')
    .attr("paint-order", "stroke")
    .style('font-weight', 'bold')
    .text(d => d.data.name)


  // 添加按钮
  const icon = nodeEnter.append('g')
    .attr("class", 'icon-text')
    .attr("opacity", 1)

  icon.append('circle')
    .attr("class", 'icon-circle')
    .attr("fill", '#B4BACA')
    .attr("r", 8)
    .attr("cx", 66)
    .attr("cy", 0)


  icon.append('text')
    .attr("class", 'add_')
    .attr("x", 66)
    .attr("y", 4)
    .attr("fill", '#fff')
    .attr("text-anchor", 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text((d) => {
      if (d.children) {
        return '-'
      }
      else if (d._children) {
        return '+'
      }
      return '+'
    })  .on("click", (event, d) => {
      // debugger
      d.children = d.children ? null : d._children;
      handleFunction && handleFunction(event, d);
    });


  // debugger
  // Transition nodes to their new position.
  console.log('node', node)
  console.log('nodeEnter', nodeEnter)

  const nodeUpdate = node.merge(nodeEnter).transition(transition)
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .attr("fill-opacity", 1)
    .attr("stroke-opacity", 1)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node.exit().transition(transition).remove()
    .attr("transform", d => `translate(${source.y},${source.x})`)
    .attr("fill-opacity", 0)
    .attr("stroke-opacity", 0);



}



export function createResource(wrap) {
  // 复用集合
  const defs = wrap.append('defs')
  defs.append('pattern')
    .attr('id', 'stream_level0')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('patternContentUnits', 'objectBoundingBox')
    .append('image')
    .attr('href', '/img/cylbg.svg')
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