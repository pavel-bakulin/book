function doerror() {alert("��������� ������ ��������� ������� JavaScript!");}
window.onerror=doerror;
//������ �� �����������
document.ondragstart=test;
//������ �� ���������
document.onselectstart=test;
//������ �� ��������� ������������ ����
document.ontextmenu=test;
function test() {return false;}