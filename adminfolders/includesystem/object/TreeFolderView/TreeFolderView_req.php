<?php
header("Content-Type: text/plain; charset=utf-8");

$id = htmlspecialchars($_POST['id'],ENT_QUOTES);

$deep = 0;
$i_id = 0;

function find_all_files($dir){ 
	global $deep,$id,$i_id;
    $root = scandir($dir,0);
	$path = $dir;
	$id_str = "";
		
	if($root){
		$id_str =  $id . "_div_folder_node_" . $deep  . "_" . $i_id;
		echo "<div id='" . $id_str . "' class='treeFolderView_li_div'";
		if($i_id > 0){
			echo " style='display:none;'";
		}
		echo "><ul class='treeFolderView_ul'>";
		foreach($root as $value){ 
			if($value === '.' || $value === '..' || $value === ".svn" || $value === "includesystem" ) {
				continue;
			} 
			$i_id++;
			if(is_file($dir."/".$value)) {
				echo "<li class='treeFolderView_ul_li'>
				<span id='".$id ."_ul_li_span_".$i_id."' class='treeFolderView_ul_li_span' onclick='return TreeFolderView_param.file_on_click(this);' onMouseMove='return TreeFolderView_param.mouse_move(this);' onMouseOut='return TreeFolderView_param.mouse_out(this);'>
				".$value."</span><input id='".$id ."_ul_li_span_".$i_id."_input'  type='hidden' value='".substr($dir,1)."/".$value."'></li>";
				continue;
			}
			$path = "";
			if(is_dir($dir."/".$value)) {
				$path = $dir."/".$value;
				$id_str_in =  $id . "_div_folder_node_" . ($deep + 1)  . "_" . $i_id;
				echo "<li class='treeFolderView_ul_li' onclick='return TreeFolderView_param.folder_on_click(\"". $id_str_in ."\",\"".$path."\");'>";
				echo"<img id='".$id_str_in."_img' class='treeFolderView_li_img' src='../../../includesystem/images/close_folder.jpg'>" . $value . "</li>";
				$deep++;
			}
			find_all_files($dir . "/" . $value);
		}
		$deep--;			
		echo "</ul></div>";

	}

}


find_all_files(".");

?>