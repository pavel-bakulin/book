DBTable_param = {};

DBTable = function(id){
	document.writeln("<table cellpadding='0' cellspacing='0' border='0'><tr><td>");
	document.writeln("<div id='div_search_"+id+"'></div>");	  
	document.writeln("</td></tr><tr><td>");
	document.writeln("<div id='div_"+id+"'>Загрузка...</div>");	
	document.writeln("</td></tr><tr><td>");
	document.writeln("<div id='div_paginator_"+id+"' style='padding-top:7px;padding-bottom:2px;'></div>");	
	document.writeln("</td></tr>");
  	document.writeln("</table>");
	/*
	properties
	*/
	this.id  = id;  	       			//the unique identificator  of the object
	this.sql_file = '';					//the sql request
	this.column = '';					//the json string for transmission to the php script. In the file this parametr is used for css set up.
	this.sql_start = 1;					//the start value is used for set up the value of the paginator.
	this.search = 1;					//visible or not the search input box, default visible
	this.fields_for_search = '';		//the fields list for searching. This property requires turn on of the search property.
	this.field_for_search = '';			//the current field for searching.
	this.select_for_search_width = '';	//set up select width
	this.selected_row = "";				//???
	this.selected_id  = ""; 	  		//this property consist id. the first value selected the row.
	this.sort_direction  = 1;			//set up default sorting (DESC=1 or ASC=0) in the sql
	this.sort_field  = "";				//the starting field for sorting
	this.search_text = "";				//the starting value text for searching
	this.show_total = 0;				//show all record. The count records is shown in the down table.
	this.table_layout = 0;				//setup the css property "table-layout"
	this.line_height = "";				//setup "line-height" is the css property
	this.font_size = "";				//setup "font_size" is the css property
	this.param = "";					//the additional params is send in the request
	this.color_caption = "";	    	//setup color of the caption
	this.color_caption_select = "";		//the color caption setup what is selected for sorting
    this.fixed_width = "";              //setup fixed width for table
    this.fixed_height = "";             //setup fixed width for table
	
	/*
	methods
	getId() -				the method is returned current id (the value of the first column in the selected row)
	getCurrentPage() -		the method is returned the current page of the peginator
	getCellHtml(tr,td) -	the method is returned html from cell of table
	getCellText(tr,td) -	the method is returned text from cell of table
    setCellHtml(tr,td,s) -	the method is set up text to cell of table
	getSelectedRow() -		the method is returned the selected row 
	*/
}

DBTable.prototype.Create = function(sql_start){
	var id = this.id;
	document.getElementById("div_" + id).innerHTML = "<div style='height:70px;width:400px;border:1px solid #727272;text-align:center;background-color:#E5E5E5;padding-top:25px;'>Загрузка...</div>";

	var source = this.source;
	var paginator = this.Paginator;
	var paginator_count = this.paginator_count;
	var sql_limit = this.sql_limit;
	var show_total = this.show_total;
  
	this.selected_row = "";
	this.selected_id  = "";
  
	if(this.onCreate){
		this.onCreate();
	}
  
	if(!sql_start){ 
		sql_start = 1;
	}
	this.sql_start = sql_start;
 
	document.getElementById("div_"+id).Param = this;
  
	/*
	We must to perform parsing the json string "column" for adding css rules
	For parsing is used json2.js including two methods JSON.parse(),JSON.stringify() 
	*/
    var column_object = JSON.parse(this.column);

	var column_object_new = new Object();
	var object_local_1 = new Object();
	var css_style_flag = false;
	var s_css = "";
	for(var key1 in column_object) {
		object_local_1 = column_object[key1];
	    if(typeof(object_local_1) == "object"){
			for(var key2 in object_local_1) {
				if(key2=="css_style"){
					css_style_flag = true;
					s_css+= ".class_" + this.id + "_" + key1 + "{" + object_local_1[key2] + "}";
				} 
			}
			if(css_style_flag == true){
				delete object_local_1["css_style"];
			}	
		}
		column_object_new[key1] = object_local_1;
	}
	addCss(s_css);
	
	/*
	the code must to follow after JSON.parse(this.column);
	*/
	var text_search;
	text_search = "<table border=0 cellspacing=0 cellpadding=0><tr>";
	if(parseInt(this.search)==1){
		/*
		the fields list for searching is parsed
		*/
		if(this.fields_for_search.length > 0){
			text_search += "<td><select class='dbtable_select_text' id='"+id+"_field_search' style='";
			if(this.select_for_search_width){
				text_search += "width:" + this.select_for_search_width+";";
			}
			if(this.font_size){
				text_search += "font-size:" + this.font_size+";";
			}
			text_search += "'>";
			for (var i = 0; i < this.fields_for_search.length; i++) {
				text_search += "<option value='" + this.fields_for_search[i] + "'";
				if(this.field_for_search == this.fields_for_search[i]){
					text_search += "selected";
				}
				text_search += ">" + column_object[this.fields_for_search[i]].caption + "</option>";
			}
			text_search += "</select></td>"; 
			
		}
	
		text_search += "<td>"
		text_search += "<input size='20' id='"+id+"_input_search' class='dbtable_input_text' type='text' value=''></td>";
		text_search += "<td valign='middle' class='dbtable_image' style='padding-left:3px;'><img src='../../../adminfolders/includesystem/images/search.png' hspace=0 id='"+id+"_search' onclick='return DBTable_param.dbtable_search(\""+id+"\");'>";
		text_search += "<img class='dbtable_image' src='../../../adminfolders/includesystem/images/clear.png' hspace=1 id='"+id+"_cancel' onclick='return DBTable_param.dbtable_cancel(\""+id+"\");'>";		
		//text_search += "<input id='"+id+"_search' class='dbtable_input_button' type='button' onclick='return DBTable_param.dbtable_search(\""+id+"\");' value='F'>";
		//text_search += "<input id='"+id+"_cancel' class='dbtable_input_button' onclick='return DBTable_param.dbtable_cancel(\""+id+"\");' type='button' value='C'>";
		text_search += 	"</tr></table>";
		document.getElementById("div_search_"+id).innerHTML = text_search;
		document.getElementById("div_search_"+id).style.marginBottom = "3px";
		if(this.search_text){
			document.getElementById(id + "_input_search").value = this.search_text;
		}
		//adding new css rule. The common.js file need include before this method calling
		if(this.font_size){
			addNewRule(".dbtable_input_text","font-size:" + this.font_size);
			addNewRule(".dbtable_input_button","font-size:" + this.font_size);
		}
	}	
		
	var param = "sql_file=" + encodeURIComponent(this.sql_file) + "&id=" + id + "&column=" + encodeURIComponent(JSON.stringify(column_object_new));
		param+= "&sql_limit=" + sql_limit + "&sql_start=" + sql_start;

	if(this.search_text){
		param+= "&search_text=" + encodeURIComponent(this.search_text);
	}
	if(this.field_for_search){
		param+= "&field_for_search=" + encodeURIComponent(this.field_for_search);
	}
	if(this.sort_field){
		param+= "&sort_field=" + this.sort_field + "&sort_direction=" + this.sort_direction;
	}
	if(parseInt(this.fixed_row)==1){
		param+= "&fixed_row=1";
	}
  
	if(parseInt(this.table_layout)==1){
		param+= "&table_layout=1";
	}
	
	if(this.line_height){
		param+= "&line_height=" + encodeURIComponent(this.line_height);
	}
	
	if(this.font_size){
		param+= "&font_size=" + encodeURIComponent(this.font_size);
	}
	
	if(this.color_caption){
		param+= "&color_caption=" + encodeURIComponent(this.color_caption);
	}
	
	if(this.color_caption_select){
		param+= "&color_caption_select=" + encodeURIComponent(this.color_caption_select);
	}
  
    if(this.param){
		param+= "&" + this.param;
	}
  
    if(this.fixed_height){
        var fixed_height = this.fixed_height;
    }
    if(this.fixed_width){
        var fixed_width = this.fixed_width;
    }
    
	new ajax_connect('POST',source,param,
					function callback_access(ss){
                        if(fixed_height || fixed_width){
                            var s1 = "<div style='overflow:auto;";
                            if(fixed_height) s1+= "height:" + fixed_height + ";";
                            if(fixed_width) s1+= "width:" + fixed_width + ";";
                            s1+= "'";
                            ss = s1 + ss + "</div>";
                        }
						document.getElementById("div_"+id).innerHTML = ss;
						paginator(id,sql_start,sql_limit,paginator_count,show_total);
					},
					function callback_error(ss){alert(ss);});   
}

DBTable.prototype.Paginator = function(id,sql_start,sql_limit,paginator_count,show_total){
	var text_paginator = "";
	var all_record = parseInt(document.getElementById(id + "_all_record").value);
  
	var i =1;
	//next*****************************
	var show_previous = 1;  
	var show_next = 1;
  
	if(Math.ceil(sql_start/paginator_count)==1) {
		show_previous = 0;
		if(paginator_count>=Math.ceil(all_record/sql_limit)){
			show_next = 0;
			paginator_count = Math.ceil(all_record/sql_limit);
		}
	} else {  
		if(Math.ceil(sql_start/paginator_count)>1) {
			i = 1 + paginator_count* (Math.ceil(sql_start/paginator_count)-1);
			paginator_count = paginator_count* Math.ceil(sql_start/paginator_count);
			if(paginator_count>=Math.ceil(all_record/sql_limit)){
				show_next = 0;
				paginator_count = Math.ceil(all_record/sql_limit);
			}
		}
	}
  
 //*********************************
	if(show_previous==1){
		text_paginator += " <span id='" + id + "paginator_previouspage' onclick='return DBTable_param.firstpage(\""+id+"\");' class='paginator2' style='background-color:#D5D5FF'>&lt;&lt;</span>";
		text_paginator += " <span id='" + id + "paginator_previouspage' onclick='return DBTable_param.previouspage(\""+id+"\",this);' class='paginator1' style='background-color:#D5D5FF'>&lt;</span>";
	} 

	if(paginator_count>1){
		while(i<(paginator_count+1)){
			text_paginator += "<span id='" + id + "_paginator_" + i + "' onclick='return DBTable_param.openpage(\""+id+"\",this);' class='paginator' style='"
			if(i==sql_start){
				text_paginator += "background-color:#fda7b5;";
			} else {
				text_paginator += "background-color:#D5D5FF;";
			}	 
			text_paginator += "'>" + i + "</span>";	
			i++;
		}
	} 
  
  
	if(show_next==1){
		text_paginator += " <span id='" + id + "paginator_nextpage' onclick='return DBTable_param.nextpage(\""+id+"\",this);' class='paginator1' style='background-color:#D5D5FF'>&gt;</span>";
		text_paginator += " <span id='" + id + "paginator_lastpage' onclick='return DBTable_param.lastpage(\""+id+"\",this);' class='paginator2' style='background-color:#D5D5FF'>&gt;&gt;</span>";	 
	}
	if(show_total==1){
		text_paginator+= "<div style='font-size:9px;margin:1px;'>Всего записей:&nbsp;" + all_record + "&nbsp;&nbsp;Cтраниц:&nbsp;"+ Math.ceil(all_record/sql_limit) +"</div>"; 
	} 
	document.getElementById("div_paginator_" + id).innerHTML = text_paginator;
}

DBTable_param.dbtable_search = function (id){
	var s = document.getElementById(id + "_input_search").value;
	var ob = document.getElementById("div_"+id).Param;
	if(s==""){
		ob.search_text = "";
		DBTable_param.dbtable_cancel(id);
		return 0;
	}
	if(document.getElementById(id+"_field_search")){
		ob.field_for_search = document.getElementById(id+"_field_search").value;
	}
	ob.search_text = s;
	ob.Create();
}

DBTable_param.dbtable_cancel = function (id){
	var ob = document.getElementById("div_"+id).Param;
	ob.search_text = "";
	ob.selected_id  = "";
	ob.sort_field = ""; 
	ob.Create();
}

DBTable_param.openpage = function(id,obj){
	var ob = document.getElementById("div_"+id).Param;
	var sql_start = parseInt(obj.innerHTML);
	ob.Create(sql_start);
}

DBTable_param.nextpage = function(id,obj){
	var ob = document.getElementById("div_"+id).Param;
	var paginator_count = ob.paginator_count;
	var sql_start = ob.sql_start;
	var next_pos = 1 + paginator_count* Math.ceil(sql_start/paginator_count);
	ob.Create(next_pos);
}

DBTable_param.lastpage = function(id,obj){
	var ob = document.getElementById("div_"+id).Param;
	var all_record = parseInt(document.getElementById(id + "_all_record").value);
	var paginator_count = ob.paginator_count;
	var sql_limit = ob.sql_limit;
	var last_pos = 1 + paginator_count*(Math.ceil(Math.ceil(all_record/sql_limit)/paginator_count)-1);
	ob.Create(last_pos);
}

DBTable_param.previouspage = function(id,obj){
	var ob = document.getElementById("div_"+id).Param;
	var paginator_count = ob.paginator_count;
	var sql_start = ob.sql_start;
	var previous_pos = 1 + paginator_count* (Math.ceil(sql_start/paginator_count)-2);
	ob.Create(previous_pos);
}

DBTable_param.firstpage = function(id){
	var ob = document.getElementById("div_"+id).Param;
	ob.Create(1);
}

DBTable_param.on_click = function(obj){
	obj.style.backgroundColor='#FD6877';
	var s = obj.id;
	var arr = s.split("_");
	var id = arr[0];
	var row = arr[1].substring(2);
	var sel_row = id+"_tr"+row; 
	
	var ob = document.getElementById("div_"+id).Param;
	if(ob.selected_row&&ob.selected_row!=sel_row){
		if(document.getElementById(ob.selected_row)){
			document.getElementById(ob.selected_row).style.backgroundColor='#FFFFFF';
		}
	}
	
	if(document.getElementById(sel_row+"_td0")){
		var id_sel = parseInt(document.getElementById(sel_row+"_td0").innerHTML);
		ob.selected_row  = sel_row;
		ob.selected_id = id_sel;
		if(ob.onselectid&&parseInt(row)!=0){
			ob.onselectid();
		}
	}	
}

DBTable_param.mouse_move = function(obj){
	col=obj.style.backgroundColor;col=col.toUpperCase();
	if(col.substr(0,3)=='RGB'){if(col!='RGB(253, 104, 119)'){obj.style.backgroundColor='#FFC6DB';}}else{if(col!='#FD6877'){obj.style.backgroundColor='#FFC6DB';}}
}

DBTable_param.mouse_out = function(obj){
	col=obj.style.backgroundColor;col=col.toUpperCase();
	if(col.substr(0,3)=='RGB'){if(col!='RGB(253, 104, 119)'){obj.style.backgroundColor='#FFFFFF';}}else{if(col!='#FD6877'){obj.style.backgroundColor='#FFFFFF';}}
}

DBTable_param.sort_field = function(id,field,obj){
	var ob = document.getElementById("div_"+id).Param;
	if(ob.sort_field==field){
		if(ob.sort_direction=="1"){
			ob.sort_direction = "0";
		} else {
			ob.sort_direction = "1";
		}
	}
	if(ob.sort_field!=field){
		ob.sort_direction = "1";
	}
	ob.sort_field = field; 
	ob.Create(); 
}

DBTable.prototype.getId = function(){
	if(this.selected_id > 0){
		return this.selected_id;
	}	
}

DBTable.prototype.getCurrentPage = function(){
	if(this.sql_start > 0){
		return this.sql_start;
	}	
}

DBTable.prototype.getSelectedRow = function(){
	if(this.selected_row){
		var arr = this.selected_row.split("_");
		return arr[1].substring(2);
	} else {
		return false;
	}
}

DBTable.prototype.getCellHtml = function(tr,td){
    var obj_id = this.id + '_tr' + tr + '_td' + td;
	if(parseInt(tr) > 0 && parseInt(td) > 0 && document.getElementById(obj_id)){
		return document.getElementById(obj_id).innerHTML;
	}
}

DBTable.prototype.getCellText = function(tr,td){
	var obj_id = this.id + '_tr' + tr + '_td' + td;
	if(parseInt(tr) > 0 && parseInt(td) > 0 && document.getElementById(obj_id)){
		return (document.getElementById(obj_id).textContent || document.getElementById(obj_id).innerText);
	}
}

DBTable.prototype.setCellHtml = function(tr,td,s){
	var obj_id = this.id + '_tr' + tr + '_td' + td;
	if(parseInt(tr) > 0 && parseInt(td) > 0 && document.getElementById(obj_id)){
        document.getElementById(obj_id).innerHTML = s;
	}
}

