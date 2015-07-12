<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="ru" xml:lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>&lt;!--{cke_protected}<?php echo $title;?>--&gt;</title>
	<meta content="<?php echo $description;?>" name="description" />
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
	<link href="../../../include/css/common.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/menu_assets/styles.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/jquery/redmond/jquery-ui-1.10.3.custom.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/slider/responsiveslides.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/slider/demo.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/search.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/zoomer/zoom.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/object/DBTable/DBTable.css" rel="stylesheet" type="text/css" /><script language="javascript" src="../../../include/js/jquery/jquery-1.9.1.js"></script><script language="javascript" src="../../../include/js/jquery/jquery.cookie.js"></script><script language="javascript" src="../../../include/js/jquery/jquery-ui-1.10.3.custom.js"></script><script language="javascript" src="../../../include/js/slider/responsiveslides.min.js"></script><script language="javascript" src='../../../include/js/zoomer/jquery.elevatezoom.js'></script><script language="javascript" src='../../../include/js/carusel/lemmon-slider.js'></script><script language="javascript" src="../../../include/js/json2.js"></script><script language="javascript" src="../../../include/js/ajax.js"></script><script language="javascript" src="../../../include/js/common.js"></script><script language="javascript" src="../../../include/object/DBTable/DBTable.js"></script><script language="javascript" src="../../../include/js/jquery.lazyload.min.js"></script>
</head>
<body><script type="text/javascript">
$(function () {
    $("#searchWord").blur(function() {
        if($("#searchWord" ).val() == ""){
            $( "#searchWord" ).val("Поиск");
        }
    });

    $("#searchWord").focus(function() {
        if($("#searchWord" ).val() == "Поиск"){
            $( "#searchWord" ).val("");
        }
    });  
    
    $("#searchWord").focus(function() {
        if($("#searchWord" ).val() == "Поиск"){
            $( "#searchWord" ).val("");
        }
    }); 
    
    $("#searchWord").keypress(function(e) {
        if(e.which == 13) {
            search();
        }
    });    
    
});

function search(){
    if($("#searchWord" ).val() == "Поиск"){
        alert("Укажите критерий поиска");
        $( "#searchWord" ).focus();
        return false;
    }
    var searchWord = $.trim($("#searchWord").val());
    location.replace("<?php echo $currentUrl;?>search?searchWord=" + encodeURIComponent(searchWord));
}

function userexit(){
    $.ajax({
		url: "<?php echo $currentUrl;?>registration/exit?separate=1",
            global: false,
            dataType: "html",
            success: function(ss){
          		switch(parseInt(ss)) {
                    case 1:
                        location.replace("<?php echo $_SERVER['REQUEST_URI'];?>");
                        break;
                    default:
                        alert("Ошибка выхода!");
				}
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
    }).responseText;  
}
</script>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tbody>
		<tr>
			<td align="center">
			<div style="width:1027px;border:1px solid #f3f3f3;">
			<div style="width:1025px;border:1px solid #f0f0f0;">
			<div style="border:1px solid #e7e7e7;padding:24px 24px 0px 24px;background-color:#ffffff;">
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
				<tbody>
					<tr>
						<td style="padding-bottom:24px;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr>
									<td align="left" valign="middle"><?php require_once("info/header.html");?></td>
									<td align="right" style="text-align:right;" valign="middle" width="187px">
									<table border="0" cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr>
												<td align="left" style="padding-bottom:10px;text-align:left;padding-left:3px;"><?php
					if((int)$_SESSION["session_user_id"] >0){
	                    $sql_b = "SELECT count(id) as col FROM user_reserve WHERE user_id=" . (int)$_SESSION["session_user_id"];
						$res_b = $base->select_sql($sql_b);
                        echo "<div style='width:230px;text-align:right;vertical-align:middle;'>";   
                        echo "<a title='Заказы' class='a_link_enter' href='" . $currentUrl . "userreserve'><span style='font-size:1em;padding-right:7px;'>";
                        echo "<img hspace=0 vspace=0 align='top' border=0 src='" . $currentUrl . "include/images/basket.png'>&nbsp;(&nbsp;<span id='basket'>".(int)$res_b[0]->col."</span>&nbsp;)&nbsp;</span></a>";
						echo "<span class='user_name_css'>" . $user . "</span><a href='javascript:userexit();' class='a_link_enter'>Выход</a>";
                        echo "</div>";
					} else {
						echo "<a href=" . $currentUrl . "enter class='a_link_enter'>Вход и регистрация</a>";
					}
					?></td>
											</tr>
											<tr>
												<td align="right" valign="top"><input class="searchString" id="searchWord" name="searchWord" tabindex="1" type="text" value="<?php if(trim($_GET['searchWord'])){echo htmlspecialchars($_GET['searchWord'],ENT_QUOTES);} else {echo "Поиск";}?>" /><input class="searchGo" id="input_search" onclick="return search();" type="submit" /></td>
											</tr>
										</tbody>
									</table>
									</td>
								</tr>
							</tbody>
						</table>
						</td>
					</tr>
					<tr>
						<td><!---start menu--->
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr>
									<td>
									<div class="cssmenu">
									<ul><?php
echo $menu_drop_down;
?>
									</ul>
									</div>
									</td>
									<td align="right">
									<div style="text-align:right;"><span><a class="a_link" href="/shopslist">Список магазинов</a></span><span style="margin-left:12px;"><a class="a_link" href="/vacancy">Трудоустройство</a></span></div>
									</td>
								</tr>
							</tbody>
						</table>
						<!---end menu---></td>
					</tr>
					<!--navigation panel--><?php
//case for search
if(strcmp($currentPage,"search")==0){
    $str_navigation = "<a href='#' class='navigation_menu_select'>Результаты поиска</a>";
}

if(strcmp($str_navigation,"") !=0 ){
    echo "<tr><td align='left' id='navigation_menu' style='padding-left:8px;'>";
    echo "<a class='navigation_menu' href='" . $currentUrl . "'>Главная</a>&nbsp;/&nbsp;" . $str_navigation;
    echo "</td></tr>";
}    
?><!--end navigation panel-->
					<tr>
						<td align="left" style="padding-top:10px;"><!---main text---><?php
//insert page
if($incl_file && $incl_file!=-1){
    include $incl_file;
} else {
    if($incl_file!=-1){
        echo "<br><div class='div_error'>Ошибка! Страница не найдена!</div><br>";
    }
} 
if($incl_file==-1){
?><script type="text/javascript">
    // You can also use "$(window).load(function() {"
    $(function () {
        // Slideshow 1
        $("#slider1").responsiveSlides({
            auto: true,
            pager: false,
            nav: true,
            speed: 700,
            namespace: "callbacks"
        });
    });
</script><?php
    include  INFO . "/slider.html";
    include  INFO . "/main.php";
}
?><!---main end---></td>
					</tr>
					<tr>
						<td style="height:184px;padding-top:16px;">
						<div style="height:184px;background-image: url(../../info/images/footer/footer.gif);background-repeat:repeat-x;padding-top:24px;">
						<div style="text-align:center;"><a href="/"><img border="0" src="../../info/images/footer/logo.png" /></a></div>

						<div style="text-align:center;margin-top:15px;"><a class="a_link_footer" href="/about">О Tom Tailer</a> <a class="a_link_footer" href="/jeans">Джинсы</a> <a class="a_link_footer" href="/forman">Мужчинам</a> <a class="a_link_footer" href="/forwoman">Женщинам</a> <a class="a_link_footer" href="/action">Акции</a> <a class="a_link_footer" href="/sale">Sale</a> <a class="a_link_footer" href="/contacts">Контакты</a> <a class="a_link_footer" href="/shopslist">Список магазинов</a> <a class="a_link_footer" href="/vacancy">Трудоустройство</a></div>

						<div style="text-align:center;margin-top:15px;"><a class="a_link_footer" href="http://www.facebook.com"><img border="0" src="../../info/images/footer/f.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/t.png" /></a> <a class="a_link_footer" href="http://vk.com"><img border="0" src="../../info/images/footer/v.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/y.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/g.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/o.png" /></a></div>
						</div>
						</td>
					</tr>
				</tbody>
			</table>
			</div>
			</div>
			</div>
			</td>
		</tr>
	</tbody>
</table>
<?php
unset($base);
?></body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="ru" xml:lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>&lt;!--{cke_protected}<?php echo $title;?>--&gt;</title>
	<meta content="<?php echo $description;?>" name="description" />
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
	<link href="../../../include/css/common.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/menu_assets/styles.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/jquery/redmond/jquery-ui-1.10.3.custom.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/slider/responsiveslides.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/slider/demo.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/search.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/css/zoomer/zoom.css" rel="stylesheet" type="text/css" />
	<link href="../../../include/object/DBTable/DBTable.css" rel="stylesheet" type="text/css" /><script language="javascript" src="../../../include/js/jquery/jquery-1.9.1.js"></script><script language="javascript" src="../../../include/js/jquery/jquery.cookie.js"></script><script language="javascript" src="../../../include/js/jquery/jquery-ui-1.10.3.custom.js"></script><script language="javascript" src="../../../include/js/slider/responsiveslides.min.js"></script><script language="javascript" src='../../../include/js/zoomer/jquery.elevatezoom.js'></script><script language="javascript" src='../../../include/js/carusel/lemmon-slider.js'></script><script language="javascript" src="../../../include/js/json2.js"></script><script language="javascript" src="../../../include/js/ajax.js"></script><script language="javascript" src="../../../include/js/common.js"></script><script language="javascript" src="../../../include/object/DBTable/DBTable.js"></script><script language="javascript" src="../../../include/js/jquery.lazyload.min.js"></script>
</head>
<body><script type="text/javascript">
$(function () {
    $("#searchWord").blur(function() {
        if($("#searchWord" ).val() == ""){
            $( "#searchWord" ).val("Поиск");
        }
    });

    $("#searchWord").focus(function() {
        if($("#searchWord" ).val() == "Поиск"){
            $( "#searchWord" ).val("");
        }
    });  
    
    $("#searchWord").focus(function() {
        if($("#searchWord" ).val() == "Поиск"){
            $( "#searchWord" ).val("");
        }
    }); 
    
    $("#searchWord").keypress(function(e) {
        if(e.which == 13) {
            search();
        }
    });    
    
});

function search(){
    if($("#searchWord" ).val() == "Поиск"){
        alert("Укажите критерий поиска");
        $( "#searchWord" ).focus();
        return false;
    }
    var searchWord = $.trim($("#searchWord").val());
    location.replace("<?php echo $currentUrl;?>search?searchWord=" + encodeURIComponent(searchWord));
}

function userexit(){
    $.ajax({
		url: "<?php echo $currentUrl;?>registration/exit?separate=1",
            global: false,
            dataType: "html",
            success: function(ss){
          		switch(parseInt(ss)) {
                    case 1:
                        location.replace("<?php echo $_SERVER['REQUEST_URI'];?>");
                        break;
                    default:
                        alert("Ошибка выхода!");
				}
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
    }).responseText;  
}
</script>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tbody>
		<tr>
			<td align="center">
			<div style="width:1027px;border:1px solid #f3f3f3;">
			<div style="width:1025px;border:1px solid #f0f0f0;">
			<div style="border:1px solid #e7e7e7;padding:24px 24px 0px 24px;background-color:#ffffff;">
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
				<tbody>
					<tr>
						<td style="padding-bottom:24px;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr>
									<td align="left" valign="middle"><?php require_once("info/header.html");?></td>
									<td align="right" style="text-align:right;" valign="middle" width="187px">
									<table border="0" cellpadding="0" cellspacing="0" width="100%">
										<tbody>
											<tr>
												<td align="left" style="padding-bottom:10px;text-align:left;padding-left:3px;"><?php
					if((int)$_SESSION["session_user_id"] >0){
	                    $sql_b = "SELECT count(id) as col FROM user_reserve WHERE user_id=" . (int)$_SESSION["session_user_id"];
						$res_b = $base->select_sql($sql_b);
                        echo "<div style='width:230px;text-align:right;vertical-align:middle;'>";   
                        echo "<a title='Заказы' class='a_link_enter' href='" . $currentUrl . "userreserve'><span style='font-size:1em;padding-right:7px;'>";
                        echo "<img hspace=0 vspace=0 align='top' border=0 src='" . $currentUrl . "include/images/basket.png'>&nbsp;(&nbsp;<span id='basket'>".(int)$res_b[0]->col."</span>&nbsp;)&nbsp;</span></a>";
						echo "<span class='user_name_css'>" . $user . "</span><a href='javascript:userexit();' class='a_link_enter'>Выход</a>";
                        echo "</div>";
					} else {
						echo "<a href=" . $currentUrl . "enter class='a_link_enter'>Вход и регистрация</a>";
					}
					?></td>
											</tr>
											<tr>
												<td align="right" valign="top"><input class="searchString" id="searchWord" name="searchWord" tabindex="1" type="text" value="<?php if(trim($_GET['searchWord'])){echo htmlspecialchars($_GET['searchWord'],ENT_QUOTES);} else {echo "Поиск";}?>" /><input class="searchGo" id="input_search" onclick="return search();" type="submit" /></td>
											</tr>
										</tbody>
									</table>
									</td>
								</tr>
							</tbody>
						</table>
						</td>
					</tr>
					<tr>
						<td><!---start menu--->
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
							<tbody>
								<tr>
									<td>
									<div class="cssmenu">
									<ul><?php
echo $menu_drop_down;
?>
									</ul>
									</div>
									</td>
									<td align="right">
									<div style="text-align:right;"><span><a class="a_link" href="/shopslist">Список магазинов</a></span><span style="margin-left:12px;"><a class="a_link" href="/vacancy">Трудоустройство</a></span></div>
									</td>
								</tr>
							</tbody>
						</table>
						<!---end menu---></td>
					</tr>
					<!--navigation panel--><?php
//case for search
if(strcmp($currentPage,"search")==0){
    $str_navigation = "<a href='#' class='navigation_menu_select'>Результаты поиска</a>";
}

if(strcmp($str_navigation,"") !=0 ){
    echo "<tr><td align='left' id='navigation_menu' style='padding-left:8px;'>";
    echo "<a class='navigation_menu' href='" . $currentUrl . "'>Главная</a>&nbsp;/&nbsp;" . $str_navigation;
    echo "</td></tr>";
}    
?><!--end navigation panel-->
					<tr>
						<td align="left" style="padding-top:10px;"><!---main text---><?php
//insert page
if($incl_file && $incl_file!=-1){
    include $incl_file;
} else {
    if($incl_file!=-1){
        echo "<br><div class='div_error'>Ошибка! Страница не найдена!</div><br>";
    }
} 
if($incl_file==-1){
?><script type="text/javascript">
    // You can also use "$(window).load(function() {"
    $(function () {
        // Slideshow 1
        $("#slider1").responsiveSlides({
            auto: true,
            pager: false,
            nav: true,
            speed: 700,
            namespace: "callbacks"
        });
    });
</script><?php
    include  INFO . "/slider.html";
    include  INFO . "/main.php";
}
?><!---main end---></td>
					</tr>
					<tr>
						<td style="height:184px;padding-top:16px;">
						<div style="height:184px;background-image: url(../../info/images/footer/footer.gif);background-repeat:repeat-x;padding-top:24px;">
						<div style="text-align:center;"><a href="/"><img border="0" src="../../info/images/footer/logo.png" /></a></div>

						<div style="text-align:center;margin-top:15px;"><a class="a_link_footer" href="/about">О Tom Tailer</a> <a class="a_link_footer" href="/jeans">Джинсы</a> <a class="a_link_footer" href="/forman">Мужчинам</a> <a class="a_link_footer" href="/forwoman">Женщинам</a> <a class="a_link_footer" href="/action">Акции</a> <a class="a_link_footer" href="/sale">Sale</a> <a class="a_link_footer" href="/contacts">Контакты</a> <a class="a_link_footer" href="/shopslist">Список магазинов</a> <a class="a_link_footer" href="/vacancy">Трудоустройство</a></div>

						<div style="text-align:center;margin-top:15px;"><a class="a_link_footer" href="http://www.facebook.com"><img border="0" src="../../info/images/footer/f.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/t.png" /></a> <a class="a_link_footer" href="http://vk.com"><img border="0" src="../../info/images/footer/v.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/y.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/g.png" /></a> <a class="a_link_footer" href="http://twitter.com"><img border="0" src="../../info/images/footer/o.png" /></a></div>
						</div>
						</td>
					</tr>
				</tbody>
			</table>
			</div>
			</div>
			</div>
			</td>
		</tr>
	</tbody>
</table>
<?php
unset($base);
?></body>
</html>
