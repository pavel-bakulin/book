<?php
Error_Reporting(E_ALL & ~E_NOTICE);
session_start();

if((int)$_COOKIE["user_id"] > 0){
  $_SESSION['user_id'] = (int)$_COOKIE["user_id"];  
}

if((int)$_SESSION["user_id"] > 0){
  $result = new stdClass();
  $sql = "SELECT * FROM users WHERE id = " . $_SESSION['user_id'] . " LIMIT 0,1";
  $res = $base->select_sql($sql);
  setcookie("user_id", $_SESSION["user_id"], time()+60*60*24*60, '/');//the cookie save during  2 months
  $result->is_user = '1';
  $result->soc_system = $res[0]->soc_system;
  $result->soc_user_id = $res[0]->soc_user_id;
  $result->name = $res[0]->name;
  $result->birthday = $res[0]->birthday;
  $result->email = $res[0]->email;
  $result->link = $res[0]->link;
  $result->img_src = $res[0]->img_src;
  echo json_encode($result);  
} else {
  $result = new stdClass();
  $result->is_user = '0';
  $result->soc_system = "fb";
  $result->soc_user_id = "1";
  $result->name = "pavel";
  $result->birthday = "04.06.1977";
  $result->email = "p.bakulin@mail.ru";
  $result->link = "https://www.facebook.com/app_scoped_user_id/654635457983703";
  $result->img_src ="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c8.0.50.50/p50x50/10371929_603018856478697_3840939985752916410_n.jpg?oh=468ad52b357e4436927c875d0e20964a&amp;oe=56245DF8&amp;__gda__=1444460504_9f2bc154d6a7c58384011c3244898bda";
  //here insert information into base
  $_SESSION['user_id'] =  "11";//get user_id after insert;
  setcookie("user_id", $_SESSION["user_id"], time()+60*60*24*60, '/');
  echo json_encode($result);
}


?>