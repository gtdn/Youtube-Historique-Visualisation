var margin = {top: 10, right: 100, bottom: 110, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom,
margin2 = {top: 430, right: 100, bottom: 40, left: 40}
height2 = 500 - margin2.top - margin2.bottom;

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
//Stock All Lines for later utilisation
var lines = {};
d3.json(
  "data/data2.json"
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
  const a = json.reduce((a, b) => (a.date < b.date) ? a.date : b.date);

  var dateEnd = new Date(json[0].date);
  var dateStart = new Date(json[json.length-1].date);
  var month = new Date(dateStart);
  var par = d3.timeFormat("%Y-%m")
  nbMonth = ((dateEnd.getYear()-dateStart.getYear())*12)+(dateEnd.getMonth()-dateStart.getMonth())
  //console.log(dateStart,dateEnd)
   while(!(dateEnd.getYear() == month.getYear() && dateEnd.getMonth() == month.getMonth())){
      dates.push(par(month));
      month = new Date(month.setMonth(month.getMonth()+1))
  }
  dates.push(par(month));

// add statistique date start and dateEnd
d3.select("#periodeDate").text(par(dateStart) +" - "+par(dateEnd))

const categoriesDict = {
  1  : "Film & Animation",
  2  : "Autos & Vehicles",
  10 : "Music",
  15 :"Pets & Animals",
  17 : "Sports",
  19 : "Travel & Events",
  20 : "Gaming",
  22 : "People & Blogs",
  23 : "Comedy",
  24 : "Entertainment",
  25 : "News & Politics",
  26 : "Howto & Style",
  27 : "Education",
  28 : "Science & Technology",
  29 : "Nonprofits & Activism"
}
// Fonction pour trier des objets
function sortObject(obj){
  var sortable = [];
  for (var item in obj) {
    sortable.push([item, obj[item]]);
  }
  sortable.sort(function(a, b) {
      return a[1] - b[1];
  });
  return sortable;
}

function changeStatInfo(categFav, videoFav, dateBeg, dateEnd){
  // On met a jour le titre
  d3.select("#periodeDate").text(dateBeg +" - "+ dateEnd)

  // On met a jour les catégories
  const lengCat = categFav.length
  const categFav1 = categFav[lengCat - 1]
  const categFav2 = categFav[lengCat - 2]
  const categFav3 = categFav[lengCat - 3]

  d3.select("#favCatOne").text(categoriesDict[categFav1[0]] + " : " + categFav1[1])
  d3.select("#favCatTwo").text(categoriesDict[categFav2[0]] + " : " + categFav2[1])
  d3.select("#favCatThree").text(categoriesDict[categFav3[0]] + " : " + categFav3[1])

  // On met a jour le top 3 des vidéos
  const lengVid = videoFav.length
  const videoFav1 = videoFav[lengVid - 1]
  const videoFav2 = videoFav[lengVid - 2]
  const videoFav3 = videoFav[lengVid - 3]

  d3.select("#favVidOne").text(videoFav1[0] + " : " + videoFav1[1] + " vues")
  d3.select("#favVidTwo").text(videoFav2[0] + " : " + videoFav2[1] + " vues")
  d3.select("#favVidThree").text(videoFav3[0] + " : " + videoFav3[1] + " vues")


}

function getStat(date1, date2){
  const dateTest1 = "2021-01"
  const dateTest2 = "2021-12"
  var categFav = new Object();
  var videoFav = new Object();
  d3.json("data/data.json").then(function (json){
    // On filtre le JSON pour la période sélectionnée
    var newJson = json.filter((d) => {
      const currentDate = par(new Date(d.date))
      if(currentDate > dateTest1 && currentDate < dateTest2){
        return d;
      }
    })
    // On compte le nombre de visionnage par catégorie
    console.log(newJson)
    for (var i = 0; i < newJson.length; i++) {   
      if(newJson[i].items[0] !== undefined){
        const itemCat = newJson[i].items[0].snippet.categoryId
        if (categFav[itemCat] == null) categFav[itemCat] = 1 
        else categFav[itemCat] ++

        const itemVid = newJson[i].items[0].snippet.localized.title
        if (videoFav[itemVid] == null) videoFav[itemVid] = 1 
        else videoFav[itemVid] ++
      }
    }
    categFav = sortObject(categFav)
    videoFav = sortObject(videoFav)
    
    changeStatInfo(categFav,videoFav, dateTest1, dateTest2)
  })
}

getStat(par(dateStart),par(dateEnd))


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
//Initialize vertical line
  var mouseLine = svg.append("line") // this is the black vertical line to follow mouse
    .attr("class","mouseLine")
    .attr('x1', 0)
    .attr('y1', 0+margin.top)
    .attr('x2', 0)
    .attr('y2', height+margin.top)
    .style("stroke","black")
    .style("stroke-width", "1px")
    .style("opacity", "0");



  //Initialize scales for Line Chart and add axis
  var x = d3.scaleTime().range([0, width]).domain(d3.extent(datas,(d)=> d.dates));

  var y = d3.scaleLinear()
      .domain([0, d3.max(datas,(d)=> Math.max(...d.values) )])
      .range([ height, 0 ]);



  var  x2 = d3.scaleTime().range([0, width]).domain(x.domain()),
       y2 = d3.scaleLinear().range([height2, 0]).domain(y.domain());
  xAxis2 = d3.axisBottom(x2);

  var focus = svg.append("g")
    .attr("class", "focus")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(0," + margin2.top + ")");
  context.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);


  var axisX = focus.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
  var axisY = focus.append("g")
    .attr("transform", `translate(-1,0)`)
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

 //Initialize Rect to catch mouse position on the svg (For the vertical line)
   svg
     .append('rect')
     .style("fill", "none")
     .style("pointer-events", "all")
     .attr('width', width )
     .attr('height', height  )
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
     .on('mouseover', mouseover)
     .on('mousemove', mousemove)
     .on('mouseout', mouseout);

   //Pour brush :
   var Line_chart = svg.append("g")
     .attr("class", "focus")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
     .attr("clip-path", "url(#clip)");

//Initialize Legend :
  var legend = svg
    .append('g')
    .attr('class', 'legend')


//For each categories add a line and legend from datas
for(i in categories){
  //append Line
    path = createPath(i)

  //Set Path in dictionnary of lines
  lines[categories[i].id] = path;

  // Append colored square legend
  legend.append('rect')
  .attr('x', width - 130)
  .attr('y', i* 20 -10 )
  .attr('width', 10)
  .attr('height', 10)
  .attr("data_id",categories[i].id)
  .attr("id","label_"+categories[i].id)
  .attr('class', 'label_rect')
  .style('fill', colorArray[i]).on('mouseover', function (d, i) {
    //TODO Stay low opacity when path removed
    d3.select(this).transition()
    .duration('50')
    .attr('opacity', '.85');
  }).on('mouseout', function (d, i) {
    d3.select(this).transition()
    .duration('50')
    .attr('opacity', '1');
  }).on("dblclick",function(d){
    TODO //On Double click remove all other Lines
  }).on('click', function (d, i) {
    //On Click remove this line
    var id_cat = d3.select("#"+this.id).attr('data_id');
    updateView(id_cat);
  });

  //Add text to legend
  legend.append('text')
    .attr('x', width - 115)
    .attr('y', i * 20)
    .style('font','icon')
    .attr('id',"labelText_"+categories[i].id)
    .attr('class', "labelText")
    .text(categories[i].name);


}
// Tentative pour le brush
var brush = d3.brushX()
  .extent([[0, 0], [width, height2]])
  .on("brush end", brushed);

var zoom = d3.zoom()
  .scaleExtent([1, Infinity])
  .translateExtent([[0, 0], [width, height]])
  .extent([[0, 0], [width, height]])
  .on("zoom", zoomed);


context.append("g")
  .attr("class", "brush")
  .call(brush)
  .call(brush.move, x.range());


// Todo : Pour le brush
///*
  i = 6;
  context.append("path")
    .datum(datas)
    .attr("class", "line")
    .attr('fill','none')
    .attr("id","line_"+categories[i].id)
    .attr("stroke", colorArray[i])
    .attr("data-id",categories[i].id)
    .attr("stroke-width", 3)
    .attr("d", d3.line()
    .x(function(d) { return x2(d.dates) })
    .y(function(d) { return y2(d.values[i]) }));



  context.append("g")
    .attr("class", "brush")//*/
  //  .call(brush)
  //  .call(brush.move, x.range());


//Todo This allows to find the closest X index of the mouse:
var bisect = d3.bisector(function(d) { return d.x; }).left;

//TODO Display text all along vertical Line
// Create the text that travels along the curve of chart
// var focusText = svg
// .append('g')
// .append('text')
//   .style("opacity", 0)
//   .attr("text-anchor", "left")
//   .attr("alignment-baseline", "middle")
// Create a rect on top of the svg area: this rectangle recovers mouse position

// List of all hidden categories
var categories_hidden = []

//Function to update view when a category is hidden
function updateView(category_hidden){

  let square = d3.select("#label_"+category_hidden);

  category_hidden = parseInt(category_hidden);
  // If Already hide / Else
  if(categories_hidden.includes(category_hidden)){
    //Change opacity of legend
    square.attr("opacity",1)
    d3.select("#labelText_"+category_hidden).style('fill', 'black')

    //Remove from hidden
    categories_hidden.splice(categories_hidden.indexOf(category_hidden), 1);

    //FInd New Max of line Graph
    let max = 0;
    datas.map(function(d){
      for (i in categories){
        if(!categories_hidden.includes(categories[i].id)){
          max = (max >= d.values[i]) ? max : d.values[i];
        }
      }
    });
    //Change domain to fit the line we want to show
    y.domain([0,max])
    axisY.transition(500).call(d3.axisLeft(y));

    let index = updatePath(categories_hidden, category_hidden);

    lines[category_hidden] = createPath(index);

  }else{
    //Change Opacity of legend
    square.attr("opacity",0.5)
    d3.select("#labelText_"+category_hidden).style('fill', 'lightgrey')

    //console.log(category_hidden, lines[category_hidden]);
    lines[category_hidden].remove();

    categories_hidden.push(category_hidden);
    //currentCategories = currentCategories.filter(function(d) {return d.id != category_hidden })
    //We're looking for the max of all lines without the current category
    let max = 0;
    datas.map(function(d){
      for (i in categories){
        if(!categories_hidden.includes(categories[i].id)){
          max = (max >= d.values[i]) ? max : d.values[i];
        }
      }
    });

    //Upgrade y axis
    y.domain([0,max])
    axisY.transition(500).call(d3.axisLeft(y));

    //Upgrade Others Paths :
    updatePath(categories_hidden);
  }


}

//Function mouse action on svg
  function mousemove(e) {
    var coordinates= d3.pointer(e);
    var cooX = coordinates[0];
    var cooY = coordinates[1];
    //Move verticalLine on the SVG
    mouseLine.attr('x1', cooX+margin.left).attr('x2', cooX+margin.left)
  }

  function mouseover() {
    mouseLine
  .style("opacity", "0.5");
  }

  function mouseout() {
    mouseLine
  .style("opacity", "0");

  }

//brush moved
  function brushed(event) {
    if (event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = event.selection || x2.range();


    x.domain(s.map(x2.invert, x2));
    //Line_chart.select(".line").attr("d", line);
    //focus.select(".axis--x").call(axisX);
    axisX.transition(500).call(d3.axisBottom(x));

    svg.select(".zoom").transition(500).call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));

    updatePath([])

  }

  function zoomed(event) {
    if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = event.transform;
    x.domain(t.rescaleX(x2).domain());
    //Line_chart.select(".line").attr("d", line);
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  }

  function type(d) {
    d.Date = parseDate(d.Date);
    d.Air_Temp = +d.Air_Temp;
    return d;
  }

  //Function Update all lines, arguments : array of hidden categories, if new line return the index of the line
  function updatePath(categories_hidden, category_hidden = -1){
    let index;
    for(i in categories){
      if(!categories_hidden.includes(categories[i].id)){
        if(categories[i].id == category_hidden){
          index = i;
        }
        lines[categories[i].id].transition(500)
        .attr("d", d3.line()
        .x(function(d) { return x(d.dates) })
        .y(function(d) { return y(d.values[i]) })
        )
      }
    }
    return index
  }

  //Function Creation of lines, argument : Id of the line
  function createPath(i){
    return svg.append("path")
    .datum(datas)
    .attr("fill", "none")
    .attr("class","lines")
    .attr("id","line_"+categories[i].id)
    .attr("stroke", colorArray[i])
    .attr("data-id",categories[i].id)
    .attr("stroke-width", 3)
    .attr("d", d3.line()
    .x(function(d) { return x(d.dates) })
    .y(function(d) { return y(d.values[i]) })
    ).on('mouseover', function (d, i) {
      //On MouseOver of Each Line
      const id = this.id
      d3.selectAll(".lines").filter(function() {
      return !(this.id == id || this.attributes.class.value.includes("hide"))
    }, id).attr('opacity', 0.5);
    }).on('mouseout', function (d, i) {
      d3.selectAll(".lines").filter(function() {
      return !(this.attributes.class.value.includes("hide"))
    }).attr('opacity', 1);
  }).on('click',function(){

      hideAllExcept(this.getAttribute("data-id"))

  });
  }

  function hideAllExcept(id){

    if(categories_hidden.length +1 == categories.length){
      for(i in categories){
        updateView(categories[i].id)
      }
    }else{
      categories_hidden = [];
      for( i in lines){
        lines[i].remove();
      }
      for(i in categories){
        categories_hidden.push(categories[i].id);
      }
    }

    updateView(id);
  }

});
