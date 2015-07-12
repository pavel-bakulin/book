<?php
if(!$_SESSION['admin']) exit;

if(isset($_POST["path"])){
	if($_FILES["filename"]["name"]){
		$f_load = "";
		$f_load = $_FILES["filename"]["name"];
		$size_f = $_FILES["filename"]["size"];
		$path_parts = pathinfo($f_load);
		$f_name = $path_parts["basename"];
		$ext = strtolower($path_parts["extension"]);
		$exten=array("pdf","htm","html","doc","xls","docx","xlsx","gif","jpg","bmp","png","ppt","pps","php","js","css","csv","conf","tif","png","mp3");

		if(!in_array($ext,$exten)){?>
			<script language="javascript">
				alert('Загрузка файлов с таким расширением запрещена!');
				location.replace("<?php echo $_SERVER['REQUEST_URI']?>");
			</script>
		<?php 
			exit();
		}
		if($f_load!=""){
			if(($size_f>1024*5*1024)||($size_f==0)){
		?>
			<script language="javascript">
				alert("Размер загружаемого файла превышает 5 Мб!");
				location.replace("<?php echo $_SERVER['REQUEST_URI']?>");
			</script>
		<?php
		}
 
		$fil_nam = htmlspecialchars($_POST['path'],ENT_QUOTES);
		$fil_nam_ftp = ftp_path_correct(htmlspecialchars($_POST['path'],ENT_QUOTES));

		if(!is_writable($fil_nam)){
			$permiss_first = substr(sprintf('%o', fileperms($fil_nam)), -4);
			$ftp_object = new FtpFileChmod($ftp_host,$ftp_login, $ftp_passw);
			$ftp_object->file_chmod($fil_nam_ftp,'0777');	
		
		}
		
		$file_full_name = $fil_nam . '/' . $f_name;
		if(!file_exists($file_full_name)){
			move_uploaded_file($_FILES["filename"]["tmp_name"],$file_full_name);
		}
		
		if($ftp_object) {
			$ftp_object->file_chmod($fil_nam_ftp,$permiss_first);
			unset($ftp_object);
		}			
		
	}
}

echo "<script language='javascript'>
id = '". htmlspecialchars($_GET['id'],ENT_QUOTES)."';
ob = parent.document.getElementById('div_folder_' + id);
ob1 = ob.Param;
ob1.RefreshFileDistrict();
div = parent.document.getElementById('div_menufile_fileexplorer_' + id);
parent.document.getElementById('span_downloadfile_fileexplorer_' + id).removeChild(div);
</script>";
exit;
}

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
<title></title>
<META HTTP-EQUIV="Content-Type" content="text/html;charset=utf-8">
<link rel="stylesheet" type="text/css" href="FileExplorer.css">
</head>

<body style="padding:0;margin:0;" style="background-color:#efefef;">
<script type="text/javascript">
function window_submit(){
	document.getElementById("form1").submit();
}

function window_close(){
	var id = "<?php echo htmlspecialchars($_GET['id'],ENT_QUOTES);?>";
	var div = parent.document.getElementById("div_menufile_fileexplorer_" + id);
	parent.document.getElementById("span_downloadfile_fileexplorer_" + id).removeChild(div);
}
</script>

<form id="form1" action="<?php echo $_SERVER['REQUEST_URI'];?>" method="post" enctype="multipart/form-data" AUTOCOMPLETE=OFF>
<input name="path" type="hidden" value="<?php echo htmlspecialchars($_GET['path'],ENT_QUOTES);?>">
<input size="23" name="filename" type="file">
<br><br><br>
<div style='text-align:center;width:250px;' class="div_menu_file_fileexplorer_load_file">
<input onclick="return window_submit();" style='width:70px' id='div_menufile_fileexplorer_button_ok' type='button' value='ОК'>
<input onclick="return window_close();" id='div_menufile_fileexplorer_button_cancel' style='width:70px' type='button' value='Отмена'></div>
</form>
</body>
</html>