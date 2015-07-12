<?php
//проверка авторизации
$auf = "";

if ($_POST['login'] && !$_SESSION['admin']) {
	$login = trim($_POST['login']);
	$passw = trim($_POST['passw']);

	$sql = "SELECT u.* FROM admin_site u WHERE u.login=" . quote_smart($login) . " AND u.passw=" . quote_smart(md5($passw));
	$res = $base->select_sql($sql);

	if(count($res) > 0){
		$_SESSION['admin'] = (int)$res[0]->id;
		$auf = "1";
	}
}

echo $auf;
?>