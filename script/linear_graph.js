const d = new Date();
let timeStart = d.getTime();
const margin = {top: 10, right: 100, bottom: 110, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom,
margin2 = {top: 430, right: 100, bottom: 40, left: 40}
height2 = 500 - margin2.top - margin2.bottom;
 var svg = [];
 svg[0] = d3.select("#codeD3GraphFive").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

 svg[1] = d3.select("#codeD3GraphTen").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

var svgCamFive = d3.select("#codeD3CamFive").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform",
  "translate(" + width / 2 + "," + height / 2 + ")");

var svgCamTen = d3.select("#codeD3CamTen").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform",
  "translate(" + width / 2 + "," + height / 2 + ")");

/* Tableau contenant les categories favaories*/
var categFavFive = []
var categFavTen  = []

//if First time then createPie, else update
var boolPie = 0;

const categoriesDict = {
  1  : "Film & Animation",
  2  : "Autos & Vehicles",
  10 : "Music",
  15 : "Pets & Animals",
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

const categoriesDictShort = {
  1  : "F & A",
  2  : "A & V",
  10 : "Music",
  15 : "P & A",
  17 : "Sport",
  19 : "T & E",
  20 : "Gaming",
  22 : "P & B",
  23 : "Comedy",
  24 : "Entr.",
  25 : "N & P",
  26 : "H & S",
  27 : "Educ.",
  28 : "S & T",
  29 : "N & A"
}

//Stock All Lines for later utilisation
var lines = {};
d3.json(
  "data/test.json"
).then(function (json) {
  printTime("first Loading",timeStart)

  //Create an array of all month between first and last video :
  var dates = [];
  var values = []
  const a = json.reduce((a, b) => (a.date < b.date) ? a.date : b.date);

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
  let datas = [];
  //Create Value Table
  for (idCat in categoriesDict){
    let obj = {};
    obj.idCat = idCat;
    obj.values = []
    for(i in dates){
      let value = {}
      const da = new Date(dates[i]);

      value.date = da;
      let values_cat = []
      value.value = json.filter( (d) =>
        (da.getYear() == new Date(d.date).getYear() &&
         da.getMonth() == new Date(d.date).getMonth() &&
         idCat == d.categoryId)
      ).length
      obj.values.push(value)
    }
    datas.push(obj)
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

// Fonction pour mettre à jour les stats
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

// Fonction pour récupérer les stats pour une range de date
function getStat(date1, date2){
  console.log(date1)
  var categFav = new Object();
  var videoFav = new Object();

  const d = new Date();
  let time2Load = d.getTime();
  console.log("End of second loading :",time2Load," Duration :",(time2Load - timeStart)/ 1000)
  // On filtre le JSON pour la période sélectionnée
  var newJson = json.filter((d) => {
    const currentDate = par(new Date(d.date))
    if(currentDate > date1 && currentDate < date2){
      return d;
    }
  })
  // On compte le nombre de visionnage par catégorie
  for (var i = 0; i < newJson.length; i++) {
    const itemCat = newJson[i].categoryId
    if (categFav[itemCat] == null) categFav[itemCat] = 1
    else categFav[itemCat] ++

    const itemVid = newJson[i].title
    if (videoFav[itemVid] == null) videoFav[itemVid] = 1
    else videoFav[itemVid] ++
  }
  categFav = sortObject(categFav)
  videoFav = sortObject(videoFav)

  categFavFive = []
  categFavTen  = []

  categFavFive = categFav.slice(11,categFav.length)
  categFavTen = categFav.slice(0,10)

  changeStatInfo(categFavFive,videoFav, date1, date2)
}

var mouseLine = [];
var legend = [];
var x = [];
var y;
var axisX = [];
var axisY = [];
function createLineChart(arrayData, svgId, idGraph){
  //Initialize vertical line
    mouseLine[idGraph] = svgId.append("line") // this is the black vertical line to follow mouse
      .attr("class","mouseLine")
      .attr('x1', 0)
      .attr('y1', 0+margin.top)
      .attr('x2', 0)
      .attr('y2', height+margin.top)
      .style("stroke","black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      //Initialize scales for Line Chart and add axis
      x[idGraph] = d3.scaleTime().range([0, width]).domain(d3.extent(dates,(d)=> new Date(d)));

      y = d3.scaleLinear()
          .domain([0, d3.max(datas,(d)=> d3.max(d.values, (de) => de.value ) )])
          .range([ height, 0 ]);

          let focus = svgId.append("g")
            .attr("class", "focus")
            //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      axisX[idGraph] = focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x[idGraph]));
      axisY[idGraph] = focus.append("g")
        .attr("transform", `translate(-1,0)`)
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

     //Initialize Rect to catch mouse position on the svg (For the vertical line)
       svgId
         .append('rect')
         .style("fill", "none")
         .style("pointer-events", "all")
         .attr('width', width )
         .attr('height', height  )
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .on('mouseover', mouseover)
         .on('mousemove', mousemove)
         .on('mouseout',  mouseout);

       //Pour brush :
       let Line_chart = svgId.append("g")
         .attr("class", "focus")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .attr("clip-path", "url(#clip)");

    //Initialize Legend :
    legend[idGraph] = svgId
        .append('g')
        .attr('class', 'legend')


    //For each categories add a line and legend from datas
    for(i in arrayData){
      //append Line
      path = createPath(idGraph,arrayData[i],i);

      //Set Path in dictionnary of lines
      lines[arrayData[i].idCat] = path;

      // Append colored square legend
      createLegend(arrayData[i],i,idGraph);
    }


}
  let datas1 = [];
  let datas2 = [];
  datas1 = datas.slice(0, 5);
  datas2 = datas.slice(5, datas.length);
  createLineChart(datas1,svg[0],0);
  createLineChart(datas2,svg[1],1);

  let  x2 = d3.scaleTime().range([0, width]).domain(x[1].domain()),
         y2 = d3.scaleLinear().range([height2, 0]).domain(y.domain());
    xAxis2 = d3.axisBottom(x2);


    let context = svg[0].append("g")
      .attr("class", "context")
      .attr("transform", "translate(0," + margin2.top + ")");
    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

    // Tentative pour le brush
    var brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on("brush end", brushed);

    context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x[1].range());

    // Todo : Pour le brush



  i = 6;
  context.append("path")
    .datum(datas[i].values)
    .attr("class", "line")
    .attr('fill','none')
    .attr("id","line_"+datas[i].idCat)
    .attr("stroke", colorArray[i])
    .attr("data-id",datas[i].idCat)
    .attr("stroke-width", 3)
    .attr("d", d3.line()
    .x(function(d) { return x2(d.date) })
    .y(function(d) { return y2(d.value) }));

  context.append("g")
    .attr("class", "brush")//
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
      if(!categories_hidden.includes(parseInt(d.idCat))){

        const localMax = Math.max(...d.values.map(de => de.value));
        max = (max >= localMax) ? max : localMax;
      }
    });
    //Change domain to fit the line we want to show
    y.domain([0,max])
    axisY[1].transition(500).call(d3.axisLeft(y));

    let index = updatePath(categories_hidden, category_hidden);
    lines[category_hidden] = createPath(datas[index],index);

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
      if(!categories_hidden.includes(parseInt(d.idCat))){
        const localMax = Math.max(...d.values.map(de => de.value));
        max = (max >= localMax) ? max : localMax;
      }
    });

    //Upgrade y axis
    y.domain([0,max])
    axisY[1].transition(500).call(d3.axisLeft(y));

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
    mouseLine[1].attr('x1', cooX+margin.left).attr('x2', cooX+margin.left)
  }

  function mouseover() {
    mouseLine[1]
  .style("opacity", "0.5");
  }

  function mouseout() {
    mouseLine[1]
  .style("opacity", "0");

  }

//brush moved
  function brushed(event) {
    var s = event.selection || x2.range();

    x[1].domain(s.map(x2.invert, x2));

    //Line_chart.select(".line").attr("d", line);
    //focus.select(".axis--x").call(axisX);
    axisX[1].transition(500).call(d3.axisBottom(x[1]));

    updatePath([])

    /* On met à jour les statistiques*/
    getStat(par((x[1].domain()[0])), par((x[1].domain()[1])))

    if(boolPie == 0){
      createPie(svgCamFive, categFavFive,0)
      createPie(svgCamTen, categFavTen,1)
      boolPie ++
    }
    else {
      updatePie(svgCamFive, categFavFive,0)
      updatePie(svgCamTen, categFavTen,1)
    }

  }


  function type(d) {
    d.Date = parseDate(d.Date);
    d.Air_Temp = +d.Air_Temp;
    return d;
  }

  //Function Update all lines, arguments : array of hidden categories, if new line return the index of the line
  function updatePath(categories_hidden, category_hidden = -1){
    let index;
    for(i in datas){
      if(!categories_hidden.includes(datas[i].idCat)){
        if(datas[i].idCat == category_hidden){
          index = i;
        }
        lines[datas[i].idCat].transition(500)
        .attr("d", d3.line()
        .x(function(d) { ;return x[1](d.date) })
        .y(function(d) { return y(d.value) })
        )
      }
    }

    return index
  }

  //Function Creation of lines, argument : Id of the line
  function createPath(graphId,data,i){
    console.log(svg, graphId)
    return svg[graphId].append("path")
    .datum(data.values)
    .attr("fill", "none")
    .attr("class","lines")
    .attr("id","line_"+data.idCat)
    .attr("stroke", color(data.idCat))
    .attr("data-id",data.idCat)
    .attr("stroke-width", 3)
    .attr("d", d3.line()
    .x(function(d) {return x[graphId](d.date) })
    .y(function(d) { return y(d.value) })
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

  function createLegend(data,i,idGraph){
    legend[idGraph].append('rect')
    .attr('x', width - 130)
    .attr('y', i* 20 -10 )
    .attr('width', 10)
    .attr('height', 10)
    .attr("data_id",data.idCat)
    .attr("id","label_"+data.idCat)
    .attr('class', 'label_rect')
    .style('fill', color(data.idCat))
    .on('mouseover', function (d, i) {
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
    legend[idGraph].append('text')
      .attr('x', width - 115)
      .attr('y', i * 20)
      .style('font','icon')
      .attr('id',"labelText_"+data.idCat)
      .attr('class', "labelText")
      .text(categoriesDict[data.idCat]);
  }

  function hideAllExcept(id){

    if(categories_hidden.length +1 == datas.length){

      for(i in datas){
        updateView(parseInt(datas[i].idCat))
      }
    }else{

      for( i in lines){
        lines[i].remove();
      }
      categories_hidden = [];
      for(i in datas){
        categories_hidden.push(parseInt(datas[i].idCat));
      }
    }
    updateView(id);
  }

});
