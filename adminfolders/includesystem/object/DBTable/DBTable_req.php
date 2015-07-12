<?php
header("Content-Type: text/plain; charset=utf-8");

$id = htmlspecialchars($_POST['id'],ENT_QUOTES);
if(trim($_POST['search_text'])!=""){
	$search_text = strtoupper($_POST['search_text']);
}
if(trim($_POST['field_for_search'])!=""){
	$field_for_search = $_POST['field_for_search'];
}

require_once(PATH . "/" . str_replace("../","",$_POST["sql_file"]));

$color_caption = "";
if(isset($_POST['color_caption']) && trim($_POST['color_caption'])!=""){
	$color_caption = $_POST['color_caption'];
} else {
	$color_caption = "#F6A7A2;";
}


$color_caption_select = "";
if(isset($_POST['color_caption_select']) && trim($_POST['color_caption_select'])!=""){
	$color_caption_select = htmlspecialchars($_POST['color_caption_select'],ENT_QUOTES);
} else {
	$color_caption_select = "#F6A7A2;";
}

$sql_limit = (int)$_POST['sql_limit'];
$table_layout  = (int)$_POST['table_layout'];

$sql_start = (int)$_POST['sql_start'];
$sort_field = htmlspecialchars($_POST['sort_field'],ENT_QUOTES);



if((int)$_POST['sort_direction']==1){
	$sort_direction = "DESC";
} else {
	$sort_direction = "ASC";
}

$fixed_row = (int)$_POST['fixed_row'];

if($sql_start==0){
	$sql_start = 1;
}
$sql_start = $sql_start * $sql_limit - $sql_limit;

if($sort_field){
	$sql = substr($sql,0,strripos($sql,"ORDER BY"));
	if($sort_direction){
		$sql = $sql . " ORDER BY " . $sort_field . " " . $sort_direction;
	}
}

if($sql_limit){
	$pos = stripos($sql,"SELECT");
	$s1  = substr($sql,0,$pos);
	$s2  = substr($sql,$pos+6,strlen($sql)-1);
	$sql = $s1 . "SELECT SQL_CALC_FOUND_ROWS" . $s2;
	$sql = $sql . " LIMIT " . $sql_start . "," . $sql_limit;
}

$column = json_decode(stripslashes(trim($_POST['column'])));

function formatter_function($obj,$text){
	$arr_prop = get_object_vars($obj);
	$s = $text;
	foreach ($arr_prop as $key => $val){
		$k_s = "{" . $key . "}";
		$s = str_replace($k_s,$val,$s);
	}
	return $s;
}

//***********************************
$res = $base->select_sql($sql);
//echo $sql;

if($sql_limit){
	$sql_countrecord = "SELECT FOUND_ROWS() as col";
	$res_limit = $base->select_sql($sql_countrecord); 
	echo "<input id='" . $id . "_all_record' type='hidden' value='" . $res_limit[0]->col . "'>";
}

//дорисовываем таблицу д\пустыми строками
if($fixed_row){
	$ii = $sql_limit - count($res);
	if(count($res)<$sql_limit){
		$ob = new StdClass();
		for($i=0;$i<$ii;$i++){
			foreach($column as $key=>$val){
				$ob->$key = "&nbsp;";
			}  
			$res[] = $ob;
		}
	}
}

echo "<table id='". $id . "' cellpadding='0' cellspacing='0' border='0' class='tableborder' style='";

if((int)$table_layout>0){
	echo "table-layout:fixed;";
}
if(isset($_POST['line_height']) && trim($_POST['line_height'])!=""){
	echo "line-height:" . htmlspecialchars($_POST['line_height'],ENT_QUOTES) . ";";
}
if(isset($_POST['font_size']) && trim($_POST['font_size'])!=""){
	echo "font-size:" . htmlspecialchars($_POST['font_size'],ENT_QUOTES) . ";";
}

echo "'>";
 

$j = 0;

$arr_p = array_keys(get_object_vars($column));

foreach($res as $key_field=>$field){
	echo "<tr id='" . $id . "_tr" . $j . "' style='cursor:default;background-color:#ffffff;' onclick='return DBTable_param.on_click(this);' onMouseMove='return DBTable_param.mouse_move(this);' onMouseOut='return DBTable_param.mouse_out(this);'>";
	$i = 0;
	foreach($field as $key=>$val){
		if(in_array($key,$arr_p)){
			$property = $column->$key;
	
			if($j==0){
				foreach($field as $key_c=>$val_c){
					if(in_array($key_c,$arr_p)){
						$property_c = $column->$key_c;
						echo "<td onclick='return DBTable_param.sort_field(\"".$id."\",\"".$key_c."\",this);' style='background-color:";
						if($sort_field==$key_c){
							echo $color_caption_select;
						} else {
							echo $color_caption;
						}
						echo "' id='" . $id . "_tr" . $j . "_td" . $i . "' ";
						echo "class='class_" . $id . "_" . $key_c . "'";
						echo ">" . $property_c->caption . "</td>";
						$i++;
					}		
				}
				$j++;
				$i = 0;	 
				echo "</tr><tr id='" . $id . "_tr" . $j . "' style='cursor:default;background-color:#ffffff;";
				echo "' onclick='return DBTable_param.on_click(this);' onMouseMove='return DBTable_param.mouse_move(this);' onMouseOut='return DBTable_param.mouse_out(this);'>";
			}
			//************************************
			echo "<td id='" . $id . "_tr" . $j . "_td" . $i . "' ";
			if(trim($property->title)){
				$s_title = $property->title;
				echo "title='" . $field->$s_title  . "'";
			}
			/*if((int)$property_c->width>0){
				echo "width:".(int)$property->width."px;";
			}*/
			echo " style='";
			echo "' ";
			echo "class='class_" . $id . "_" . $key . "'";
			echo ">";
	 
			if(trim(str_replace("&nbsp;"," ",$val))!=""){
				if($property->formatter){
					echo formatter_function($field,$property->formatter->begin);
				}
      
				if((int)$property->blankdel>0){
					$val = str_replace("&nbsp;"," ",$val);
				}
				if((int)$property->cut_text>0){
					$val = substr($val,0,$property->cut_text);
				}
      			//echo iconv("WINDOWS-1251","UTF-8",$val);
                echo $val;
     
				if($property->formatter){
					echo $property->formatter->end;
				}	 
			} else {
				echo "&nbsp;";
			}	 
			echo "</td>";
		//************************************* 
			$i++;
		}	
	}
	echo "</tr>";
	$j++;
}
// echo $sql;
echo "</table>"; 
?>
