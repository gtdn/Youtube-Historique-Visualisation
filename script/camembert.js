const categ = [["29",1],["44",1],["2",2],["15",4],["19",7],["17",25],["27",64],["1",70],["26",76],["28",77],["25",106],["22",157],["23",236],["24",426],["10",799],["20",1195]]

const colorArray = [
    '#6c9ea3',
    '#e5d4be',
    '#eabeed',
    '#e38839',
    '#9c3546',
    '#6879a4',
    '#c7a8b8',
    '#6e5353',
    '#c1d1a0',
    '#9bc363',
    '#9b4065',
    '#482b58',
    '#ff5f5f',
    '#86cbe0',
    '#6bae55',
    '#554e47'
];

const color = d3.scaleOrdinal()
  .domain([1,2,10,15,17,19,20,22,23,24,25,26,27,28,29,44])
  .range(colorArray);

const radius = 150

var arcs = []

const arc = d3.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

const label = d3.arc()
            .outerRadius(radius-80)
            .innerRadius(radius/2);

var pie = d3.pie()
  .sort(null)
  .value((d) => d[1]);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


function createPie(svg, categ, element) {

  // Compute the position of each group on the pie:
  const pie = d3.pie()
    .value((d) => d[1])

    svg.selectAll("path")
    .data(pie(categ))
    .join('path')
    .attr('d', arc)
    .attr('fill',(d) => color(d.data[0]))
    .on('mouseover', function(event,d) {
      d3.select(this).style("opacity", 0.5)
      div.transition()
      .duration(200)
      .style("opacity", .9);
      div.html(categoriesDict[d.data[0]] + ' : ' + d.data[1] + ' vues')
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 20) + "px");
    })
    .on('mouseout', function(event, d) {
      d3.select(this).style("opacity", 1)
      div.transition()
      .duration(500)
      .style("opacity", 0);
    })
    .transition()
    .duration(1000)

  svg.selectAll("text")
    .data(pie(categ))
    .join('text')
    .filter((d) => d.endAngle - d.startAngle > .4)
    .text((d) => categoriesDictShort[d.data[0]])
    .attr("transform", (d) => "translate("+ arc.centroid(d) + ")")
    .style("text-anchor", "middle")
    .attr('fill','black')
    .on('mouseover', function(event,d) {
      d3.select(this).style("opacity", 0.5)
      div.transition()
      .duration(200)
      .style("opacity", .9);
      div.html(categoriesDict[d.data[0]] + ' : ' + d.data[1] + ' vues')
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 20) + "px");
    })
    .on('mouseout', function(event, d) {
      d3.select(this).style("opacity", 1)
      div.transition()
      .duration(500)
      .style("opacity", 0);
    })
    .transition()
    .duration(1000)

}

// function createPie(svg, categ, element) {

//   arcs[element] = svg.selectAll("arc")
//           .data(pie(categ))
//           .enter()

//   d3.select(".arc").append("text")
//       .attr("dy", ".35em")
//       .attr("text-anchor", "middle")
//       .text("Camembert Catégorie");

//   arcs[element]
//         .append("path")
//         .attr("fill", d => color(d.data[0]))
//         .attr("d", arc)
//         .on('mouseover', function (d){ d3.select(this).style("opacity", 0.5)})
//         .on('mouseout', function (d){ d3.select(this).style("opacity", 1)})
//         .append("title")
//         .text(d => categoriesDict[d.data[0]] + " : " + d.data[1]);

//   arcs[element].filter((d) => d.endAngle - d.startAngle > .4)
//       .append("text")
//       .attr("dy", ".35em")
//       .attr("text-anchor", "middle")
//       .attr("transform",(d) => "translate("+arc.centroid(d) + ")")
//       .text((d) => categoriesDictShort[d.data[0]]);

// }
