const categ = [["29",1],["44",1],["2",2],["15",4],["19",7],["17",25],["27",64],["1",70],["26",76],["28",77],["25",106],["22",157],["23",236],["24",426],["10",799],["20",1195]]

const colorArray = [
    '#6c9ea3',
    '#e5d4be',
    '#F57C00',
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

const pie = d3.pie()
  .sort(null)
  .value((d) => d[1]);

function createPie(svg, categ, element) {
  console.log(categ)

  const arc = d3.arc()
      .innerRadius(radius / 2)
      .outerRadius(radius);

  const label = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius - 80);

  arcs[element] = svg.selectAll("arc")
          .data(pie(categ))
          .enter()
          .append("g")
          .attr("class", "arc")

  d3.select(".arc").append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text("Camembert Catégorie");

  arcs[element].append("path")
        .attr("fill", d => color(d.data[0]))
        .attr("d", arc)
        .on('mouseover', function (d){ d3.select(this).style("opacity", 0.5)})
        .on('mouseout', function (d){ d3.select(this).style("opacity", 1)})
        .append("title")
        .text(d => categoriesDict[d.data[0]] + " : " + d.data[1]);

  arcs[element].filter((d) => d.endAngle - d.startAngle > .4)
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("transform",(d) => "translate("+arc.centroid(d) + ")")
      .text((d) => categoriesDictShort[d.data[0]]);

  }

function updatePie(svg, categ, element){
  console.log("Updtate")
  /*console.log(categ)

  arcs[element].selectAll("arc")
      .data(pie(categ))

  arcs[element].attr("fill", d => color(d.data[0]))
    .text(d => categoriesDict[d.data[0]] + " : " + d.data[1]);

  arcs[element].filter((d) => d.endAngle - d.startAngle > .4)
    .text((d) => categoriesDictShort[d.data[0]]);
*/
}
