<?php
/*CREATE TABLE `admin_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `passw` varchar(80) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 PACK_KEYS=0;*/
//INSERT INTO admin_site(login,passw,name) VALUES ('pavel', MD5('xxx'),'admin');
if(!$_SESSION['admin']){
?>
<script type="text/javascript">
$(function() {
//dialog initialization at page uploading
// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
		//$( "#dialog:ui-dialog" ).dialog( "destroy" );
		$( "#dialog_pass" ).dialog({
		    autoOpen: true,
     		position:['center','center'],
			modal: true,
			height:230,
			width:320,
			title:"Введите пароль",
            buttons: [{
			    id: "button_modal_dialog1",
				text: "Ok",
				click: function() { sub_passw(); }
			}]
		});
});

$(function() {
	var login = getCookie('admin_login');
	if(!login) login = "";
	$('#login').val(login);
})

function sub_passw(){
 var s = "login=" + document.getElementById("login").value + "&passw=" + document.getElementById("passw").value;
 $("#button_modal_dialog1").button("option", "disabled", true);
 var url = "../" + getRootDirectory() + "/adminsystem/auf?separate=1";
 new ajax_connect('POST',url,s,
			function callback_access(ss){
				if(parseInt(ss) >= 1){
					if(parseInt(ss)==1){
						setCookie('admin_login',document.getElementById("login").value,30)
						location.reload(true);
					}
				} else {
					$("#button_modal_dialog1").button("option", "disabled", false);
				    alert('Неправильно введен логин или пароль!');
				}
                 
			},
			function callback_error(ss){alert(ss);});
}

function GetChar (event){
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    if(parseInt(keyCode) == 13){
		//$("#button_modal_dialog1").focus();
		$("#button_modal_dialog1").click();
	}
}


</script>

<div id="dialog_pass" class="dialog">
<table border=0 cellpadding=0 cellspacing=0 width='100%' height='100%'><tr><td align='center' valign='middle'><table border=0 cellpadding=3 cellspacing=0>
<tr><td>Логин</td><td style='padding-left:10px'><input id='login' onkeyup="GetChar (event);" style='font-family:Arial, Helvetica, sans-serif;font-size:13px;text-align:justify;' size=25 type='text' value=''></td></tr>
<tr><td>Пароль</td><td style='padding-left:10px'><input id='passw' onkeyup="GetChar (event);" style='font-family:Arial, Helvetica, sans-serif;font-size:13px;text-align:justify;' size=25 type='password' value=''></td></tr>
</table></td></tr></table>
</div>
<?php
exit;
}
?>