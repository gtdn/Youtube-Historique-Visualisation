function hide_categories(data_id){
  let x =   d3.select("#label_"+data_id)
  if(!x.classed('hide')){
    x.attr("opacity",0.5)
    x.attr("opacity",0)
    d3.select("#labelText_"+data_id).style('fill', 'lightgrey')

    x.classed('hide',true)
  }else{
    d3.select("#label_"+data_id).attr("opacity",1)
    x.attr("opacity",1)
    d3.select("#labelText_"+data_id).style('fill', 'black')

    x.classed('hide',false)
  }
}
