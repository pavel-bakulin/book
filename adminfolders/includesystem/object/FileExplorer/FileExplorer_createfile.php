<?php
if(!$_SESSION['admin']) exit;

$file_name = rawurldecode(htmlspecialchars($_POST['file_name'],ENT_QUOTES));
$path = rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES));
$path_ftp = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES)));

if(is_dir($path)){
	if(file_exists($path . "/" . $file_name)){
		echo "2";
		exit;
	} else {
		if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
			$f = @fopen($path . "/" . $file_name,"w");
		} else {	
			$f = @fopen("ftp://$ftp_login:$ftp_passw@$ftp_host/$path_ftp/$file_name", "w");
		}	
		if(!$f){
			fclose($f);
			echo "3";
			exit;
		} 
		echo "1";
		fclose($f);
		exit;
	}
} else {
	echo "3";
}
?>