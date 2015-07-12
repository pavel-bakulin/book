<?php
header("Content-Type: text/plain; charset=utf-8");

$id = htmlspecialchars($_POST['id'],ENT_QUOTES);

$sql = "SELECT a.department_id,a.name,a.full_name,a.short_name, (SELECT id FROM department b WHERE b.department_depend_id=a.department_id LIMIT 0,1) AS node
FROM department a WHERE department_depend_id=" . (int)$_POST["depend_id"];
$res = $base->select_sql($sql);

if(!$res){
	echo "no_record";
	exit;
}

echo "<ul class='treeView_ul'>";
foreach($res as $key=>$val){
	$name = trim($val->short_name)==""?$val->name:$val->short_name;
	if($val->node){
		echo "<li id='" . $id . "_li_node_" . $val->department_id . "'>
			  <div class='treeView_li_div' id='" . $id . "_div_node_" . $val->department_id . "' onclick='return DBTreeView_param.on_click(this,1);'><img id='" . $id . "_img_node_" . $val->department_id . "' align='left' class='treeView_li_img' src='../../../include/images/add.jpg'>" . $name . "</div><input id='" . $id . "_input_node_" . $val->department_id . "' type='hidden' value='0'></li>";
	} else {
		echo "<li id='" . $id . "_li_node_" . $val->department_id . "'>
			  <div class='treeView_li_div' id='" . $id . "_div_node_" . $val->department_id . "' onclick='return DBTreeView_param.on_click(this,0);'";
		echo " onMouseMove='return DBTreeView_param.mouse_move(this);' onMouseOut='return DBTreeView_param.mouse_out(this);'>";
		echo $name . "</div>";
		echo " <input id='" . $id . "_input_param_" . $val->department_id . "' type='hidden' value='" . $val->full_name . "'>";
		echo "</li>";
	}
}
echo "</ul>";

?>