ajax_connect = function(method,url,param,callback_access,callback_error){
	this.onload(method,url,param,callback_access,callback_error); 
}

ajax_connect.prototype.onload = function(method,url,param,callback_access,callback_error){
	var req;
	if (window.XMLHttpRequest){
		req = new XMLHttpRequest();
	}
	if (window.ActiveXObject){
		req = new ActiveXObject('Microsoft.XMLHTTP'); 
		if (!req){
			req = new ActiveXObject('Msxml2.XMLHTTP')
		}
	}
 
	if (req) {
		req.onreadystatechange = function(){
		if (req.readyState == 4){
			if (req.status == 200) {
				callback_access(req.responseText);
			} else { 
				callback_error('Erorr ajax! '+ req.statusText);
			}
		}
	}
	if(method == 'POST'){
		req.open('POST',url,true);
	} else {
		req.open('GET',url,true);
	}

	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.send(param);
	}
}

