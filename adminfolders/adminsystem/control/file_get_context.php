<?php
if(!$_SESSION['admin']) exit;

$path = htmlspecialchars(rawurldecode($_POST['path']));
//************************
$text = "";
$file_settings = PATH . "/encoding.ini";
if (file_exists($file_settings)) {
	$arr_ini = parse_ini_file($file_settings);
	if(trim($arr_ini['Encoding'])=='windows-1251'){
		$text = is_file($path)?iconv('windows-1251','utf-8',file_get_contents($path)):"Переименуйте файл! Поддерживается только латиница!";
	} else {
		$text = is_file($path)?file_get_contents($path):"Переименуйте файл! Поддерживается только латиница!";
	}
} else {
	$text = is_file($path)?file_get_contents($path):"Переименуйте файл! Поддерживается только латиница!";
}
//**************************
echo $text;
?>