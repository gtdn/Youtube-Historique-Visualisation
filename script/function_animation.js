function hide_categories(data_id){
  let x =   d3.select("#label_"+data_id);
  if(!x.classed('hide')){
    x.attr("opacity",0.5);
    d3.select("#labelText_"+data_id).style('fill', 'lightgrey');

    x.classed('hide',true);
  }else{
    d3.select("#label_"+data_id).attr("opacity",1);
    x.attr("opacity",1);
    d3.select("#labelText_"+data_id).style('fill', 'black');

    x.classed('hide',false);
  }
}

function mouseOver_animation(data_id, isMouseOver,idGraph){
  let x = d3.select("#label_"+data_id)
  if(isMouseOver && (!x.classed('hide'))){
    x.transition()
    .duration('50')
    .attr('opacity', '.6');
    d3.select("#labelText_"+data_id).style('fill', 'lightgrey')
    svg[idGraph].selectAll(".lines").each(function(d, i) {
      let l = d3.select(this);
      if(l.attr('data-id') != data_id){
        l.transition()
        .duration('50')
        .attr('opacity', '.3');
      }
    });
  }else if(!x.classed('hide')){
    x.transition()
    .duration('50')
    .attr('opacity', '1');
    d3.select("#labelText_"+data_id).style('fill', 'black')
    svg[idGraph].selectAll(".lines").each(function(d, i) {
      let l = d3.select(this);
      if(l.attr('data-id') != data_id){
        l.transition()
        .duration('50')
        .attr('opacity', '1');
      }
    });
  }

}
