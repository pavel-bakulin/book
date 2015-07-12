<?php
if(!$_SESSION['admin']) exit;
header("Content-Type: text/plain; charset=utf-8");

if(isset($_POST['file_name']) && isset($_POST['path']) && !isset($_POST['file_name_new'])){
	require_once("FileExplorer_createfile.php");
	exit();
}

if(isset($_POST['file_name']) && isset($_POST['path']) && isset($_POST['file_name_new'])){
	require_once("FileExplorer_renamefile.php");
	exit();
}

if(isset($_POST['file_name']) && (int)$_POST['file_delete'] == 1){
	require_once("FileExplorer_deletefile.php");
	exit();
}

if(isset($_POST['file_name']) && isset($_POST['chmod'])){
	require_once("FileExplorer_chmodfile.php");
	exit();
}

if(isset($_POST['folder_name']) && isset($_POST['path']) && !isset($_POST['folder_name_new'])){
	require_once("FileExplorer_createfolder.php");
	exit();
}

if(isset($_POST['folder_name']) && isset($_POST['path']) && isset($_POST['folder_name_new'])){
	require_once("FileExplorer_renamefolder.php");
	exit();
}

if(isset($_POST['folder_name']) && (int)$_POST['folder_delete'] == 1){
	require_once("FileExplorer_deletefolder.php");
	exit();
}

if(!isset($_POST['id'])){
	exit;
}

$id = htmlspecialchars($_POST['id'],ENT_QUOTES);
if(isset($_POST['parent_id'])){
	$parent_id = htmlspecialchars($_POST['parent_id'],ENT_QUOTES);
} else {
	$parent_id = "";
}

function subfolders_check($dir){
//check the folder contains subfolders
	$deep = scandir($dir,0);
	if($deep){
		foreach($deep as $value_deep){
			if($value_deep === '.' || $value_deep === '..' || $value_deep === ".svn") {
				continue;
			}
			if(is_dir($dir . "/" . $value_deep)){
				return 1;
			}
		}
	}
	return 0;
}

function find_all_files($dir,$is_file = 0){
	//sleep(0.2);
	global $id,$parent_id;
	$folder_string_tree = "";
	$file_string_tree = "";
	
	if($dir=="../") $dir = "..";
	
    $root = scandir($dir,0);
	$path = $dir;
	$id_str = "";
	if($root){
		$i   = 0;
		$i_f = 0;
		foreach($root as $value){
			if($value === '.' || $value === '..' || $value === ".svn" || $value === $_SESSION['root_admin_dir']) {
				continue;
			}
			if(is_dir($dir."/".$value)) {
				$li_id	 = (string)$is_file . $parent_id . (string)$i . "_".$id."_FileExplorer_li_node";
				$li_img1 = (string)$is_file . $parent_id . (string)$i . "_".$id."_FileExplorer_li_img1";
				$li_img2 = (string)$is_file . $parent_id . (string)$i . "_".$id."_FileExplorer_li_img2";
				$li_inp1 = (string)$is_file . $parent_id . (string)$i . "_".$id."_FileExplorer_li_inp1";
				$li_inp2 = (string)$is_file . $parent_id . (string)$i . "_".$id."_FileExplorer_li_inp2";
				$li_td	 = (string)$is_file . $parent_id . (string)$i . "_".$id."_FileExplorer_li_td";
				$folder_string_tree.= "<li class='FileExplorer_ul_li' id='" . $li_id . "'>";
				$folder_string_tree.= "<table border=0 cellpadding=1 cellspacing=0><tr>";
				if($is_file == 0){
					$folder_string_tree.= "<td valign='middle' class='FileExplorer_ul_li_td1'>";
					if(subfolders_check($dir."/".$value) == 1){
						$folder_string_tree.= "<img class='FileExplorer_ul_li_img1' id='".$li_img1."' onclick='return FileExplorer_param.folder_on_click_open(\"".$li_id."\",\"".$id."\",\"".$dir."/".$value."\");' src='../../../" . $_SESSION['root_admin_dir'] . "/includesystem/images/plus.jpg'>";
						$folder_string_tree.= "<input id='".$li_inp1."' type='hidden' value='0'>";
					}
					$folder_string_tree.= "<input id='".$li_inp2."' type='hidden' value='".$dir."/".$value."'>";
					$folder_string_tree.= "</td>";
				}	
				//Permissions of a folder is determined
				$permiss = substr(sprintf('%o', fileperms($dir."/".$value)), -4);
				$folder_string_tree.= "<td class='FileExplorer_ul_li_td2' onclick='return FileExplorer_param.folder_on_click(\"".$li_td."\",\"".$id."\",\"".$dir."/".$value."\",\"".$permiss."\",".$is_file.");'>";
				$folder_string_tree.= "<img id='".$li_img2."' src='../../../" . $_SESSION['root_admin_dir'] . "/includesystem/images/close_folder.jpg'>";
				$folder_string_tree.= "</td><td id='".$li_td."' onclick='return FileExplorer_param.folder_on_click(\"".$li_td."\",\"".$id."\",\"".$dir."/".$value."\",\"".$permiss."\",".$is_file.");' valign='middle' class='FileExplorer_ul_li_td3'><a href='javascript:void(0);'>".$value."</a></td></tr></table>";
				$folder_string_tree.= "</li>";
				$i++;
			}
			//files list
			if(is_file($dir."/".$value) && $is_file == 1) {
				$li_file_id = (string)$i_f . "_".$id."_FileExplorer_li_td_file";
				$file_string_tree.= "<li class='FileExplorer_ul_li'>";
				$file_string_tree.= "<table border=0 cellpadding=1 cellspacing=0><tr>";
				//Permissions of a file is determined
				$permiss = substr(sprintf('%o', fileperms($dir."/".$value)), -4);
				$file_string_tree.= "<td id='" . $li_file_id . "' valign='middle' onclick='return FileExplorer_param.file_on_click(\"".$li_file_id."\",\"".$id."\",\"".$dir."/".$value."\",\"".$permiss."\");' class='FileExplorer_ul_li_td3'>".$value."</td></tr></table>";
				$file_string_tree.= "</li>";
				$i_f++;
			}

		}
	}
	echo "<ul class='FileExplorer_ul'>";
	if($folder_string_tree != "") echo $folder_string_tree;
	if($file_string_tree != "") echo $file_string_tree;
	echo "</ul>";
}	
	
if(isset($_POST['dir']) && trim($_POST['dir']) != ""){
	if((int)$_POST['is_file'] == 1){
		find_all_files(rawurldecode(htmlspecialchars($_POST['dir'],ENT_QUOTES)),1);
	} else {
		find_all_files(rawurldecode(htmlspecialchars($_POST['dir'],ENT_QUOTES)),0);
	}
} else {
	find_all_files("../");
}
?>