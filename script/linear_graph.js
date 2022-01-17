const d = new Date();
let timeStart = d.getTime();
printTime("Time Start ",timeStart)
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

const widthPie = 400
var svgCamFive = d3.select("#codeD3CamFive").append("svg")
  .attr("width", widthPie)
  .attr("height", height)
  .append("g")
  .attr("transform",
  "translate(" + widthPie / 2 + "," + height / 2 + ")");

var svgCamTen = d3.select("#codeD3CamTen").append("svg")
  .attr("width", widthPie)
  .attr("height", height)
  .append("g")
  .attr("transform",
  "translate(" + widthPie / 2 + "," + height / 2 + ")");

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
var lastCategFavF = []
var test;
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
function changeStatInfo(categFav, videoFav, channelFav, countVideo, dateBeg, dateEnd){
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

  // On met a jour le top 3 des channels
  const lengChannel = channelFav.length
  const channelFav1 = channelFav[lengChannel - 1]
  const channelFav2 = channelFav[lengChannel - 2]
  const channelFav3 = channelFav[lengChannel - 3]

  d3.select("#favChannelOne").text(channelFav1[0] + " : " + channelFav1[1] + " vues")
  d3.select("#favChannelTwo").text(channelFav2[0] + " : " + channelFav2[1] + " vues")
  d3.select("#favChannelThree").text(channelFav3[0] + " : " + channelFav3[1] + " vues")

  // On met à jour le nombre total de vidéo vues
  d3.select("#videoCount").text(countVideo + ' vidéos')
}

// Fonction pour récupérer les stats pour une range de date
function getStat(date1, date2){
  var categFav   = new Object();
  var videoFav   = new Object();
  var channelFav = new Object();

  const d = new Date();
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

    const itemChannel = newJson[i].channelTitle
    if (channelFav[itemChannel] == null) channelFav[itemChannel] = 1
    else channelFav[itemChannel] ++
  }
  categFav   = sortObject(categFav)
  videoFav   = sortObject(videoFav)
  channelFav = sortObject(channelFav)

  var countVideo = 0;

  for(let i = 0; i < categFav.length; i++){
    countVideo += categFav[i][1]
  }

  categFavFive = []
  categFavTen  = []

  categFavFive = categFav.slice(categFav.length - 5, categFav.length).reverse()
  categFavTen = categFav.slice(0,categFav.length - 6).reverse()

  changeStatInfo(categFavFive.reverse(),videoFav, channelFav, countVideo, date1, date2)

}
// List of all hidden categories
var categories_hidden = []
var mouseLine = [];
var mouseHLine = [];
var legend = [];
var x = [];
var y = [];
var axisX = [];
var axisY = [];
var lines = [];
let line_chart = [];
let clip = [];

function createLineChart(arrayData, svgId, idGraph){




  categories_hidden[idGraph] = [];
  //Initialize vertical line
  mouseLine[idGraph] = svgId.append("line") // this is the black vertical line to follow mouse
  .attr("class","mouseLine")
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 0)
  .attr('y2', height)
  .style("stroke","black")
  .style("stroke-width", "0.3px")
  .style("opacity", "0");
  //Initialize vertical line
  mouseHLine[idGraph] = svgId.append("line") // this is the black vertical line to follow mouse
  .attr("class","mouseLine")
  .attr('x1', 0)
  .attr('y1', 0-margin.left)
  .attr('x2', width)
  .attr('y2', 0-margin.left)
  .style("stroke","black")
  .style("stroke-width", "0.3px")
  .style("opacity", "0");
  //Initialize scales for Line Chart and add axis
  x[idGraph] = d3.scaleTime().range([0, width]).domain(d3.extent(dates,(d)=> new Date(d)));

  y[idGraph] = d3.scaleLinear()
  .domain([0, d3.max(arrayData,(d)=> d3.max(d.values, (de) => de.value ) )])
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
  .call(d3.axisLeft(y[idGraph]));

  //Initialize Rect to catch mouse position on the svg (For the vertical line)
  svgId
  .append('rect')
  .style("fill", "none")
  .style("pointer-events", "all")
  .attr('width', width )
  .attr('height', height  )
  .attr('graph_id',idGraph)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Pour brush :
  line_chart[idGraph] = svgId.append("g")
  .attr("class", "focus")
  .attr("transform", "translate(" +0+ "," + 0 + ")")
  .attr("clip-path", "url(#clip_"+idGraph+")");

  clip[idGraph] = svgId.append("defs").append("svg:clipPath")
  .attr("id", "clip_"+idGraph)
  .append("svg:rect")
  .attr("width", width)
  .attr("height", height)
  .attr("x", 0)
  .attr("y", 0);
  //Initialize Legend :
  legend[idGraph] = svgId
  .append('g')
  .attr('class', 'legend')

  createPath(idGraph,arrayData);
  createLegend(idGraph,arrayData);

}
  getStat(par(dateStart),par(dateEnd));

  datas1 = formatDatas(categFavFive,categFavTen,datas)

  createLineChart(datas1[0],svg[0],0);
  createLineChart(datas1[1],svg[1],1);

  let  x2 = d3.scaleTime().range([0, width]).domain(x[0].domain()),
       y2 = d3.scaleLinear().range([height2, 0]).domain(y[0].domain());
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



  let lineBrushD = datas1[0].find(d => d.idCat == categFavFive[0][0])

  context.append("path")
    .datum(lineBrushD.values)
    .attr("class", "line")
    .attr('fill','none')
    .attr("id","line_"+lineBrushD.idCat)
    .attr("stroke", color(lineBrushD.idCat))
    .attr("data-id",lineBrushD.idCat)
    .attr("stroke-width", 2)
    .attr("d", d3.line()
    .x(function(d) { return x2(d.date) })
    .y(function(d) { return y2(d.value) }));



  //Function Creation of lines, argument : Id of the line
  function createPath(graphId,data){

    line_chart[graphId].selectAll(".lines")
    .data(data)
    .join('path')
    .attr("fill", "none")
    .attr("class","lines")
    .attr("id",d => "line"+d.idCat)
    .attr("stroke", d => color(d.idCat))
    .attr("data-id",d => d.idCat)
    .attr("stroke-width", 2)
    .attr("d", function(d){
      //console.log(categories_hidden, d.idCat)
      if(!categories_hidden[graphId].includes(d.idCat)){
        return d3.line()
          .x(function(d) {return x[graphId](d.date); })
          .y(function(d) { return y[graphId](+d.value); })
          (d.values)
      };

    }).on('mouseover', function (d, i) {
      d3.select(this).style("cursor", "pointer");
      //On MouseOver of Each Line
      const id = this.id
      svg[graphId].selectAll(".lines").filter(function() {
      return !(this.id == id || this.attributes.class.value.includes("hide"))
    }, id).attr('opacity', 0.1);
    }).on('mouseout', function (d, i) {
      d3.select(this).style("cursor", "default");
      svg[graphId].selectAll(".lines").filter(function() {
      return !(this.attributes.class.value.includes("hide"))
    }).attr('opacity', 1);
    }).on('click',function(){
        hideAllExcept(this.getAttribute("data-id"),graphId)
    }).transition()
    .duration(2000);
  }

  function createLegend(idGraph, data){

    legend[idGraph].selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', width - 130)
    .attr('y', function(d,i) {return i* 20 -10})
    .attr('width', 10)
    .attr('height', 10)
    .attr("data_id",d => d.idCat)
    .attr("id", d => "label_"+d.idCat)
    .attr('class', 'label_rect')
    .style('fill', d => color(d.idCat))
    .on('mouseover', function (d, i) {
      d3.select(this).style("cursor", "pointer");
      const id = d3.select(this).attr("data_id");
      mouseOver_animation(id,true,idGraph)
    }).on('mouseout', function (d, i) {
      d3.select(this).style("cursor", "default");
      const id = d3.select(this).attr("data_id");
      mouseOver_animation(id,false, idGraph)
    }).on("dblclick",function(d){
      TODO //On Double click remove all other Lines
    }).on('click', function (d, i) {
      var id_cat = d3.select(this).attr('data_id');
      hide_line(id_cat, idGraph);
    }).transition()
    .duration(2000);

    //Add text to legend
    legend[idGraph].selectAll('text')
    .data(data)
    .join('text')
      .attr('x', width - 115)
      .attr('y', (d,i) => i * 20)
      .style('font','icon')
      .attr('id',d => "labelText_"+d.idCat)
      .attr('class', "labelText")
      .text(d => categoriesDict[d.idCat]).transition()
      .duration(200);
  }
  //brush moved
  function brushed(event) {
    var s = event.selection || x2.range();

    /* On met à jour les statistiques*/
    getStat(par((x[1].domain()[0])), par((x[1].domain()[1])))
    for (i in datas1){
      x[i].domain(s.map(x2.invert, x2));
      axisX[i].transition(500).call(d3.axisBottom(x[i]));
      datas1 = formatDatas(categFavFive,categFavTen,datas);
      createPath(i, datas1[i])
      createLegend(i,datas1[i])
    }
    test = createPie(svgCamFive, categFavFive, test)
    createPie(svgCamTen, categFavTen,1)
  }


  function hideAllExcept(id, idGraph){
    //If only one is left / else
    if(categories_hidden[idGraph].length +1 == datas1[idGraph].length){
      categories_hidden[idGraph] = [];
      for(i in datas1[idGraph]){
        if(datas1[idGraph][i].idCat != id){
          hide_categories(datas1[idGraph][i].idCat);
        //  updateView(parseInt(datas1[idGraph][i].idCat), idGraph)
        }
      }
    }else{
      for(i in datas1[idGraph]){
         const idI = datas1[idGraph][i].idCat
         if(idI != id && (!d3.select("#label_"+idI).classed('hide'))){
           categories_hidden[idGraph].push(idI)
           hide_categories(datas1[idGraph][i].idCat);

           //hide_line(idI,idGraph);
         }
        // }
      }
    //  updateView(id,idGraph,1);
    }
    updateYScale(idGraph);
    createPath(idGraph,datas1[idGraph]);
  }

  function updateYScale(idGraph){
    //FInd New Max of line Graph
    let max = 0;
    datas1[idGraph].map(function(d){
      if(!categories_hidden[idGraph].includes(d.idCat)){

        const localMax = Math.max(...d.values.map(de => de.value));
        max = (max >= localMax) ? max : localMax;
      }
    });
    //Change domain to fit the line we want to show
    y[idGraph].domain([0,max])
    axisY[idGraph].transition(500).call(d3.axisLeft(y[idGraph]));
  }

  function hide_line(idLine, idGraph){
    hide_categories(idLine);
    if(categories_hidden[idGraph].includes(idLine)){
      categories_hidden[idGraph].splice(categories_hidden[idGraph].indexOf(idLine), 1)
    }else{
      categories_hidden[idGraph].push(idLine);
    }
    updateYScale(idGraph);
    createPath(idGraph,datas1[idGraph])

  }
});
