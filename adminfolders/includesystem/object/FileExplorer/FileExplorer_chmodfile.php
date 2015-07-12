<?php
if(!$_SESSION['admin']) exit;

$file_name = ftp_path_correct(rawurldecode(htmlspecialchars($_POST['file_name'],ENT_QUOTES)));
//echo $file_name;
//exit;

$file_chmod = htmlspecialchars($_POST['chmod'],ENT_QUOTES);

if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
	echo "1";
	exit;
}

$conn_id = ftp_connect($ftp_host);
$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
$mode = octdec('0' . (int)$file_chmod); 
if (ftp_chmod($conn_id, $mode, $file_name) !== false) {
	echo "1";
} else {
	if (chmod($file_name,$mode) !== false) {
		echo "1";
	} else {
		echo "2";
	}	
}
ftp_close($conn_id);


/*
function chmod_R($path, $filemode) {
    if (!is_dir($path))
        return chmod($path, $filemode);

    $dh = opendir($path);
    while (($file = readdir($dh)) !== false) {
        if($file != '.' && $file != '..') {
            $fullpath = $path.'/'.$file;
            if(is_link($fullpath))
                return FALSE;
            elseif(!is_dir($fullpath))
                if (!chmod($fullpath, $filemode))
                    return FALSE;
            elseif(!chmod_R($fullpath, $filemode))
                return FALSE;
        }
    }

    closedir($dh);

    if(chmod($path, $filemode))
        return TRUE;
    else
        return FALSE;
} */
?>