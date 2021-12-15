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
  "data/video_tim.json"
).then(function (json) {

  //Create an array of datas By categories
  var structByCategories={};
  console.log(categories)
  for (i in categories){
    let cat_video = json.filter(function(d){
      if(d.items[0] !== undefined){
        return d.items[0].snippet.categoryId == categories[i].id;
      }
    });
    structByCategories[i] = cat_video;
  }
  console.log(structByCategories);


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
  console.log(datas)

  //Create a Structure of video by month
  // datas = []
  // //Create Value Table
  // for(i in dates){
  //   var da = new Date(dates[i]);
  //   let obj = {}
  //   obj.dates = da
  //   obj.values = json.filter((d) =>
  //   (da.getYear() == new Date(d.date).getYear() &&
  //   da.getMonth() == new Date(d.date).getMonth())).length;
  //   datas.push(obj)
  // }


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
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.dates) })
      .y(function(d) { return y(d.values[i]) })
    )
}

d3.selectAll(".lines").on("mouseover", (e) => {
  console.log("Test")
  d3.selectAll(".lines").attr("opacity","80%");
})
  // Add the line



});
