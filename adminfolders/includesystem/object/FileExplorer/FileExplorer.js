FileExplorer_param = {};

FileExplorer = function(id){
	var path_root = getRootDirectory();
	document.writeln("<div class='div_main_fileexplorer'><table width='100%' border=0 cellspacing=0 cellpadding=0><tr>");
	document.writeln("<td valign='top' width='170px;'>");
	document.writeln("<table width='100%' border=0 cellspacing=0px cellpadding=0>");
	document.writeln("<tr><td valign='middle' class='file_td_button_fileexplorer'>");
	document.writeln("<span id='span_addfolder_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Добавить папку' id='add_image_folder_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/Button Add-01.png'></span>");
	document.writeln("<span id='span_renamefolder_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Переименовать папку' id='rename_image_folder_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/rename.png'></span>");
	document.writeln("<span id='span_delfolder_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Удалить папку' id='delete_image_folder_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/Delete.png'></span>");
	document.writeln("<span id='span_chmodfolder_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Права на папку' id='chmod_image_folder_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/chmod.png'></span>");
	document.writeln("</td></tr>");
	document.writeln("<tr><td><div id='div_folder_"+id+"' class='div_folder_fileexplorer'>Загрузка...</div></td></tr>");
	document.writeln("</td></tr></table>");	
	//document.writeln("<div id='div_folder_"+id+"' class='div_folder_fileexplorer'>Загрузка...</div>");
	document.writeln("</td><td class='file_td_fileexplorer' valign='top'>");
	document.writeln("<table width='100%' border=0 cellspacing=0px cellpadding=0>");
	document.writeln("<tr><td valign='middle' class='file_td_button_fileexplorer'>");
	document.writeln("<table width='100%' border=0 cellspacing=0px cellpadding=0><tr><td align='left'>");
	document.writeln("<span class='file_span_span_button_fileexplorer'><img title='Вернуться в начало раздела' id='up_image_fileexplorer_"+id+"'  src='../../../"+path_root+"/includesystem/images/folder_up.png'></span>");
	document.writeln("<span id='span_addfile_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Добавить файл' id='add_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/Button Add-01.png'></span>");
	document.writeln("<span id='span_renamefile_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Переименовать файл' id='rename_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/rename.png'></span>");
	document.writeln("<span class='file_span_span_button_fileexplorer'><img title='Редактировать файл' id='edit_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/page_white_edit.png'></span>");
	document.writeln("<span id='span_delfile_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Удалить файл' id='delete_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/Delete.png'></span>");
	document.writeln("<span id='span_downloadfile_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Загрузить файл' id='download_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/download.png'></span>");	
	document.writeln("<span id='span_chmodfile_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Права на файл' id='chmod_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/chmod.png'></span>");
	document.writeln("</td><td align='right'><span id='span_getoutfile_fileexplorer_"+id+"' style='position:relative;z-index:2;' class='file_span_span_button_fileexplorer'><img title='Выйти' id='getout_image_fileexplorer_"+id+"' src='../../../"+path_root+"/includesystem/images/getout.png'></span>");
	document.writeln("</td></tr></table>");
	document.writeln("</td></tr>");
	document.writeln("<tr><td><div id='div_file_"+id+"' class='div_file_fileexplorer'>&nbsp;&nbsp;Загрузка...</div></td></tr>");
	document.writeln("<tr><td><div id='div_file_footer_" + id + "' class='file_div_button_fileexplorer'>Файл:</div></td></tr>");
	document.writeln("</td></tr></table></td></tr></table></div>");
	
	this.id = id;
	this.font_size = "";				//setup "font_size" is the css property
	this.margin_left = "";
	this.cookie_save = true;
	/*
	methods
	getPathFile() -	the method is returned path of file
	*/
}

FileExplorer.prototype.DeleteMenuFileWindow = function(){
	var div_id = "div_menufile_fileexplorer_" + this.id;
	if(document.getElementById(div_id)){
		var el = document.getElementById(div_id).parentNode;
		el.removeChild(document.getElementById(div_id));
	}
}

FileExplorer.prototype.Create = function(){
	var path_root = getRootDirectory();
	var id = this.id;
	document.getElementById("div_folder_" + id).innerHTML = "Загрузка...";
	
	document.getElementById("div_folder_"+id).Param = this;
	document.getElementById("div_file_"+id).ParamSource = this.source;
	document.getElementById("div_file_"+id).CurrentFolderPath = "..";
	document.getElementById("div_file_"+id).CurrentFilePath = "";
	document.getElementById("div_file_"+id).CurrentObjectPermiss = "";
		
	document.getElementById("div_folder_"+id).selectedRow = "";
	document.getElementById("div_folder_"+id).selectedFileRow = "";
	document.getElementById("div_folder_"+id).selectedFolderRow = "";	
	document.getElementById("div_folder_"+id).searchDomFinish = false;
	document.getElementById("div_folder_"+id).TreeLevelIndex = 1;
	
	//document.getElementById("div_folder_"+id).partTreeIsLoaded = false;
	document.getElementById("div_folder_"+id).deepTreeIsOpened = 0;
	document.getElementById("div_folder_"+id).arrOpenFolder = [];

	//attach events
	document.getElementById("up_image_fileexplorer_" + id).onclick = function(){
		document.getElementById("div_folder_"+id).innerHTML = "<img src='../../../"+path_root+"/includesystem/images/ajax-loader.gif'>";
		document.getElementById("div_file_"+id).innerHTML = "<img src='../../../"+path_root+"/includesystem/images/ajax-loader.gif'>";
		var ob = document.getElementById("div_folder_"+id).Param;
		if (ob) ob.DeleteMenuFileWindow();			
		document.getElementById("div_folder_"+id).Param.Refresh();
	}
	
	document.getElementById("edit_image_fileexplorer_" + id).onclick = function(){
		var ob = document.getElementById("div_folder_"+id).Param;
		if(document.getElementById("div_file_"+id).CurrentFilePath!=""){
			ob.onFileEdit();
		} else {
			alert("Не выбран файл!");
		}
	}
	
	document.getElementById("add_image_fileexplorer_" + id).onclick = function(){
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();	
		if(!document.getElementById("div_menufile_fileexplorer_" + id)){
			var span_add_file = document.getElementById("span_addfile_fileexplorer_" + id);
			var div = document.createElement('div');
			div.id = "div_menufile_fileexplorer_" + id;
			div.className = 'div_menu_file_fileexplorer';
			var filename = document.getElementById("div_file_"+id).CurrentFilePath;
			var s = "<div style='padding-bottom:35px'><input id='div_menufile_fileexplorer_input_"+id+"' size='33' type='text' value=''></div>";
			s+= "<div style='text-align:center;'>";
			s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
			s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
			div.innerHTML = s;
			span_add_file.appendChild(div);
			document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
				this.disabled = true;
				if(div)	span_add_file.removeChild(div);
			}
			document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
				this.disabled = true;
				var param = "file_name=" + encodeURIComponent(document.getElementById("div_menufile_fileexplorer_input_" + id).value);
				param+= "&path=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
				var source = document.getElementById("div_file_"+id).ParamSource;
				new ajax_connect('POST',source,param,
					function callback_access(ss){
						switch (parseInt(ss)){
							case 1:
								var ob = document.getElementById("div_folder_"+id).Param;
								ob.RefreshFileDistrict();
								break;
							case 2:
								alert("Файл с таким именем уже существует!");
								break;
							case 3:
								alert("Error!");
								break;
							default:
								alert(ss);
						}		
						if(div)	span_add_file.removeChild(div);
					},
					function callback_error(ss){this.disabled = false; alert("Ошибка создания файла");}
				);
				
			}
		}
	}
	
	document.getElementById("rename_image_fileexplorer_" + id).onclick = function(){
		if(document.getElementById("div_file_"+id).CurrentFilePath == ""){
			alert("Не выбран файл!");
			return 0;
		}
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();	
		if(!document.getElementById("div_menufile_fileexplorer_" + id)){
			var span_rename_file = document.getElementById("span_renamefile_fileexplorer_" + id);
			var div = document.createElement('div');
			div.id = "div_menufile_fileexplorer_" + id;
			div.className = 'div_menu_file_fileexplorer';
			var filename = document.getElementById("div_file_"+id).CurrentFilePath;
			var file = "";
			if(filename!=""){
				var arr_f = filename.split("/");
				file = arr_f[arr_f.length-1];
			}	
			var s = "<div style='padding-bottom:35px'><input id='div_menufile_fileexplorer_input_"+id+"' size='33' type='text' value='"+file+"'></div>";
			s+= "<div style='text-align:center;'>";
			s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
			s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
			div.innerHTML = s;
			span_rename_file.appendChild(div);
			document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
				this.disabled = true;
				if(div)	span_rename_file.removeChild(div);
			}
			document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
				if(document.getElementById("div_menufile_fileexplorer_input_" + id).value == file){
					return 0;
				}
				this.disabled = true;
				var but = this;
				var param = "file_name=" + encodeURIComponent(file);
				param+= "&file_name_new=" + encodeURIComponent(document.getElementById("div_menufile_fileexplorer_input_" + id).value);
				param+= "&path=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
				var source = document.getElementById("div_file_"+id).ParamSource;
				new ajax_connect('POST',source,param,
					function callback_access(ss){
						switch (parseInt(ss)){
							case 1:
								var ob = document.getElementById("div_folder_"+id).Param;
								ob.RefreshFileDistrict();
								break;
							case 2:
								alert("Ошибка переименования файла!");
								but.disabled = false;
								return 0;
							case 3:
								alert("Error!");
								break;
							default:
								alert(ss);
						}		
						if(div)	span_rename_file.removeChild(div);
					},
					function callback_error(ss){this.disabled = false; alert("Ошибка создания файла");}
				);
				
			}
		}
	}	
	
	document.getElementById("delete_image_fileexplorer_" + id).onclick = function(){
		if(document.getElementById("div_file_"+id).CurrentFilePath == ""){
			alert("Не выбран файл!");
			return 0;
		}
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();
		var span_del_file = document.getElementById("span_delfile_fileexplorer_" + id);
		var div = document.createElement('div');
		div.id = "div_menufile_fileexplorer_" + id;
		div.className = 'div_menu_file_fileexplorer';
		var s = "<div style='padding-bottom:35px;color:#990000;'>Удалить файл<br>" + document.getElementById("div_file_"+id).CurrentFilePath + "?</div>";
		s+= "<div style='text-align:center;'>";
		s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
		s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
		div.innerHTML = s;
		span_del_file.appendChild(div);
		document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
			this.disabled = true;
			if(div)	span_del_file.removeChild(div);
		}
		document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
			this.disabled = true;
			var param = "file_name=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFilePath);
			param+= "&file_delete=1";
			var source = document.getElementById("div_file_"+id).ParamSource;
			new ajax_connect('POST',source,param,
				function callback_access(ss){
					switch (parseInt(ss)){
						case 1:
							var ob = document.getElementById("div_folder_"+id).Param;
							ob.RefreshFileDistrict();
							break;
						case 2:
							alert("Ошибка удаления файла!");
							break;
						default:
							alert(ss);
					}		
					if(div)	span_del_file.removeChild(div);
				},
				function callback_error(ss){this.disabled = false; alert("Ошибка удаления файла");}
			);
		}
	}
	
	//download
	document.getElementById("download_image_fileexplorer_" + id).onclick = function(){
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();
		var span_download_file = document.getElementById("span_downloadfile_fileexplorer_" + id);
		var div = document.createElement('div');
		div.id = "div_menufile_fileexplorer_" + id;
		div.className = 'div_menu_loadfile_file_fileexplorer';
		var path = encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
		var s = "<div><iframe width='260px' height='110px;' frameborder='0' scrolling='no' src='../../../"+path_root+"/includesystem/object/FileExplorer/FileExplorer_dowload_file_form?id="+id+"&path="+path+"'></div>";
		div.innerHTML = s;
		span_download_file.appendChild(div);
	}
	
	//chmod
	document.getElementById("chmod_image_fileexplorer_" + id).onclick = function(){
		if(document.getElementById("div_file_"+id).CurrentFilePath == "" && (document.getElementById("div_file_"+id).CurrentFolderPath == ".." || document.getElementById("div_file_"+id).CurrentFolderPath == "")){
			alert("Не выбран файл или папка!");
			return 0;
		}
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();
		var span_chmod_file = document.getElementById("span_chmodfile_fileexplorer_" + id);
		var div = document.createElement('div');
		div.id = "div_menufile_fileexplorer_" + id;
		div.className = 'div_menu_file_fileexplorer';
		var permiss = document.getElementById("div_file_"+id).CurrentObjectPermiss;
		var s = "<div style='padding-bottom:35px;'><div>Права на файл или папку</div><input id='div_menufile_fileexplorer_input_"+id+"' size='33' type='text' value='" + permiss + "'></div>";
		s+= "<div style='text-align:center;'>";
		s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
		s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
		div.innerHTML = s;
		span_chmod_file.appendChild(div);
		document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
			this.disabled = true;
			if(div)	span_chmod_file.removeChild(div);
		}
		document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
			this.disabled = true;
			var param = "";
			if(document.getElementById("div_file_"+id).CurrentFilePath != ""){
				param+= "file_name=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFilePath);
			} else {
				if(document.getElementById("div_file_"+id).CurrentFolderPath != ".." && document.getElementById("div_file_"+id).CurrentFolderPath != ""){
					param+= "file_name=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
				}
			}
			param+= "&chmod=" + document.getElementById("div_menufile_fileexplorer_input_"+id).value;
			var source = document.getElementById("div_file_"+id).ParamSource;
			new ajax_connect('POST',source,param,
				function callback_access(ss){
					switch (parseInt(ss)){
						case 1:
							var	permiss = document.getElementById("div_menufile_fileexplorer_input_"+id).value;
							document.getElementById("div_file_"+id).CurrentObjectPermiss = permiss;
							var ob = document.getElementById("div_folder_"+id).Param;
							ob.RefreshFileDistrict();							
							alert("Права изменены!");
							break;
						case 2:
							alert("Ошибка chmod!");
							break;
						default:
							alert(ss);
					}		
					if(div)	span_chmod_file.removeChild(div);
				},
				function callback_error(ss){this.disabled = false; alert("Ошибка изменения прав на файл!");}
			);
		}
	}
	
	//buttons for folder
	//folder add
	document.getElementById("add_image_folder_fileexplorer_" + id).onclick = function(){
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();	
		if(!document.getElementById("div_menufolder_fileexplorer_" + id)){
			var span_add_file = document.getElementById("span_addfolder_fileexplorer_" + id);
			var div = document.createElement('div');
			div.id = "div_menufile_fileexplorer_" + id;
			div.className = 'div_menu_folder_fileexplorer';
			var filename = document.getElementById("div_file_"+id).CurrentFilePath;
			var s = "<div style='padding-bottom:35px'><input id='div_menufile_fileexplorer_input_"+id+"' size='33' type='text' value=''></div>";
			s+= "<div style='text-align:center;'>";
			s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
			s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
			div.innerHTML = s;
			span_add_file.appendChild(div);
			document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
				this.disabled = true;
				if(div)	span_add_file.removeChild(div);
			}
			document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
				this.disabled = true;
				var param = "folder_name=" + encodeURIComponent(document.getElementById("div_menufile_fileexplorer_input_" + id).value);
				param+= "&path=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
				var arr_open_folder = document.getElementById("div_folder_"+id).Param.getParentFolderClickImage(document.getElementById("div_folder_"+id).selectedFolderRow);
				
				var source = document.getElementById("div_file_"+id).ParamSource;
				new ajax_connect('POST',source,param,
					function callback_access(ss){
						switch (parseInt(ss)){
							case 1:
								document.getElementById("div_folder_"+id).Param.RefreshWithFolderOpened(arr_open_folder);
								break;
							case 2:
								alert("Папка с таким именем уже существует!");
								break;
							case 3:
								alert("Error!");
								break;
							default:
								alert(ss);
						}		
						if(div)	span_add_file.removeChild(div);
					},
					function callback_error(ss){this.disabled = false; alert("Ошибка создания папки");}
				);
				
			}
		}
	}
	
	//folder rename
	document.getElementById("rename_image_folder_fileexplorer_" + id).onclick = function(){
		if(document.getElementById("div_file_"+id).CurrentFolderPath.replace(/\./g,"") == ""){
			alert("Не выбрана папка!");
			return 0;
		}
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();	
		if(!document.getElementById("div_menufolder_fileexplorer_" + id)){
			var span_rename_file = document.getElementById("span_renamefolder_fileexplorer_" + id);
			var div = document.createElement('div');
			div.id = "div_menufile_fileexplorer_" + id;
			div.className = 'div_menu_folder_fileexplorer';
			var foldername = document.getElementById("div_file_"+id).CurrentFolderPath;
			var folder = "";
			if(foldername!=""){
				var arr_f = foldername.split("/");
				folder = arr_f[arr_f.length-1];
			}	
			var last_separator = document.getElementById("div_file_"+id).CurrentFolderPath.lastIndexOf("/");
			var path = document.getElementById("div_file_"+id).CurrentFolderPath.substring(0,last_separator);
			var s = "<div style='padding-bottom:35px'><input id='div_menufile_fileexplorer_input_"+id+"' size='33' type='text' value='"+folder+"'></div>";
			s+= "<div style='text-align:center;'>";
			s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
			s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
			div.innerHTML = s;
			span_rename_file.appendChild(div);
			document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
				this.disabled = true;
				if(div)	span_rename_file.removeChild(div);
			}
			document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
				if(document.getElementById("div_menufile_fileexplorer_input_" + id).value == folder){
					return 0;
				}
				this.disabled = true;
				var but = this;
				var param = "folder_name=" + encodeURIComponent(folder);
				param+= "&folder_name_new=" + encodeURIComponent(document.getElementById("div_menufile_fileexplorer_input_" + id).value);
				param+= "&path=" + encodeURIComponent(path);
				var source = document.getElementById("div_file_"+id).ParamSource;
				var arr_open_folder = document.getElementById("div_folder_"+id).Param.getParentFolderClickImage(document.getElementById("div_folder_"+id).selectedFolderRow);
				
				new ajax_connect('POST',source,param,
					function callback_access(ss){
						switch (parseInt(ss)){
							case 1:
								document.getElementById("div_folder_"+id).Param.RefreshWithFolderOpened(arr_open_folder);
								break;								
							case 2:
								alert("Ошибка переименования папки!");
								but.disabled = false;
								return 0;
							case 3:
								alert("Error!");
								break;
							default:
								alert(ss);
						}		
						if(div)	span_rename_file.removeChild(div);
					},
					function callback_error(ss){this.disabled = false; alert("Ошибка создания файла");}
				);
			}
		}
	}	
	
	//folder delete
	document.getElementById("delete_image_folder_fileexplorer_" + id).onclick = function(){
		if(document.getElementById("div_file_"+id).CurrentFolderPath.replace(/\./g,"") == ""){
			alert("Не выбрана папка!");
			return 0;
		}
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();
		var span_del_file = document.getElementById("span_delfolder_fileexplorer_" + id);
		var div = document.createElement('div');
		div.id = "div_menufile_fileexplorer_" + id;
		div.className = 'div_menu_file_fileexplorer';
		var s = "<div style='padding-bottom:35px;color:#990000;'>Удалить папку<br>" + document.getElementById("div_file_"+id).CurrentFolderPath + "?</div>";
		s+= "<div style='text-align:center;'>";
		s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_" + id + "' type='button' value='ОК'>&nbsp;"; 
		s+= "<input id='div_menufile_fileexplorer_button_cancel_" + id + "' style='width:70px' type='button' value='Отмена'></div>";
		div.innerHTML = s;
		span_del_file.appendChild(div);
		document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
			this.disabled = true;
			if(div)	span_del_file.removeChild(div);
		}
		document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
			this.disabled = true;
			var param = "folder_name=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
			param+= "&folder_delete=1";
			
			var arr_open_folder = document.getElementById("div_folder_"+id).Param.getParentFolderClickImage(document.getElementById("div_folder_"+id).selectedFolderRow);
			var source = document.getElementById("div_file_"+id).ParamSource;
			new ajax_connect('POST',source,param,
				function callback_access(ss){
					switch (parseInt(ss)){
						case 1:
							document.getElementById("div_folder_"+id).Param.RefreshWithFolderOpened(arr_open_folder);
							break;
						case 2:
							alert("Ошибка удаления директории! \r\n Удалить можно только пустую диреторию!");
							break;
						default:
							alert(ss);
					}		
					if(div)	span_del_file.removeChild(div);
				},
				function callback_error(ss){this.disabled = false; alert("Ошибка удаления файла");}
			);
		}
	}
	
	//folder chmod
	document.getElementById("chmod_image_folder_fileexplorer_" + id).onclick = function(){
		if(document.getElementById("div_file_"+id).CurrentFolderPath == ".." || document.getElementById("div_file_"+id).CurrentFolderPath == ""){
			alert("Не выбрана папка!");
			return 0;
		}
		var ob = document.getElementById("div_folder_"+id).Param;
		ob.DeleteMenuFileWindow();
		var span_chmod_file = document.getElementById("span_chmodfolder_fileexplorer_" + id);
		var div = document.createElement('div');
		div.id = "div_menufile_fileexplorer_" + id;
		div.className = 'div_menu_file_fileexplorer';
		var permiss = document.getElementById("div_file_"+id).CurrentObjectPermiss;
		var s = "<div style='padding-bottom:35px;'><div>Права на файл или папку</div><input id='div_menufile_fileexplorer_input_"+id+"' size='33' type='text' value='" + permiss + "'></div>";
		s+= "<div style='text-align:center;'>";
		s+= "<input style='width:70px' id='div_menufile_fileexplorer_button_ok_"+id+"' type='button' value='ОК'>&nbsp;"; 
		s+= "<input id='div_menufile_fileexplorer_button_cancel_"+id+"' style='width:70px' type='button' value='Отмена'></div>";
		div.innerHTML = s;
		span_chmod_file.appendChild(div);
		document.getElementById("div_menufile_fileexplorer_button_cancel_" + id).onclick = function(){
			this.disabled = true;
			if(div)	span_chmod_file.removeChild(div);
		}
		document.getElementById("div_menufile_fileexplorer_button_ok_" + id).onclick = function(){
			this.disabled = true;
			var param = "";
			if(document.getElementById("div_file_"+id).CurrentFolderPath != ".." && document.getElementById("div_file_"+id).CurrentFolderPath != ""){
				param+= "file_name=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath);
			}
			param+= "&chmod=" + document.getElementById("div_menufile_fileexplorer_input_"+id).value;
			
			var arr_open_folder = document.getElementById("div_folder_"+id).Param.getParentFolderClickImage(document.getElementById("div_folder_"+id).selectedFolderRow);
			var source = document.getElementById("div_file_"+id).ParamSource;
			new ajax_connect('POST',source,param,
				function callback_access(ss){
					switch (parseInt(ss)){
						case 1:
							var	permiss = document.getElementById("div_menufile_fileexplorer_input_"+id).value;
							document.getElementById("div_file_"+id).CurrentObjectPermiss = permiss;
							document.getElementById("div_folder_"+id).Param.Refresh();
							alert("Права изменены!");
							document.getElementById("div_folder_"+id).Param.RefreshWithFolderOpened(arr_open_folder);
							break;
						case 2:
							alert("Ошибка chmod!");
							break;
						default:
							alert(ss);
					}		
					if(div)	span_chmod_file.removeChild(div);
				},
				function callback_error(ss){this.disabled = false; alert("Ошибка изменения прав на папку!");}
			);
		}
	}
	
	//exit from programm
	document.getElementById("getout_image_fileexplorer_" + id).onclick = function(){
		var source = "../../../"+path_root+"/adminsystem/exit?separate=1";
		new ajax_connect('GET',source,'',
			function callback_access(ss){
				if(parseInt(ss) == 1) {
					location.replace("../../../"+path_root);
				} else {
					alert("Ошибка выхода из системы!");
				}
			},
			function callback_error(ss){alert("Ошибка выхода из системы!");}
		);		
	}

	//add styles
	if(this.font_size){
		addNewRule(".FileExplorer_ul_li_td3","font-size:" + this.font_size);
		addNewRule(".file_div_button_fileexplorer","font-size:" + this.font_size);
	}
	this.Refresh();
}

FileExplorer.prototype.Refresh = function(){
	var id = this.id;
	var param = "id=" + id;
	var source = this.source;
	document.getElementById("div_file_"+id).CurrentFolderPath = "..";
	document.getElementById("div_file_"+id).CurrentFilePath = "";
	document.getElementById("div_file_"+id).CurrentObjectPermiss = "";
	document.getElementById("div_folder_"+id).selectedRow = "";
	document.getElementById("div_folder_"+id).selectedFileRow = "";
	document.getElementById("div_folder_"+id).selectedFolderRow = "";	
	document.getElementById("div_folder_"+id).searchDomFinish = false;
	document.getElementById("div_folder_"+id).TreeLevelIndex = 1;
	document.getElementById("div_file_footer_" + id).innerHTML = "Файл:";
	document.getElementById("div_folder_"+id).deepTreeIsOpened = 0;
	document.getElementById("div_folder_"+id).arrOpenFolder = [];	
	
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_folder_"+id).innerHTML = ss;
				},
				function callback_error(ss){alert(ss);});

	//The files are loaded into the div
	var param = "id=" + id + "&dir=" + encodeURIComponent("../") + "&is_file=1";
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_file_"+id).innerHTML = ss;
				},
				function callback_error(ss){alert(ss);});
}

FileExplorer.prototype.RefreshWithFolderOpened = function(arr_open_folder){
	var id = this.id;
	var param = "id=" + id;
	var source = this.source;
	document.getElementById("div_file_"+id).CurrentFolderPath = "..";
	document.getElementById("div_file_"+id).CurrentFilePath = "";
	document.getElementById("div_file_"+id).CurrentObjectPermiss = "";
	document.getElementById("div_folder_"+id).selectedRow = "";
	document.getElementById("div_folder_"+id).selectedFileRow = "";
	document.getElementById("div_folder_"+id).selectedFolderRow = "";	
	document.getElementById("div_folder_"+id).searchDomFinish = false;
	document.getElementById("div_folder_"+id).TreeLevelIndex = 1;
	document.getElementById("div_file_footer_" + id).innerHTML = "Файл:";
	document.getElementById("div_folder_"+id).deepTreeIsOpened = 0;
	document.getElementById("div_folder_"+id).arrOpenFolder = [];
	
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_folder_"+id).innerHTML = ss;
					document.getElementById("div_folder_"+id).arrOpenFolder = arr_open_folder;
					document.getElementById("div_folder_"+id).Param.getParentFolderClickImageOpen();
				},
				function callback_error(ss){alert(ss);});

	//The files are loaded into the div
	var param = "id=" + id + "&dir=" + encodeURIComponent("../") + "&is_file=1";
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_file_"+id).innerHTML = ss;
				},
				function callback_error(ss){alert(ss);});
}

FileExplorer.prototype.getParentFolderClickImage = function(id){
	var arr_image_id = [];
	if(document.getElementById(id)){
		var nodes = [];
		var element = document.getElementById(id); 
		nodes.push(element);
		while(element.parentNode) {
			nodes.unshift(element.parentNode);
			element = element.parentNode;
			if(element.id){
				var li_id = element.id;
				var arr = li_id.split("_");
				var parent_id = arr[0];
				var inp2_id  = parent_id + "_" + this.id + "_FileExplorer_li_inp2";	
				if(document.getElementById(inp2_id)){
					arr_image_id.push([li_id,document.getElementById(inp2_id).value]);
					//arr_image_id.push(li_id);
					//alert(li_id);
				}
			}
		}
	}
	if(arr_image_id.length > 0){
		return arr_image_id.reverse();
	} else {
		return false;
	}
}

FileExplorer.prototype.getParentFolderClickImageOpen = function(){
	//alert(document.getElementById("div_folder_"+this.id).deepTreeIsOpened);
	if(document.getElementById("div_folder_"+this.id).arrOpenFolder){
		var li_id = document.getElementById("div_folder_"+this.id).arrOpenFolder[document.getElementById("div_folder_"+this.id).deepTreeIsOpened][0];
		var path = document.getElementById("div_folder_"+this.id).arrOpenFolder[document.getElementById("div_folder_"+this.id).deepTreeIsOpened][1];
		if(li_id){
			var arr = li_id.split("_");
			var parent_id = arr[0];
			var inp2_id  = parent_id + "_" + this.id + "_FileExplorer_li_inp2";	
			var img1_id  = parent_id + "_" + this.id + "_FileExplorer_li_img1";
			if(document.getElementById(img1_id) && document.getElementById(inp2_id).value == path){
				FileExplorer_param.folder_on_click_open(li_id,this.id,document.getElementById(inp2_id).value);
			}
		}	
	}	
}

FileExplorer.prototype.RefreshFileDistrict = function(){
	var id = this.id;
	var param = "id=" + id;
	var source = this.source;
	//The files are loaded into the div
	var param = "id=" + id + "&dir=" + encodeURIComponent(document.getElementById("div_file_"+id).CurrentFolderPath) + "&is_file=1";
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_file_"+id).CurrentFilePath = "";
					if(document.getElementById("div_file_"+id).CurrentFolderPath){
						document.getElementById("div_file_footer_" + id).innerHTML = "Файл:&nbsp;" + document.getElementById("div_file_"+id).CurrentFolderPath;				
					} else {
						document.getElementById("div_file_footer_" + id).innerHTML = "";
					}					
					document.getElementById("div_file_"+id).innerHTML = ss;
				},
				function callback_error(ss){alert(ss);});
}

FileExplorer.prototype.getPathFile = function(){
	return document.getElementById("div_file_"+this.id).CurrentFilePath;
}

FileExplorer_param.folder_on_click_open = function(li_id,id,path){
	var path_root = getRootDirectory();
	//ajax query is done
	var arr = li_id.split("_");
	var parent_id = arr[0];
	var source = document.getElementById("div_file_"+id).ParamSource;
	var param = "id=" + id + "&dir=" + encodeURIComponent(path) + "&parent_id=" + parent_id;
	
	var img1_id  = parent_id + "_" + id + "_FileExplorer_li_img1";
	var img2_id  = parent_id + "_" + id + "_FileExplorer_li_img2";
	var inp1_id  = parent_id + "_" + id + "_FileExplorer_li_inp1";
	var inp2_id  = parent_id + "_" + id + "_FileExplorer_li_inp2";	
	var div_hide = "div_" + parent_id + "_" + id + "_FileExplorer_li";
	//alert(img1_id);
	if(document.getElementById(inp1_id)){
		if(parseInt(document.getElementById(inp1_id).value) == 1){
			if(document.getElementById(img1_id)){
				FileExplorer_param.folder_on_click(parent_id + "_" + id + "_FileExplorer_li_td",id,document.getElementById(inp2_id).value,0)
				document.getElementById(img1_id).src = "../../../"+path_root+"/includesystem/images/plus.jpg";
				document.getElementById(img2_id).src = "../../../"+path_root+"/includesystem/images/close_folder.jpg";
				document.getElementById(inp1_id).value = "2";
				//child elements is hidden
				FileExplorer_param.domwalking(document.getElementById(li_id).firstChild);
				
			}
			return 0;
		} else {
			if(parseInt(document.getElementById(inp1_id).value) == 2){
				if(document.getElementById(div_hide)){
					document.getElementById(div_hide).style.display = "";
				}			
				document.getElementById(img1_id).src = "../../../"+path_root+"/includesystem/images/minus.jpg";
				document.getElementById(img2_id).src = "../../../"+path_root+"/includesystem/images/open_folder.jpg";
				document.getElementById(inp1_id).value = "1";
				return 0;
			}
		}
	}

	if(document.getElementById(img1_id)){
		document.getElementById(img1_id).src = "../../../"+path_root+"/includesystem/images/minus.jpg";
	}
	if(document.getElementById(inp1_id)){
		document.getElementById(inp1_id).value = "1";
	}
	
	if(document.getElementById(img2_id)){
		document.getElementById(img2_id).src = "../../../"+path_root+"/includesystem/images/ajax-loader.gif";
	}
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					var li_o = document.getElementById(li_id);
					var div = document.createElement('div');
					div.id = div_hide;
					div.innerHTML = ss;
					li_o.appendChild(div);	
					if(document.getElementById(img2_id)){
						document.getElementById(img2_id).src = "../../../"+path_root+"/includesystem/images/open_folder.jpg";
					}
					FileExplorer_param.domwalking_open(div.firstChild,id);
					if(document.getElementById("div_folder_"+id).deepTreeIsOpened < (document.getElementById("div_folder_"+id).arrOpenFolder.length-1)){
						document.getElementById("div_folder_"+id).deepTreeIsOpened++;
						document.getElementById("div_folder_"+id).Param.getParentFolderClickImageOpen();
					}
				},
				function callback_error(ss){alert(ss);});
	
}

FileExplorer_param.domwalking = function (node) {
	var path_root = getRootDirectory();
    while (node) {
        if (1 == node.nodeType) {
			if(node.id){
				var arr = node.id.split("_");
				if(arr[0]=="div"){
					var s = node.id.substr(4);
					var inp_id = s + "_inp1";
					var img_id   = s + "_img1";
					var img2_id   = s + "_img2";					
					node.style.display = "none";
					if(document.getElementById(inp_id)){
						document.getElementById(inp_id).value = '2';
					}
					if(document.getElementById(img_id)){
						document.getElementById(img_id).src = "../../../"+path_root+"/includesystem/images/plus.jpg";
						document.getElementById(img2_id).src = "../../../"+path_root+"/includesystem/images/close_folder.jpg";
					}
					//setCookie("dbtreeview",DBTreeView_param.cookiedelete(arr[4]),30);
				}
			}	
        }
        FileExplorer_param.domwalking(node.firstChild);
        node = node.nextSibling;
    };
};

FileExplorer_param.string_reverse = function(s) {
	var str = s;
	var a = str.split('').reverse();
	return a.join('');
}

FileExplorer_param.domwalking_open = function (node,obj_id) {
	var path = document.getElementById("div_file_"+obj_id).CurrentFolderPath;
	var i = document.getElementById("div_file_"+obj_id).TreeLavelIndex;
	if(path != ""){
		var arr_path = path.replace(/\./g,"").split("/");
	}	
	var path1_string = "";
	var node_value_string =  "";
    while (node) {
		if (1 == node.nodeType && document.getElementById("div_folder_"+obj_id).searchDomFinish == false) {
			if(node.id){
				//alert(node.id);
				var node_id_rev = FileExplorer_param.string_reverse(node.id);
				var arr = node_id_rev.split("_");
				if(FileExplorer_param.string_reverse(arr[0])=="inp2" && path != ""){
					var node_value = node.value.replace(/\./g,"").split("/");
					var i = document.getElementById("div_folder_"+obj_id).TreeLevelIndex;
					if (!node_value[i]){
						return 0
					}
					if(node.value == path){
						document.getElementById("div_folder_"+obj_id).searchDomFinish = true;
						document.getElementById("div_folder_"+obj_id).TreeLevelIndex = 1;
						var td_id  = node.id.substr(0,node.id.length-4) + "td";
						FileExplorer_param.set_td_color(obj_id,td_id);
						return 0;
					}
					if(arr_path[i] == node_value[i] ){
						var li_id = node.id.substr(0,node.id.length-4) + "node";
						//if folder opened then should not open it
						var inp1_id = node.id.substr(0,node.id.length-4) + "inp1";
						
						if(document.getElementById(inp1_id) && parseInt(document.getElementById(inp1_id).value) != 1){
							FileExplorer_param.folder_on_click_open(li_id,obj_id,node.value);
						}
						document.getElementById("div_folder_"+obj_id).TreeLevelIndex++;
					}
				}
			}
        }
		if(document.getElementById("div_folder_"+obj_id).searchDomFinish == false){
			FileExplorer_param.domwalking_open(node.firstChild,obj_id);
		}
        node = node.nextSibling;
		
    };
};

FileExplorer_param.set_td_color = function (id,td_id) {
	document.getElementById(td_id).style.backgroundColor='#FFC6DB';
	var ob = document.getElementById("div_folder_"+id).selectedRow;
	if(ob != "" && ob.id != td_id){
		ob.style.backgroundColor='#FFFFFF';
	}
	document.getElementById("div_folder_"+id).selectedRow = document.getElementById(td_id);	
}

FileExplorer_param.folder_on_click = function (td_id,obj_id,path,permiss,is_file) {
	var id = obj_id;
	//tree folder must be open. It done here.
	document.getElementById("div_file_"+id).CurrentFolderPath = path;
	document.getElementById("div_file_"+id).CurrentFilePath = "";
	document.getElementById("div_file_"+id).CurrentObjectPermiss = permiss;
	document.getElementById("div_folder_"+id).selectedFolderRow = td_id;
	document.getElementById("div_file_footer_" + id).innerHTML = "Файл:&nbsp;" + path + "&nbsp;&nbsp;&nbsp;(" + permiss + ")";
	if(parseInt(is_file)==1){
		document.getElementById("div_folder_"+obj_id).searchDomFinish = false;
		document.getElementById("div_folder_"+id).TreeLevelIndex = 1;
		FileExplorer_param.domwalking_open(document.getElementById("div_folder_" + obj_id).firstChild,obj_id);
	} else {
		FileExplorer_param.set_td_color(id,td_id);
	}	
	
	//The files are loaded into the div
	document.getElementById("div_folder_"+id).selectedFileRow = "";
	var source = document.getElementById("div_file_"+id).ParamSource;
	var param = "id=" + id + "&dir=" + encodeURIComponent(path) + "&is_file=1";
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_file_"+id).innerHTML = ss;
				},
				function callback_error(ss){alert(ss);});
}

FileExplorer_param.file_on_click = function (td_id,id,path,permiss) {
	document.getElementById(td_id).style.backgroundColor='#FFC6DB';
	var ob = document.getElementById("div_folder_" + id).selectedFileRow;
	if(ob != "" && ob.id != td_id){
		ob.style.backgroundColor='#FFFFFF';
	}
	document.getElementById("div_folder_" + id).selectedFileRow = document.getElementById(td_id);	
	document.getElementById("div_file_footer_" + id).innerHTML = "Файл:&nbsp;" + path + "&nbsp;&nbsp;&nbsp;(" + permiss + ")";
	document.getElementById("div_file_"+id).CurrentFilePath = path;
	document.getElementById("div_file_"+id).CurrentObjectPermiss = permiss;
}
