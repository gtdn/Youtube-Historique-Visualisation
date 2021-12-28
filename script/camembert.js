const categ = [["29",1],["44",1],["2",2],["15",4],["19",7],["17",25],["27",64],["1",70],["26",76],["28",77],["25",106],["22",157],["23",236],["24",426],["10",799],["20",1195]]

const color = d3.scaleOrdinal(['#eca1a6','#8ca3a3','#d4ac6e','#7a3b2e','#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c', '#563f46']);

var svgCam = d3.select("#codeD3Cam").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform",
  "translate(" + width / 2 + "," + height / 2 + ")");

const radius = 100

const pie = d3.pie()
  .sort(null)
  .value((d) => d[1]);

const arc = d3.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

const label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);

const arcs = svgCam.selectAll("arc")
                .data(pie(categ))
                .enter()
                .append("g")
                .attr("class", "arc")

function mouseover() {
    mouseLine
  .style("opacity", "0.5");
  }

  function mouseout() {
    mouseLine
  .style("opacity", "0");

  }

arcs.append("path")
      .attr("fill", function(d, i) {
          return color(i);
      })
      .attr("d", arc)
      .on('mouseover', function (d){ d3.select(this).style("opacity", 0.5)})
      .on('mouseout', function (d){ d3.select(this).style("opacity", 1)});

svgCam.append("g")
   .attr("transform", "translate(" + (width / 2 - 480) + "," + height / 2 + ")")
   .append("text")
   .text("Camembert des catégories")
   .attr("class", "title")





