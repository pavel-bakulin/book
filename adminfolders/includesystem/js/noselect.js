function doerror() {alert("Произошла ошибка выпонения скрипта JavaScript!");}
window.onerror=doerror;
//запрет на копирование
document.ondragstart=test;
//запрет на выделение
document.onselectstart=test;
//запрет на выделение контекстного меню
document.ontextmenu=test;
function test() {return false;}