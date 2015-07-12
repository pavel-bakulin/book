function type_braus(){
var res;
if (navigator.userAgent.indexOf("MSIE")!=-1) {res=true;} else {res=false;}
//if (document.all) {res=true;} else {res=false;}
//if (document.styleSheets) {res=true;} else {res=false;}
return res;
}

function is_IE(){
b=type_braus();
if (b==false){
window.location.replace("test_not_IE.html");
}
}

function is_COOK(){
if (!navigator.cookieEnabled) {window.location.replace("test_not_COOK.html");}
}