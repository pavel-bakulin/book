<?php
function include_file_real($url,$obj_param){
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

	$url_new[0]  = INFO . $url_n . ".php";
	if(!file_exists($url_new[0])){
		$url_new[0]  = INFO . $url_n . ".html";
	}
	if(!file_exists($url_new[0])){
		$url_new[0]  = INFO . $url_n . ".htm";
	}
	
  $arr_u = explode("/",$url_n);
	if($arr_u[0]!="include" && file_exists($url_new[0]) && is_file($url_new[0])){
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
	if($arr_u[0]=="include"){
		$url_new[0] = PATH . "/" . $url_n . ".php";
		if(file_exists($url_new[0]) && is_file($url_new[0])){
			$url_new[1] = 1;
			return $url_new;
		}  
	}

	return 0; 
}

function quote_smart($value){
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

function getUrl() {
  $url  = @( $_SERVER["HTTPS"] != 'on' ) ? 'http://'.$_SERVER["SERVER_NAME"] :  'https://'.$_SERVER["SERVER_NAME"];
  $url .= ( $_SERVER["SERVER_PORT"] != 80 ) ? ":".$_SERVER["SERVER_PORT"] : "";
  return $url;
}

function getPage() {
    if(!isset($_SERVER['REQUEST_URI'])){
        return $_SERVER['PHP_SELF'];
    }else{
        return $_SERVER['REQUEST_URI'];
    }
}

function page_nofirstslash($url_page){
    $arr = explode("/",$url_page);
    $s = "";
    for ($i = 0; $i < count($arr); $i++) {
        if(strcmp($arr[$i],"")!=0 && trim($arr[$i]) != "."  && trim($arr[$i]) != ".."){
            if($s == "") {
                $s = $arr[$i];
            }  else {
                $s.= "/"  . $arr[$i];
            }    
        }    
    }
    return $s;
}

?>