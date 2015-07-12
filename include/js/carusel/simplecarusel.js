var carousel = new(function(){

this.create = function(id,width,count){
  var ul = $('#' + id + ' .carousel_images')[0];
  var imgs = ul.getElementsByTagName('li');

  var position = 0;
  $('#' + id + ' .left-arrow').click(function() {
    if (position >= 0) {
      this.style.color = "#999999";
      return false;
    }
    $('#' + id + ' .right-arrow').css('color','#444');
    position = Math.min(position + width*count, 0)
    ul.style.marginLeft = position + 'px';
    return false;
  });

  $('#' + id + ' .right-arrow').click(function() {
    if (position <= -width*(imgs.length-count)) {
      this.style.color = "#999999";    
      return false;
    }
    $('#' + id + ' .left-arrow').css('color','#444');    
    position = Math.max(position-width*count, -width*(imgs.length-count));
    ul.style.marginLeft = position + 'px';
    return false;
  });
}

});