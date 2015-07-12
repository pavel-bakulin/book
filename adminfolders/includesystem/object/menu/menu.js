$(document).ready(function() {
  $('ul#my-menu3 ul').each(function(i) {
    if ($.cookie('submenuMark-' + i)) {
		$(this).show();
		$(this).prev().removeClass('collapsed').addClass('expanded');
	}else {
		$(this).hide();
		$(this).prev().removeClass('expanded').addClass('collapsed');
	}
    $(this).prev().addClass('collapsible').click(function() {
	  var this_i = $('ul#my-menu3 ul').index($(this).next());
      if ($(this).next().css('display') == 'none') {
        $(this).next().slideDown(100, function () {
			$(this).prev().removeClass('collapsed').addClass('expanded');
			cookieSet(this_i);
		});
      }else {
        $(this).next().slideUp(100, function () {
			$(this).prev().removeClass('expanded').addClass('collapsed');
			cookieDel(this_i);
			$(this).find('ul').each(function() {
				$(this).hide(0, cookieDel($('div#pageMenu .submenu').index($(this)))).prev().removeClass('expanded').addClass('collapsed');
			});
		});
      }
      return false;
    });
  });
});

function cookieSet(index) {
	$.cookie('submenuMark-' + index, 'opened', {expires: null, path: '/'}); // Set mark to cookie (submenu is shown):
}
function cookieDel(index) {
	$.cookie('submenuMark-' + index, null, {expires: null, path: '/'}); // Delete mark from cookie (submenu is hidden):
}