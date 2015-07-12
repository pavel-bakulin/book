<?php
if(!$_SESSION['admin']) exit;
//sleep(3);
$folder_name = rawurldecode(htmlspecialchars($_POST['folder_name'],ENT_QUOTES));
$path = rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES));
$path_ftp = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['path'],ENT_QUOTES)));

if(is_dir($path)){
	if(file_exists($path . "/" . $folder_name)){
		echo "2";
		exit;
	} else {
		if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
			if(mkdir($path . "/" . $folder_name,0755)){
				echo 1;
			} else {
				echo 2;
			}
			exit;
		}
	
		$conn_id = ftp_connect($ftp_host);
		$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
		if (@ftp_mkdir($conn_id, $path_ftp . "/" . $folder_name)) {
			echo "1";
		} else {
			echo "2";
		}
		ftp_close($conn_id);		
	}
} else {
	echo "3";
}
?>