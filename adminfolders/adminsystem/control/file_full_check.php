<?php
if(!$_SESSION['admin']) exit;

$path = htmlspecialchars(rawurldecode($_POST['path']));
//The page has or hasn't the tag body,html
$is_full = 0;
if(is_file($path)){
	$cont = file_get_contents($path);
	$cont = str_replace("\r\n", " ", $cont);
	$cont = str_replace("\n", " ", $cont);
	
	if(preg_match_all('{<html[^>]*>(.*?)</html>}',$cont,$matches) > 0){
		$is_full = 1;
	} else {
		if(preg_match_all('{<body[^>]*>(.*?)</body>}',$cont,$matches) > 0){
			$is_full = 1;
		}
	}
}
echo $is_full;
?>