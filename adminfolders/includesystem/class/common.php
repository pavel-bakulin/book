<?php
function include_file_real($url){
	$url_new = array();
	$url_n = "";
 
	if(!$url){
		$url_new[0] = -1;
		$url_new[1] = -1;
		return $url_new;
	}

	$arr = explode("/",$url);
 
	foreach($arr as $val){
		if(trim($val)){
			if($url_n==''){
				$url_n = $val;
			} else { 
				$url_n.= "/" . $val;
			}
		}
	}

	$arr_u = explode("/",$url_n);
  
	//separate window
	$url_new[0] = PATH . "/" . $url_n . ".php";
	if($arr_u[0]!="includesystem" && file_exists($url_new[0]) && is_file($url_new[0])){
		switch ((int)$_REQUEST["separate"]) {
			case 1:
				$url_new[1] = 1;
				break;
			case 2:
				$url_new[1] = 2;
				break;
			default:
				$url_new[1] = 0;
		}		
       return $url_new;
	}
	//ajax query
	if($arr_u[0]=="includesystem"){
		$url_new[0] = PATH . "/" . $url_n . ".php";
		if(file_exists($url_new[0]) && is_file($url_new[0])){
			$url_new[1] = 1;
			return $url_new;
		}  
	}

	return 0; 
}

function quote_smart($value)
{
    // если magic_quotes_gpc включена - используем stripslashes
    if (get_magic_quotes_gpc()) {
        $value = htmlspecialchars(stripslashes($value),ENT_QUOTES);
    }
    // Если переменная - число, то экранировать её не нужно
    // если нет - то окружем её кавычками, и экранируем
    if (!is_numeric($value)) {
        $value = "'" . mysql_real_escape_string($value) . "'";
    }
    return $value;
}

class FtpFileChmod{
	private $conn;
	
	function __construct($host,$login,$passw) {
		//connect to ftp
		$this->conn = ftp_connect($host);
		ftp_login($this->conn,$login,$passw);
	}
	
	public function file_chmod($file,$mode){
		$m = octdec('0' . (int)$mode);
		return ftp_chmod($this->conn, $m, $file);
	}
	
	function __destruct(){
		ftp_close($this->conn);
	}
}	

//add ftp_path_folder
function path_correct($path){
	$url_n = '';
	if(trim($path) != ''){
		$arr = explode("/",$path );
		foreach($arr as $val){
			if(trim($val)!='' && trim($val) != '.' && trim($val) != ".."){
				if($url_n==''){
					$url_n = $val;
				} else { 
					$url_n.= "/" . $val;
				}
			}
		}
        return $url_n;
	} else {
		return $path;
	}
}	

//add ftp_path_folder
function ftp_path_correct($path){
    //ftp_path_folder is set up in the ftp_connect.php
	global $ftp_path_folder;
	$url_n = '';
	if(trim($ftp_path_folder) != ''){
		$arr = explode("/",$path );
		foreach($arr as $val){
			if(trim($val)!='' && trim($val) != '.' && trim($val) != ".."){
				if($url_n==''){
					$url_n = $val;
				} else { 
					$url_n.= "/" . $val;
				}
			}
		}
		if($url_n == ''){
			return $ftp_path_folder;
		} else {
			return $ftp_path_folder . "/" . $url_n;
		}
	} else {
		return $path;
	}
}	

//this finction delete all files in a directory
function full_del_dir($directory){
	if (file_exists($directory)){
		$dir = opendir($directory);
		while (($file = readdir($dir))){
			if(is_file($directory."/".$file)) unlink($directory."/".$file);
				else 
			if (is_dir($directory."/".$file)&&$file!="."&&$file!=".."){
				full_del_dir($directory."/".$file);  
			}
		}
		closedir($dir); 
		rmdir($directory); 
	}
}

//
function strint_check($str){
    $arr = explode(",",$str);
    $arr_new = array();
    foreach ($arr as $value){
        $arr_new[] = (int)$value ;
    }
    return implode(",", $arr_new);
}
?>