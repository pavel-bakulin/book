<?php
Error_Reporting(E_ALL & ~E_NOTICE);
if (!isset($_SESSION)) {
	session_start();
} 
    
if(!isset($_SESSION['root_admin_dir'])){
	$path_root = '';
	$arr_url = explode("/",$_SERVER['REQUEST_URI']);
	if(count($arr_url)>0) {
		foreach($arr_url as $val){
			if(trim($val) != '') {
				$_SESSION['root_admin_dir'] = $val;
				break;
			}
		}	
	}
} 
$root_admin_dir = $_SESSION['root_admin_dir'];

//catalog path
if(!isset($_SESSION['productpictures_dir'])){
    $_SESSION['productpictures_dir'] = "info/catalogpictures/productpictures/";
}
if(!isset($_SESSION['personimagepictures_dir'])){
    $_SESSION['personimagepictures_dir'] = "info/catalogpictures/personimagepictures/";
}

define('PATH',dirname(__FILE__));
define('INCLUDE_PATH',dirname(__FILE__).'/includesystem/');
define('ADMIN_SYSTEM',dirname(__FILE__).'/adminsystem/');
define('SERVER_NAME',$_SERVER["SERVER_NAME"]);

require_once(INCLUDE_PATH.'class/db_connect.php');
require_once(INCLUDE_PATH.'class/common.php');
require_once(INCLUDE_PATH.'class/pictureresizer.php');
require_once('connect_to_base.php');
require_once('ftp_connect.php');

$incl_file_arr = array();
$incl_file_arr = include_file_real($_REQUEST['rqpath']);

//first parameter is needed for checking path there is really or not
$incl_file = "";
if($incl_file_arr[0]){
 $incl_file = $incl_file_arr[0];
}
//second parameter is needed to determine opens into this window or create new window
if($incl_file_arr[1]){
	$incl_separate = $incl_file_arr[1];
}

//for ajax query should to exit from page
if($incl_separate==1){
	include $incl_file;
	unset($base);
	exit();
}

$s_url = $_SERVER['REQUEST_URI'];
$s_url = trim(str_replace("/","",$s_url));
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
<title></title>
<META HTTP-EQUIV="Content-Type" content="text/html;charset=utf-8">
<!--This is system files-->
<link rel="stylesheet" type="text/css" href="../../../<?php echo $root_admin_dir;?>/includesystem/css/common.css">
<link rel="stylesheet" type="text/css" href="../../../<?php echo $root_admin_dir;?>/includesystem/css/menu_assets/styles.css">
<link rel="stylesheet" type="text/css" href="../../../<?php echo $root_admin_dir;?>/includesystem/css/jquery/redmond/jquery-ui-1.10.3.custom.css">	
<link rel="stylesheet" type="text/css" href="../../../<?php echo $root_admin_dir;?>/includesystem/object/FileExplorer/FileExplorer.css">
<link rel="stylesheet" type="text/css" href="../../../<?php echo $root_admin_dir;?>/includesystem/object/DBTable/DBTable.css">
<link rel="stylesheet" type="text/css" href="../../../<?php echo $root_admin_dir;?>/includesystem/object/InputSelect/InputSelect.css">

<script type="text/javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/js/common.js"></script>
<script type="text/javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/js/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/js/jquery/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/js/jquery/jquery.cookie.js"></script>
<script language="javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/js/ajax.js"></script>
<script language="javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/js/json2.js"></script>
<script language="javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/object/FileExplorer/FileExplorer.js"></script>
<script language="javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/object/ckeditor/ckeditor.js"></script>
<script language="javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/object/DBTable/DBTable.js"></script>
<script language="javascript" src="../../../<?php echo $root_admin_dir;?>/includesystem/object/InputSelect/InputSelect.js"></script>
</head>

<?php
if($incl_separate==2){
	include $incl_file;
	unset($base);
	exit();
}
?>
<body>
<?php
if(!$_SESSION['admin']){
	$login_file = "../" . $root_admin_dir . "/adminsystem/login.php";
	require_once($login_file);
	exit;
} 
?>

<div id="dialog-message" title="">
</div>
<!--end password dialog-->

<div id="tabs">
	<ul>
		<li><a href="#tabs-1" style="font-size:0.9em;">Выбор файла</a></li>
		<li><a href="#tabs-2" style="font-size:0.9em;">Редактор&nbsp;<span id="span_file_name"></span></a></li>
	</ul>
	<div id="tabs-1">
		<div style="margin:2px;">
		<script type="text/javascript">
		fileexplorer1 = new FileExplorer("fileexplorer1");
		fileexplorer1.source = "../"+getRootDirectory()+"/includesystem/object/FileExplorer/FileExplorer_req";
		fileexplorer1.font_size = "0.83em";
		fileexplorer1.onFileEdit = function(){
			$("#tabs" ).tabs({ active: 1 });
		}
		fileexplorer1.Create();
		</script>
		</div>
	</div>
	<div id="tabs-2">
		<textarea id="editor1" name="editor1"></textarea>
	</div>
</div>

<script type="text/javascript">
$(function() {
	$( "#tabs" ).tabs({
		activate: function(event, ui) {
				file_load(ui.newTab.index());
			}
	});
	$("#tabs" ).tabs({ active: 0 });
});

var editor, html = '';
function file_load(ind){
	if(parseInt(ind) == 0){
		$("#span_file_name").text("");
		html = '';
		removeEditor();
	}
	if(parseInt(ind) == 1){
		document.getElementById("editor1").style.display = "none";
		//create a new editor
		var path = fileexplorer1.getPathFile();
		var file = path.split('/').pop();
		var ext_file = "";
		if(file.indexOf(".") > 0){
			ext_file = file.split('.').pop();
		}
    var arr_ext = new Array('php','js','','css','json');
		if($.inArray(ext_file,arr_ext)!=-1){
			ext_file = "";
		}
		
		html = "";		
		var path_root = getRootDirectory();
		if(fileexplorer1.getPathFile() != ""){
			//The ajax request is sent for getting the context of the file 
			var s = "path=" + encodeURIComponent(path);
			var url = "../"+path_root+"/adminsystem/control/file_get_context?separate=1";
			new ajax_connect('POST',url,s,
				function callback_access(ss){
					html = ss;
					//fullPage
					if(html){
						var s = "path=" + encodeURIComponent(fileexplorer1.getPathFile());
						var url = "../"+path_root+"/adminsystem/control/file_full_check?separate=1";
						new ajax_connect('POST',url,s,
							function callback_access(ss){
								if(parseInt(ss) == 1){
									createEditor(ext_file,true);
								} else {
									createEditor(ext_file,false);
								}
							},
								function callback_error(ss){alert("Ajax error!"+ss);}
							);	
					} else {
						createEditor(ext_file,false);
					}
					
				},
				function callback_error(ss){alert("Ajax error!");}
			);			
			$("#span_file_name").text(fileexplorer1.getPathFile());
		} else {
			createEditor(ext_file,false);
		}
	}
}

function createEditor(ext_file,is_full) {
	if ( editor )
		return;
	// Create a new editor inside the <div id="editor">, setting its value to html
	var config = {};
	if(ext_file == ""){
		config = {
			toolbar:
			[
				{ name: 'document',    items : [ 'Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
				{ name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
				{ name: 'editing',     items : [ 'Find','Replace','-','-','SpellChecker', 'Scayt','Maximize' ] }
			],
			startupMode:'source'
		};	
	} else {
		config = {
			toolbar:
			[
				{ name: 'document',    items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
				{ name: 'clipboard',   items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
				{ name: 'editing',     items : [ 'Find','Replace','-','-','SpellChecker', 'Scayt' , 'Maximize' ] }
				,'/',
				{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
				{ name: 'paragraph',   items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
				{ name: 'links',       items : [ 'Link','Unlink','Anchor' ] },
				{ name: 'insert',      items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak' ] },
				'/',
				{ name: 'styles',      items : [ 'Styles','Format','Font','FontSize' ] },
				{ name: 'colors',      items : [ 'TextColor','BGColor' ] }
			],
			startupMode:'wysiwyg'
		};			
	}
    
	if(is_full === true){
		config.fullPage = true;
        config.height = document.documentElement.clientHeight - 150;
	} else {
		config.fullPage = false;
        config.height = document.documentElement.clientHeight - 200;
	}
	config.allowedContent = true;
    
    editor = CKEDITOR.replace('editor1',config);
	editor.setData(html);
   
	//if(html){
		CKEDITOR.plugins.registered['save'] = {
			init : function( editor ){
				var command = editor.addCommand( 'save', { modes : { wysiwyg:1, source:1 },
					exec : function( editor ) {
                        editor.commands.save.disable();
                        var text = encodeURIComponent(CKEDITOR.instances.editor1.getData());
						var s = "path=" + encodeURIComponent(fileexplorer1.getPathFile()) + "&text=" + text;
						var url = "../"+getRootDirectory()+"/adminsystem/control/save_file?separate=1";
						//ajax request
						new ajax_connect('POST',url,s,
							function callback_access(ss){
                                editor.commands.save.enable();
								switch (parseInt(ss)){
									case 1:
                                    	editor.commands.save.enable();
										break;
									case 2:
                                        alert("Внимание! Файл сохранен с ошибкой или обрезан!\r\n" + ss);
										break;
									case 3:
										alert("Ошибка! Сессия завершена!");
										break;
									case 4:
										alert("Невозможно записать файл! " + fileexplorer1.getPathFile());
										break;    
                                    case 5:
                                        alert("Ошибка! Пустой файл!");
										break;                                        
									case 6:
										alert("Невозможно записать в tmp файл! " + fileexplorer1.getPathFile());
										break;                                            
									default:
                                        editor.commands.save.enable();
							}
						},
						function callback_error(ss){editor.commands.save.enable();alert("Ajax error" + ss);});	
                    }
				});
				editor.ui.addButton( 'Save',{label : 'My Save',command : 'save'});
			}
		}
	//}
}

function removeEditor() {
	if ( !editor )
		return;
	// Retrieve the editor contents. In an Ajax application, this data would be sent to the server or used in any other way.
	// Destroy the editor.
	html = editor.getData();
	editor.destroy();
	editor = null;
}


</script>
<?php
unset($base);
?>
</body>

</html>