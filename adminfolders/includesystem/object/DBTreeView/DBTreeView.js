DBTreeView_param = {};
DBTreeView_param.cookie_tmp = [];


DBTreeView = function(id){
	document.writeln("<div id='div_"+id+"' style='background-color:#FFFFFF'>Загрузка...</div>");
	this.id = id;
	//this.list_depend_id = "";
	this.font_size = "";				//setup "font_size" is the css property
	this.margin_left = "";
	this.cookie_save = true;
	this.selected_id  = ""; 	  		//this property consist id. the first value selected the row.
}

DBTreeView.prototype.Create = function(){
	var id = this.id;
	document.getElementById("div_" + id).innerHTML = "Загрузка...";
	document.writeln("<input id='input_" + id + "_source' type='hidden' value='" + this.source + "'>");	

	document.getElementById("div_"+id).Param = this;	
	this.selected_id  = "";
	
	//adding new css rule. The common.js file need include before this method calling
	if(this.font_size){
		addNewRule(".treeView_li_div","font-size:" + this.font_size);
	}	
	
	if(this.margin_left){
		addNewRule(".treeView_ul","margin-left:" + this.margin_left);
	}
	
	var source = this.source;
	var depend_id = this.depend_id;
	var param = "id=" + id + "&depend_id=" + this.depend_id;
	var cookie_save = this.cookie_save;
		
	DBTreeView_param.source = source;
	
	new ajax_connect('POST',source,param,
				function callback_access(ss){
					document.getElementById("div_"+id).innerHTML = ss;
					//tree from cookie
					var s_cookie = getCookie("dbtreeview");
					if(s_cookie && cookie_save == true){
						var arr_node_open = s_cookie.split("|");
						var j = 0;
						for (var i = 0; i < arr_node_open.length; i++) {
							if(DBTreeView_param.cookie_click(document.getElementById(id + "_div_node_" + arr_node_open[i])) == false){
								DBTreeView_param.cookie_tmp[j] = arr_node_open[i];
								j++;
							}							
						}
					}

				},
				function callback_error(ss){alert(ss);});	
}

DBTreeView_param.cookie_click = function(obj){
	if(!obj) return false;
	var s = obj.id;
	var arr = s.split("_");
	var id = arr[0];
	var depend_id = arr[3];
	var source = document.getElementById('input_' + id + '_source').value;
	var param = "id=" + id + "&depend_id=" + depend_id;
	var li_id = id + "_li_node_" + depend_id;
	var input_id = id + "_input_node_" + depend_id;
	var img_id = id + "_img_node_" + depend_id;
	
	var li_o = document.getElementById(li_id);
	var div = document.createElement('div');
	div.id = "div_" + obj.id;
	div.innerHTML = "<img src='../../../include/images/ajax-loader.gif'>";
	li_o.appendChild(div);
						
	new ajax_connect('POST',source,param,
			function callback_access(ss){
				if(ss != "no_record"){
					div.innerHTML = ss;
					document.getElementById(input_id).value = '1';
					if(document.getElementById(img_id)){
						document.getElementById(img_id).src = '../../../include/images/del.jpg';
					}
					//tree from cookie
					for (var i = 0; i < DBTreeView_param.cookie_tmp.length; i++) {
						if(DBTreeView_param.cookie_click(document.getElementById(id + "_div_node_" + DBTreeView_param.cookie_tmp[i]),0) != false){
							DBTreeView_param.cookie_tmp.splice(i,1);
						}
					}
				}	
			},
			function callback_error(ss){alert(ss);});
}

/*
set - setCookie, get - getCookie
this functions are required for correct work
*/
DBTreeView_param.on_click = function(obj,isnode){
	if(!obj) return false;
	var s = obj.id;
	var arr = s.split("_");
	var id = arr[0];
	var depend_id = arr[3];
	var source = document.getElementById('input_' + id + '_source').value;
	var param = "id=" + id + "&depend_id=" + depend_id;
	var li_id = id + "_li_node_" + depend_id;
	var input_id = id + "_input_node_" + depend_id;
	var img_id = id + "_img_node_" + depend_id;
	
	var s_cookie = getCookie("dbtreeview");
	if(s_cookie){
		var arr_node_open = s_cookie.split("|");
		if(document.getElementById(input_id) && parseInt(document.getElementById(input_id).value) != 1){
			if(!isValueInArray(arr_node_open,depend_id)){
				s_cookie += "|" + depend_id;
			}
		}
	} else {
		s_cookie = depend_id;
	}
	setCookie("dbtreeview",s_cookie,30);
	
	if(parseInt(isnode) == 1 && parseInt(document.getElementById(input_id).value) == 0){
		var li_o = document.getElementById(li_id);
		var div = document.createElement('div');
		div.id = "div_" + obj.id;
		div.innerHTML = "<img src='../../../include/images/ajax-loader.gif'>";
		li_o.appendChild(div);
						
		new ajax_connect('POST',source,param,
				function callback_access(ss){
					if(ss != "no_record"){
						div.innerHTML = ss;
						document.getElementById(input_id).value = '1';
						if(document.getElementById(img_id)){
							document.getElementById(img_id).src = '../../../include/images/del.jpg';
						}						
					}	
				},
				function callback_error(ss){alert(ss);});
	} else	{
		if(document.getElementById(input_id)){
			var div_hide = "div_" + obj.id;
			//alert(div_hide);
			if(parseInt(document.getElementById(input_id).value) == 1){
				var li_p = document.getElementById(div_hide);
				DBTreeView_param.domwalking(li_p);
			} else {
				if(document.getElementById(div_hide)){
					document.getElementById(div_hide).style.display = "";
				}
				if(document.getElementById(input_id)){
					document.getElementById(input_id).value = '1';
				}
				if(document.getElementById(img_id)){
					document.getElementById(img_id).src = '../../../include/images/del.jpg';
				}		
				
			}
		} else {
			//the element of tree is selected
			var ob = document.getElementById("div_"+id).Param;
			ob.selected_id = parseInt(depend_id);			
			if(ob.on_select_position){
				ob.on_select_position();
			}
		}		
	}
}

DBTreeView_param.domwalking = function (node) {
    while (node) {
        if (1 == node.nodeType) {
			if(node.id){
				var arr = node.id.split("_");
				if(arr[0]=="div"){
					var input_id = arr[1] + "_input_" + arr[3] + "_" + arr[4];
					var img_id = arr[1] + "_img_" + arr[3] + "_" + arr[4];
					//alert(node.id);
					node.style.display = "none";
					if(document.getElementById(input_id)){
						document.getElementById(input_id).value = '2';
					}
					if(document.getElementById(img_id)){
						document.getElementById(img_id).src = '../../../include/images/add.jpg';
					}
					setCookie("dbtreeview",DBTreeView_param.cookiedelete(arr[4]),30);
				}
			}	
        }
        DBTreeView_param.domwalking(node.firstChild);
        node = node.nextSibling;
    };
};

DBTreeView_param.cookiedelete = function (depend_id) {
	var s_cookie = getCookie("dbtreeview");
	if(s_cookie){
		var arr_node_open = s_cookie.split("|");
		s_cookie = "";
		for (var i = 0; i < arr_node_open.length; i++) {
			if(arr_node_open[i] != depend_id){
				if(s_cookie == ""){
					s_cookie = arr_node_open[i];
				} else {
					s_cookie += "|" + arr_node_open[i];
				}
			}
		}
		return s_cookie;		
	}
	return "";
};

DBTreeView_param.mouse_move = function(obj){
	col=obj.style.backgroundColor;col=col.toUpperCase();
	if(col.substr(0,3)=='RGB'){if(col!='RGB(253, 104, 119)'){obj.style.backgroundColor='#FFC6DB';}}else{if(col!='#FD6877'){obj.style.backgroundColor='#FFC6DB';}}
}

DBTreeView_param.mouse_out = function(obj){
	col=obj.style.backgroundColor;col=col.toUpperCase();
	if(col.substr(0,3)=='RGB'){if(col!='RGB(253, 104, 119)'){obj.style.backgroundColor='#FFFFFF';}}else{if(col!='#FD6877'){obj.style.backgroundColor='#FFFFFF';}}
}

DBTreeView.prototype.getText = function(){
	var obj_id = this.id + '_div_node_' + this.selected_id;
	if(document.getElementById(obj_id)){
		return (document.getElementById(obj_id).textContent || document.getElementById(obj_id).innerText);
	}
}

DBTreeView.prototype.getParam = function(){
	var obj_id = this.id + '_input_param_' + this.selected_id;
	if(document.getElementById(obj_id)){
		return (document.getElementById(obj_id).value);
	}
}

DBTreeView.prototype.getId = function(){
	if(this.selected_id > 0){
		return this.selected_id;
	}	
}

