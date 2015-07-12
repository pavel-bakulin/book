<?php
if(!$_SESSION['admin']) exit;

$file_name = rawurldecode(htmlspecialchars($_POST['file_name'],ENT_QUOTES));
$file_name_ftp = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['file_name'],ENT_QUOTES)));

if(file_exists($file_name)){
	if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
		unlink($file_name);
	} else {
		$conn_id = ftp_connect($ftp_host);
		$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
		@ftp_delete($conn_id, $file_name_ftp);
		ftp_close($conn_id);
	}	
	
	if(!file_exists($file_name)){
		echo "1";
	} else {
		@unlink($file_name);
		if(!file_exists($file_name)){
			echo "1";
		} else {
			echo "2";
		}	
	}

} else {
	echo "2";
}
?>