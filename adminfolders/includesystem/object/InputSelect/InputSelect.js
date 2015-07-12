InputSelect = function(container_id,id){
	/*properties*/
	this.container_id  = container_id;
	this.id  = id;  	//the unique identificator  of the object
	this.size = "";  	//the unique identificator  of the object
}

InputSelect.prototype.Create = function(){
	var id = this.id;
	var value = this.value;
	

	var str_element = "<table border=0 cellspacing=0 cellpadding=0><tr><td>";
	str_element+= "<input ";
	if(this.disabled){
		str_element+= "disabled ";
        str_element+= " style='background-color:#eae9e9;' ";
	}
	if(this.size){
		str_element+= "size='" + this.size + "' ";
	}
	str_element+= "id='" + id + "' class='dbtable_input_text' style='font-size:1em;' type='text' value='" + value + "'></td>";
    
    if(this.partial_search === true){
        str_element+= "<td valign='middle' style='padding-left:2px;'><img class='inputselect_image' hspace='0' id='select_img_" + this.id + "' src='../../../adminfolders/includesystem/images/search.png'";
        if(this.onPartialSearch){
            str_element+= " onclick='return " + this.onPartialSearch + ";'";
        }
        str_element+= "></td>";
    }
    
	str_element+= "<td valign='middle' style='padding-left:2px;'><img class='inputselect_image' hspace='0' id='select_img_" + this.id + "' src='../../../adminfolders/includesystem/images/catalog.png'";
	if(this.onSelect){
		str_element+= " onclick='return " + this.onSelect + ";'";
	}
	str_element+= "></td><td valign='middle'><img class='inputselect_image' hspace='1' id='clear_img_" + this.id + "' src='../../../adminfolders/includesystem/images/clear.png'";
	if(this.onClear){
		str_element+= " onclick='return " + this.onClear + ";'";
	}	
	str_element+= "></td></tr></table>";
	document.getElementById(this.container_id).innerHTML = str_element; 
}

