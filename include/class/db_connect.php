<?php
class db_connect{

private $db;

function __construct($host,$base_login,$base_passw,$base_name){
 $this->db = @mysql_connect($host,$base_login,$base_passw) or die("<p align='left'>Could not connect to server</p>");
 mysql_select_db($base_name,$this->db) or die ("<p align='left'>Не могу найти базу!<p>");
 mysql_query ("SET CHARACTER SET 'utf8'");
 mysql_query ("set character_set_client='utf8'",$this->db); 
 mysql_query ("set character_set_results='utf8'",$this->db);
 mysql_query ("set collation_connection='utf8_general_ci'");
}

public function select_sql($sql){
$result = @mysql_query($sql,$this->db) or die("do't work query ".$sql);
$res = array();
 while ($row = mysql_fetch_object($result)) {
  $res[] = $row;   
 }
mysql_free_result($result);
return $res;   
}

public function insupd_sql($sql){
 @mysql_query($sql,$this->db) or die("do't work query ".$sql);
}

public function lastInsertId() {
  $result = $this->select_sql( 'SELECT LAST_INSERT_ID() as last');
  return $result[0]->last;
}

function __destruct(){
 if($this->db) mysql_close($this->db);
}


}

?>