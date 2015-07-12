function wopen(url) {
	var a
	var b
	var url
	vidWindowWidth=700;
	vidWindowHeight=600;
	a=(screen.height-vidWindowHeight)/5;
	b=(screen.width-vidWindowWidth)/2;
	features="top="+a+",left="+b+",width="+vidWindowWidth+",height="+vidWindowHeight+",toolbar=no,menubar=no,location=no,directories=no,scrollbars=no,resizable=no";
	window.open(url,'',features,true);
}

//this function need for correct work DBTable component. The function is for adding css style.
function addCss(cssCode) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssCode;
	} else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}

//this function is added rule in css stylesheet.
function addNewRule(classname,cssrule) {
	var sheet = document.styleSheets[0];
	if (sheet.insertRule) {   // all browsers, except IE before version 9
		var s1 = classname + "{" + cssrule + "}";
		sheet.insertRule (s1, 0);
	} else {  // Internet Explorer before version 9
		if (sheet.addRule) {
			sheet.addRule (classname, cssrule, 0);
		}
	}
}

// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) {
	return LTrim(RTrim(value));
}

//access to elements inside iframe
function iframeRef( frameRef ) {
    return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument
}

//set cookie
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

//get cookie
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}

function isValueInArray(arr, val) {
    var inArray = false;
    for (var i = 0; i < arr.length; i++) {
		if (val == arr[i]) {
			inArray = true;
			return inArray;
		}	
    }
}	

function  getRootDirectory(){
	var path = location.pathname;
	var arr = path.split("/");
	for(var i=0; i < arr.length; i++) {
		if (trim(arr[i]) != '') {
			return arr[i];
		}
	}
	return path;
}

function isNumberKey(evt){
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  if ((key < 48 || key > 57) && !(key == 8 || key == 9 || key == 13 || key == 37 || key == 39 || key == 46) ){
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}