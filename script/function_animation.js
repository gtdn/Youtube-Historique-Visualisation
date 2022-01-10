function hide_categories(data_id){
  let x =   d3.select("#label_"+data_id)
  if(!x.classed('hide')){
    x.attr("opacity",0.5)
    d3.select("#labelText_"+data_id).style('fill', 'lightgrey')

    x.classed('hide',true)
  }else{
    d3.select("#label_"+data_id).attr("opacity",1)
    x.attr("opacity",1)
    d3.select("#labelText_"+data_id).style('fill', 'black')

    x.classed('hide',false)
  }
}

function mouseOver_animation(data_id, isMouseOver){

  let x = d3.select("#label_"+data_id)
  if(isMouseOver){
    x.transition()
    .duration('50')
    .attr('opacity', '.6');
    d3.select("#labelText_"+data_id).style('fill', 'lightgrey')
  }else if(!x.classed('hide')){
    x.transition()
    .duration('50')
    .attr('opacity', '1');
    d3.select("#labelText_"+data_id).style('fill', 'black')
  }

}
