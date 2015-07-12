<?php
if(!$_SESSION['admin']){
	echo "3";
	exit;
}

$path = htmlspecialchars(rawurldecode($_POST['path']));

// Usage across all PHP versions
if (get_magic_quotes_gpc()) {
    $text = stripslashes(rawurldecode($_POST['text']));
}
else {
    $text = rawurldecode($_POST['text']);
}

$file_settings = PATH . "/encoding.ini";
if (file_exists($file_settings)) {
	$arr_ini = parse_ini_file($file_settings);
	if(trim($arr_ini['Encoding'])=='windows-1251'){
		$text = iconv('utf-8','windows-1251',$text);
	}	
}

function path_tmp(){
	return "../tmpfiles_storage";
}

function tmp_path_create($path){
	global $ftp_host,$ftp_login,$ftp_passw;
	
    $path_tmp = path_tmp();
    
    $arr = explode("/",$path);
    $path_array = array_slice($arr,1,-1);
    $file_name = end($arr);
    
	if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        if(file_exists($path_tmp) === false){
            @mkdir($path_tmp);
        }
        foreach ($path_array as $path_value) {
            if($path_value != "." && $path_value != ".."){
                $path_tmp = $path_tmp . "/" . $path_value;
                if(file_exists($path_tmp) === false){
                    @mkdir($path_tmp);
                }
            }    
        }          
	} else {
		$conn_id = ftp_connect($ftp_host);
		$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
        if(file_exists($path_tmp) === false){
            ftp_mkdir($conn_id, ftp_path_correct($path_tmp));
        }        
        foreach ($path_array as $path_value) {
            if($path_value != "." && $path_value != ".."){
                $path_tmp = $path_tmp . "/" . $path_value;
                if(file_exists($path_tmp) === false){
                    @ftp_mkdir($conn_id, ftp_path_correct($path_tmp));
                }
            }    
        }        
		ftp_close($conn_id);
    }   
    return $path_tmp . "/" . $file_name;
}

if($text){
    //tmp is saved
    $arr = explode("/",path_correct($path));
    if($arr[0] !== path_correct($_SESSION['root_admin_dir']) && $arr[0] !== path_correct(path_tmp())){
		$path_parts = pathinfo(tmp_path_create($path));
        $path_tmp_ver = $path_parts['dirname'] . "/" . $path_parts['filename'];
		$ext = $path_parts['extension'];
        $path_tmp     = $path_tmp_ver . "_version1." . $ext;
        //********************************
        if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            //rename last 5 versions
            for($i = 4; $i > 0; $i--){
                $path_tmp_ver_i = $path_tmp_ver . "_version" . $i . "." . $ext;
                if(file_exists($path_tmp_ver_i)){
                    @rename($path_tmp_ver_i,$path_tmp_ver . "_version" . ($i + 1) . "." . $ext);
                }
            }
            $handle = @fopen($path_tmp,"w");
        } else {
        //linux
            $conn_id = ftp_connect($ftp_host);
            $login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
            //rename last 5 versions
            for($i = 4; $i > 0; $i--){
                $path_tmp_ver_i = $path_tmp_ver . "_version" . $i . "." . $ext;
                if(file_exists($path_tmp_ver_i)){
                    @ftp_rename($conn_id,ftp_path_correct($path_tmp_ver_i),ftp_path_correct($path_tmp_ver . "_version" . ($i + 1) . "." . $ext));
                }
            }
            //***********************
			if(file_exists($path_tmp)){
				if (!ftp_delete($conn_id, ftp_path_correct($path_tmp))) {
					echo "Не удалось удалить " . ftp_path_correct($path_tmp);
					ftp_close($conn_id);
					exit;
				}
			}	
            ftp_close($conn_id);		
            $handle = @fopen("ftp://$ftp_login:$ftp_passw@$ftp_host/" . ftp_path_correct($path_tmp), "w");
        }
        if (fwrite($handle, $text) === FALSE) {
            echo "<b>ERROR! The tmp files is not created</b>";
            fclose($handle);
            exit;
        }
        fwrite($handle, $text);
        fclose($handle);
    }
//*****************************    

    //basic file is saved
	if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
		$handle = @fopen($path,"w");
	} else {
		$conn_id = ftp_connect($ftp_host);
		$login_result = ftp_login($conn_id, $ftp_login, $ftp_passw);
		if (!ftp_delete($conn_id, ftp_path_correct($path))) {
			echo "Не удалось удалить " . ftp_path_correct($path);
			ftp_close($conn_id);
			exit;
		}
		ftp_close($conn_id);		
		$handle = @fopen("ftp://$ftp_login:$ftp_passw@$ftp_host/" . ftp_path_correct($path), "w");
	}
	if (fwrite($handle, $text) === FALSE) {
		echo "4";
       	fclose($handle);
        exit;
	}
    fclose($handle);
   
    usleep(500000);
    $arr_ini = parse_ini_file($file_settings);
    if(is_file($path)){
        if(strcmp($text,file_get_contents($path)) === 0){
            echo "1";
        } else {
            echo "2";
        }
    } else {
        echo "Переименуйте файл! Поддерживается только латиница!";
    }
} else {
	echo "5";
}
?>