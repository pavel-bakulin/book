<?php
if(!$_SESSION['admin']) exit;

$folder_name = rawurldecode(htmlspecialchars($_POST['folder_name'],ENT_QUOTES));
$folder_name_ftp = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['folder_name'],ENT_QUOTES)));

if(file_exists($folder_name)){
	$dir_name = substr($folder_name,0,strrpos($folder_name,"/"));
	if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
		@rmdir($folder_name);
	} else {
		$conn_id = ftp_connect($ftp_host);
		$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
		@ftp_rmdir($conn_id, $folder_name_ftp);
		ftp_close($conn_id);
	}

	if(!file_exists($folder_name)){
		echo "1";
	} else {
		@rmdir($folder_name);
		if(!file_exists($folder_name)){
			echo "1";
		} else {	
			echo "2";
		}	
	}
	exit;
} else {
	echo "2";
}
?>