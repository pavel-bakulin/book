<?php
if(!$_SESSION['admin']) exit;

$folder_name = rawurldecode(htmlspecialchars($_POST['folder_name'],ENT_QUOTES));
$folder_name_new = rawurldecode(htmlspecialchars($_POST['folder_name_new'],ENT_QUOTES));
$path = rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES));
$path_ftp = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES)));

if(is_dir($path)){
	if(file_exists($path . "/" . $folder_name)){
		if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
			if(@rename($path . "/" . $folder_name,$path . "/" . $folder_name_new)){
				echo 1;
			} else {
				echo 2;
			}
		} else {
			$conn_id = ftp_connect($ftp_host);
			$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
			if (@ftp_rename($conn_id, $path_ftp . "/" . $folder_name, $path_ftp . "/" . $folder_name_new)) {
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