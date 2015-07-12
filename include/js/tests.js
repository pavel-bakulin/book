/*$(function() {
 onLoadHandler();
});
*/

var quest_types = new Array();
var ng_col_otvetov = new Array();

function sizesCalculate() {
  // вычисляем размеры экрана для позиционирования элементов
  cl_w=document.body.clientWidth;
  cl_h=document.body.clientHeight;//screen.availHeight;
  cl_ww=cl_w/100;
  cl_hh=cl_h/100;
  if(screen.Height<1024){k_f=1.7062-0.0007*screen.Height;} else {k_f=1;}
}

//is_IE();
is_COOK();

//if (!navigator.cookieEnabled) {window.location.replace("test_not_COOK.html");}

function inner_Text(n,s){
 if(element(n).innerText){element(n).innerText=s;} 
// if(element(n).textContent){element(n).textContent=s;}
}

function test() {
event.cancelBubble=true;
event.returnValue=false;
return false;}

//запрет на копирование
document.ondragstart=test;
//запрет на выделение
document.onselectstart=test;
//запрет на выделение контекстного меню
document.ontextmenu=test;  //запрет на перемещение//self.ondragstart=test;


//запрет нажатия клавиш
function  key() {
/*  event.keyCode=27;
  event.returnValue=false;
  event.cancelBubble=false;
  if (event.ctrlKey && event.keyCode==82) {document.body.onbeforeunload = null;}
*/  
  return false;
}

document.onkeydown=key;
//*****************************
window.document.onhelp=test;
window.document.onselection=test;
//*****************************
window.status="Тесты ON-LINE";
//*****************************
var no_resize_s=false;
function no_resize(){
if(screen.Width){
if (!no_resize_s) {alert("Запрещено изменять размер окна!");no_resize_s=true;}
window.moveTo(0,0);window.resizeTo(screen.Width,screen.Height);
}}
window.onresize=no_resize;

function ins_rule(s1,s2){if(document.styleSheets[0].insertRule){document.styleSheets[0].insertRule(s1+" {"+s2+"}",0);}else{document.styleSheets[0].addRule(s1,s2);}}

var unload_p=true;
function doUnload() {
if(unload_p) {
  mes="";
  if (connection_fault_count >= 3) {
    mes="Нет соединения с Интернет\n. Результаты тестирования сохранены по " + col_otvetov + " вопросов.\nПосле восстановления связи ответьте на оставшиеся вопросы теста, после чего он будет считаться пройденнным.";
    element("butt_w1_2").style.display="none";
    alert(mes);  
  }
  else {
    if (col_otvetov!=col_list) {
      mes="Вы ответили не на все вопросы теста.\nРезультаты сохранены для " + col_otvetov + " вопросов.";
      alert(mes);
    }
    else {
      mes="Вы ответили на все вопросы теста.\n";
      alert(mes);
      keep_result(1);      
    }
  }
}
//if (unload_p) {return "ВСЕ ДАННЫЕ БУДУТ ПОТЕРЯНЫ!!! ТЕСТ БУДЕТ СЧИТАТЬСЯ ПРОЙДЕННЫМ!"}
}

function notmenu() {
//window.event.returnValue=false;
  return false;
}

var proverka=false;
var instruk_timer=true;
//закрытие окна
function window_close(){
  //проверка на все вопросы ответили или нет
  mes="";
  if (connection_fault_count >= 3) {
    mes="Нет соединения с Интернет<br/>. Результаты тестирования сохранены по " + col_otvetov + " вопросов.";
    element("butt_w1_2").style.display="none";  
  }
  else {
    if (col_otvetov!=col_list) {
      mes="Вы ответили не на все вопросы теста!!!<br>Все равно прервать тест?";
      mes="Вы ответили не на все вопросы теста.<br/>Результаты сохранены для " + col_otvetov + " вопросов.<br/>Все равно прервать тест?";
    }
    else {
      mes="Вы ответили на все вопросы теста!!!<br>Закончить тестирование?";
    }
  }
  s="<div id='div_win_out_1' class='div_out_inst'>";
  s=s+"<div class='line'><table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td style='color:#FFFFFF;font-size:15px' width='80%'>&nbsp;&nbsp;Сообщение</td>";
  s=s+"<td align='right'><img id='close_pic' src='/include/images/close.gif' style='cursor:hand;cursor:pointer' onClick='close_mes();'></td></tr></table></div>";
  s=s+"<table width='100%' id='tab_win_in_1' border='0' cellpadding='0' cellspacing='0'><tr><td id='td_win_in_1' valign='middle'>";
  
  if(col_otvetov!=col_list){
    s=s+"<img id='img_win_1' align='center' src='/include/images/vnim.gif'>";
  }
  s=s+"</td><td valign='middle' id='td_win_in_2' style='font-weight:bold'>"+mes+"</td></tr></table>";
  s=s+"<div style='text-align:center'><input id='butt_w1_1' type='button' onClick='this.disabled=true;unload_p=false;keep_result(1);' value='Да'>&nbsp;&nbsp;&nbsp;<input id='butt_w1_2' type='button' onClick='close_mes();' value='Нет'></div>";
  s=s+"</div>";
  element("td_loading").innerHTML=s;
  element("tab_loading").style.display="";
  element("div_win_out_1").style.width=Math.round(35*cl_ww);
  element("div_win_out_1").style.height=Math.round(23*cl_hh);
  element("div_win_out_1").style.paddingBottom=Math.round(1.5*cl_hh);
  element("tab_win_in_1").style.height=Math.round(12*cl_hh);
  element("tab_win_in_1").style.marginBottom=Math.round(3*cl_hh);
  element("td_win_in_1").style.paddingLeft=Math.round(1*cl_ww);
  element("td_win_in_2").style.fontSize=Math.ceil(k_f*1.8*cl_hh);
  if(col_otvetov!=col_list){element("img_win_1").style.marginRight=Math.round(1.5*cl_hh);element("td_win_in_1").style.width=Math.round(5*cl_ww);}
  else{element("td_win_in_1").style.width=Math.round(1*cl_ww);}
  element("butt_w1_1").style.width=Math.round(9*cl_hh);
  element("butt_w1_2").style.width=Math.round(9*cl_hh);
}

// форма инструкция
function show_instr(){
s="<div id='div_inst_out' class='div_out_inst'>";
s=s+"<div class='line'><table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td style='color:#FFFFFF;font-size:15px' width='80%'>&nbsp;&nbsp;Инструкция</td>";
s=s+"<td align='right'><img id='close_pic' src='/include/images/close.gif' style='cursor:hand;cursor:pointer' onClick='close_inst();'></td></tr></table></div>";
s=s+"<div id='div_inst_in' class='div_inst_text'>"+php_explain_test+"</div>";
s=s+"<div style='text-align:center'><input id='butt_inst' type='button' onClick='close_inst();' value='Закрыть'></div>";
s=s+"</div>";
element("td_loading").innerHTML=s;
element("tab_loading").style.display="";
element("div_inst_out").style.width=Math.round(50*cl_ww);
element("div_inst_out").style.paddingBottom=Math.round(1.5*cl_hh);
element("div_inst_in").style.marginTop=Math.round(1.5*cl_hh);
element("div_inst_in").style.marginBottom=Math.round(1.5*cl_hh);
element("div_inst_in").style.padding=Math.round(1.5*cl_hh);
element("div_inst_in").style.width=Math.round(50*cl_ww)-Math.round(3*cl_hh);
element("div_inst_in").style.fontSize=Math.ceil(k_f*1.5*cl_hh);
element("butt_inst").style.width=Math.round(12*cl_hh);
element("butt_inst").style.fontSize=Math.ceil(k_f*1.5*cl_hh);
element("div_inst_in").style.height=Math.round(50*cl_hh);
}
function close_inst(){
  element("tab_loading").style.display="none";
  if (instruk_timer && php_time_min && !test_mode){
    start_time();
  } 
  instruk_timer=false;
}

function close_mes(){element("tab_loading").style.display="none";if(col_otvetov==col_list){proverka=true;}}

function explode( delimiter, string ) {	// Split a string by string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: kenneth
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var emptyArray = { 0: '' };

	if ( arguments.length != 2
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined' )
	{
		return null;
	}

	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null )
	{
		return false;
	}

	if ( typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object' )
	{
		return emptyArray;
	}

	if ( delimiter === true ) {
		delimiter = '1';
	}

	return string.toString().split ( delimiter.toString() );
}

function show_right_otvet() {
  var sel_sbrosheno = false;
  answers_str = ng_answers[nom_vopr];
  var answers = new Array();
  answers = answers_str.toString().split( "||" );  
  
  for(var a_id in answers) {         
    for (q = 1; q<=ng_col_otvetov[nom_vopr]; q++) {
      if (element("td_var_ans_"+nom_vopr+"_"+q)) {
        if ((element("td_var_ans_"+nom_vopr+"_"+q).innerText == answers[a_id]) || (element("td_var_ans_"+nom_vopr+"_"+q).textContent == answers[a_id])) {
          if (quest_types[nom_vopr] == 0)        
            rad_v(nom_vopr, q, ng_col_otvetov[nom_vopr]);
          else {
            if (!sel_sbrosheno) {
              sel_v_sbros(nom_vopr, ng_col_otvetov[nom_vopr]); 
              sel_sbrosheno = true;
            }
            selno_v(nom_vopr, q, ng_col_otvetov[nom_vopr]);
          }
        }
      }
    }
  }
}

























