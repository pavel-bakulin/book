TreeFolderView_param = {};

TreeFolderView = function(id){
	document.writeln("<div id='div_"+id+"' style='background-color:#FFFFFF'>Загрузка...</div>");
	this.id = id;
	this.font_size = "";				//setup "font_size" is the css property
	this.margin_left = "";
	this.cookie_save = true;
	/*
	methods
	getPathFile() -	the method is returned path of file
	*/
}

TreeFolderView.prototype.Create = function(){
	var id = this.id;
	document.getElementById("div_" + id).innerHTML = "Загрузка...";
	var source = this.source;
	var param = "id=" + id;
	
	document.getElementById("div_"+id).Param = this;
	document.getElementById("div_"+id).selectedRow = "";
	
	if(this.font_size){
		addNewRule(".treeFolderView_ul_li","font-size:" + this.font_size);
	}	

	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_"+id).innerHTML = ss;
				},
				function callback_error(ss){alert(ss);});	
}

TreeFolderView.prototype.getPathFile = function(){
	var ob = document.getElementById("div_"+this.id).selectedRow;
	var input_ob = ob.id + "_input";
	if(document.getElementById(input_ob)){
		return document.getElementById(input_ob).value;
	}
}


TreeFolderView_param.folder_on_click = function(obj,path){
	if(document.getElementById(obj + "_img")){
		if(!document.getElementById(obj + "_img").property_state || document.getElementById(obj + "_img").property_state == "0"){
			document.getElementById(obj + "_img").src = "../../../includesystem/images/open_folder.jpg";
			document.getElementById(obj + "_img").property_state = "1";
			if(document.getElementById(obj)){
				document.getElementById(obj).style.display = "";
			}
		} else {
			document.getElementById(obj + "_img").src = "../../../includesystem/images/close_folder.jpg";
			document.getElementById(obj + "_img").property_state = "0";
			if(document.getElementById(obj)){
				document.getElementById(obj).style.display = "none";
			}
			//dom walking
			if(document.getElementById(obj) && document.getElementById(obj).childNodes.length > 0){
				TreeFolderView_param.domwalking(document.getElementById(obj).childNodes[0]);
			}	
		}
	}
}

TreeFolderView_param.file_on_click = function(obj,path){
//set color for selected
	obj.style.backgroundColor='#FFC6DB';
	var s = obj.id;
	var arr = s.split("_");
	var id = arr[0];
	var ob = document.getElementById("div_"+id).selectedRow;
	if(ob!=""){
		ob.style.backgroundColor='#FFFFFF';
	}
	document.getElementById("div_"+id).selectedRow = obj;
	
	var obj_div = document.getElementById("div_"+id).Param;
	if(obj_div.onFileClick){
		obj_div.onFileClick();
	}
}

TreeFolderView_param.domwalking = function (node) {
    while (node) {
        if (1 == node.nodeType) {
			if(node.id){
				var arr = node.id.split("_");
				if(arr[arr.length-1] == "img"){
					var obj_id;
					for(var i = 0;i < arr.length; i++){
						if(i == 0){
							obj_id = arr[i];
						} else {
							if(arr[i] != "img") obj_id+= "_" + arr[i];
						}
					}
					if(document.getElementById(obj_id))document.getElementById(obj_id).style.display = "none";
					document.getElementById(node.id).property_state = "0";
					document.getElementById(node.id).src = '../../../includesystem/images/close_folder.jpg';
				}
			}	
        }
        TreeFolderView_param.domwalking(node.firstChild);
        node = node.nextSibling;
    };
};

TreeFolderView_param.mouse_move = function(obj){
	col=obj.style.backgroundColor;col=col.toUpperCase();
	//alert(col);
	if(col.substr(0,3)=='RGB'){if(col!='RGB(255, 198, 219)'){obj.style.backgroundColor='#FBE4ED';}}else{if(col!='#FFC6DB'){obj.style.backgroundColor='#FBE4ED';}}
}

TreeFolderView_param.mouse_out = function(obj){
	col=obj.style.backgroundColor;col=col.toUpperCase();
	if(col.substr(0,3)=='RGB'){if(col!='RGB(255, 198, 219)'){obj.style.backgroundColor='#FFFFFF';}}else{if(col!='#FFC6DB'){obj.style.backgroundColor='#FFFFFF';}}
}
