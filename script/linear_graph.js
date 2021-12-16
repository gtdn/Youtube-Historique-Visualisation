var margin = {top: 20, right: 20, bottom: 30, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select("#codeD3").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");
var categories = [
  {"id" : 1, "name" : "Film & Animation"},
  {"id" : 2, "name" : "Autos & Vehicles"},
  {"id" : 10, "name" : "Music"},
  {"id" : 15, "name" : "Pets & Animals"},
  {"id" : 17, "name" : "Sports"},
  {"id" : 19, "name" : "Travel & Events"},
  {"id" : 20, "name" : "Gaming"},
  {"id" : 22, "name" : "People & Blogs"},
  {"id" : 23, "name" : "Comedy"},
  {"id" : 24, "name" : "Entertainment"},
  {"id" : 25, "name" : "News & Politics"},
  {"id" : 26, "name" : "Howto & Style"},
  {"id" : 27, "name" : "Education"},
  {"id" : 28, "name" : "Science & Technology"},
  {"id" : 29, "name" : "Nonprofits & Activism"}
];
var colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF"
];

d3.json(
  "data/parsed_data_api_2.json"
).then(function (json) {

  //Create an array of datas By categories
  var structByCategories={};
//  console.log(categories)
  for (i in categories){
    let cat_video = json.filter(function(d){
      if(d.items[0] !== undefined){
        return d.items[0].snippet.categoryId == categories[i].id;
      }
    });
    structByCategories[i] = cat_video;
  }
//  console.log(structByCategories);


  //Create an array of all month between first and last video :
  var dates = [];
  var values = []
  var dateEnd = new Date(json[0].date);
  var dateStart = new Date(json[json.length-1].date);
  var month = new Date(dateStart);
  var par = d3.timeFormat("%Y-%m")
  nbMonth = ((dateEnd.getYear()-dateStart.getYear())*12)+(dateEnd.getMonth()-dateStart.getMonth())
   while(!(dateEnd.getYear() == month.getYear() && dateEnd.getMonth() == month.getMonth())){
      dates.push(par(month));
      month = new Date(month.setMonth(month.getMonth()+1))
  }
  dates.push(par(month));
console.log(dates)
//Create a structure of video by Categories AND Month
  let max = 0;
  let datas = []
  //Create Value Table

  for(i in dates){

    const da = new Date(dates[i]);
    let obj = {}
    obj.dates = da
    let values_cat = []
    for (j in structByCategories){
      //console.log(structByCategories[j])

      values_cat[j] = structByCategories[j].filter((d) =>
      (da.getYear() == new Date(d.date).getYear() &&
      da.getMonth() == new Date(d.date).getMonth())).length;

    }

    obj.values = values_cat;
    datas.push(obj)
  }


  //Initialize Line Chart with scales
  var x = d3.scaleTime().range([0, width]).domain(d3.extent(datas,(d)=> d.dates));
  svg.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
      .domain([0, d3.max(datas,(d)=> Math.max(...d.values) )])
      .range([ height, 0 ]);
  svg.append("g")
      .call(d3.axisLeft(y));
  // define the 1st line


for(i in categories){

    path = svg.append("path")
    .datum(datas)
    .attr("fill", "none")
    .attr("class","lines")
    .attr("stroke", colorArray[i])
    .attr("stroke-width", 3)
    .attr("d", d3.line()
    .x(function(d) { return x(d.dates) })
    .y(function(d) { return y(d.values[i]) })
  ).on('mouseover', function (d, i) {
  //  console.log(this)
    d3.select(".lines").a
    d3.select(this).transition()
    .duration('50')
    .attr('opacity', '.85');
  }).on('mouseout', function (d, i) {
    d3.select(this).transition()
    .duration('50')
    .attr('opacity', '1');
  })
}

// This allows to find the closest X index of the mouse:
var bisect = d3.bisector(function(d) { return d.x; }).left;


// Create the text that travels along the curve of chart
// var focusText = svg
// .append('g')
// .append('text')
//   .style("opacity", 0)
//   .attr("text-anchor", "left")
//   .attr("alignment-baseline", "middle")
// Create a rect on top of the svg area: this rectangle recovers mouse position
svg
  .append('rect')
  .style("fill", "none")
  .style("pointer-events", "all")
  .attr('width', width)
  .attr('height', height)
  .on('mouseover', mouseover)
  .on('mousemove', mousemove)
  .on('mouseout', mouseout);

var mouseLine = svg.append("line") // this is the black vertical line to follow mouse
  .attr("class","mouseLine")
  .attr('x1', 500)
  .attr('y1', 0)
  .attr('x2', 500)
  .attr('y2', height)
  .style("stroke","black")
  .style("stroke-width", "1px")
  .style("opacity", "0");

  function mousemove(e) {
    var coordinates= d3.pointer(e);
    var cooX = coordinates[0];
    var cooY = coordinates[1];
   //  mouseLine
   // .attr("d", function(){
   //   yRange = y.range(); // range of y axis
   //   var xCoor = cooX; // mouse position in x
   //   var xDate = x.invert(xCoor);
   //
   // })
  /* svg.append('line')
    .attr('x1', 0)
    .attr('y1', y)
    .attr('x2', width)
    .attr('y2', y)
    .attr('stroke', 'red')*/
    mouseLine.attr('x1', cooX).attr('x2', cooX)
    // .attr("d", function(){
    // yRange = y.range(); // range of y axis
    // var xCoor = cooX; // mouse position in x
    // var xDate = x.invert(xCoor);
    // });

  }
  function mouseover() {
    mouseLine
  .style("opacity", "0.5");
  //  console.log("over")
  }
  function mouseout() {
    mouseLine
  .style("opacity", "0.5");
  //  console.log("out")
  }
  // // What happens when the mouse move -> show the annotations at the right positions.
  // function mouseover() {
  //   focus.style("opacity", 1)
  //   focusText.style("opacity",1)
  // }
  //
  // function mousemove() {
  //   // recover coordinate we need
  //   var x0 = x.invert(d3.pointer(this)[0]);
  //   var i = bisect(datas, x0, 1);
  //   selectedData = datas[i];
  //   focus
  //     .attr("cx", x(selectedData.x))
  //     .attr("cy", y(selectedData.y))
  //   focusText
  //     .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
  //     .attr("x", x(selectedData.x)+15)
  //     .attr("y", y(selectedData.y))
  //   }
  // function mouseout() {
  //   focus.style("opacity", 0)
  //   focusText.style("opacity", 0)
  // }


});
