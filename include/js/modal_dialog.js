var modal_center_set = function(id){
  // set margin-top on dialog show
  var t = $('#' + id),
      d = t.find('.modal-dialog'),
      dh = d.height(),        
      w = $(window).width(),
      h = $(window).height();
  // if it is desktop & dialog is lower than viewport
  // (set your own values)
  if (w > 380 && (dh + 60) < h) {
      d.css('margin-top', Math.round((h - dh) / 2)-30);
  } else {
      d.css('margin-top', '');
  }
}

window.DialogModalSimple = new (function(id){ 
  //Modal
  var html = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
  html+= '<div class="modal-dialog" role="document">';
  html+= '<div class="modal-content">';
  html+= '<div class="modal-header">';
  html+= '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  html+= '<h4 class="modal-title" id="myModalLabel"></h4>';
  html+= '</div>';
  html+= '<div class="modal-body"></div>';
  html+= '<div class="modal-footer">';
  html+= '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
  html+= '</div>';
  html+= '</div>';
  html+= '</div>';
  html+= '</div>';
  
});