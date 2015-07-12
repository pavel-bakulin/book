<?php
if(!$_SESSION['admin']) exit;

$file_name = rawurldecode(htmlspecialchars($_POST['file_name'],ENT_QUOTES));
$file_name_new = rawurldecode(htmlspecialchars($_POST['file_name_new'],ENT_QUOTES));
$path = rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES));
$path_ftp = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES)));
//echo $path;
//exit;

if(is_dir($path)){
	if(file_exists($path . "/" . $file_name)){
		if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
			if(@rename($path . "/" . $file_name,$path . "/" . $file_name_new)){
				echo 1;
			} else {
				echo 2;
			}
			exit;
		} else {
			$conn_id = ftp_connect($ftp_host);
			$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
			if (@ftp_rename($conn_id, $path_ftp . "/" . $file_name, $path_ftp . "/" . $file_name_new)) {
				echo 1;
			} else {
				echo 2;
			}
			ftp_close($conn_id);
			exit;
		}	
	} else {
		echo 2;
		exit;
	}
} else {
	echo "3";
}
?>