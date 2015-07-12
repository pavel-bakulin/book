$(function() {
  $('#button_leave_comment').on('click',function(event){
    //the user authorized
    $.ajax({
      type: "POST",
      url: "../../../auth?separate=1",
      success: function(response){
        var obj = JSON.parse(response);
        if(parseInt(obj.is_user)!=1){
          var html = '<ul id="navlist_soc">';
          html+= '<li id="facebook_soc"></li>';
          html+= '<li id="google_soc"><a href="css_intro.asp"></a></li>';
          html+= '<li id="mail_soc"><a href="css_syntax.asp"></a></li>';
          html+= '<li id="ok_soc"><a href="css_syntax.asp"></a></li>';
          html+= '<li id="twitter_soc"><a href="css_syntax.asp"></a></li>';
          html+= '<li id="twitter_soc"><a href="css_syntax.asp"></a></li>';
          html+= '</ul>';
          $('#myModal').modal('show'); // initializes and invokes show immediately
          $('#myModal .modal-title').html('Войдите на сайт');
          $('#myModal .modal-body').html(html);
          $('#myModal .modal-content').css('width','500px');
        } else {
          alert(obj);
        }

      }
    });
  });
  
  $('#facebook_soc').on('click',function(event){
  
    
  });

  $('#google_soc').on('click',function(event){
  });

  
});