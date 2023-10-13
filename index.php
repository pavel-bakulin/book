<?php
Error_Reporting(E_ALL & ~E_NOTICE);
session_start();

define('PATH',dirname(__FILE__));
define('INCLUDE_PATH',dirname(__FILE__).'/include/');
define('INFO',dirname(__FILE__).'/info/');
define('SERVER_NAME',$_SERVER["SERVER_NAME"]);

require_once(INCLUDE_PATH.'class/db_connect.php');
require_once(INCLUDE_PATH.'class/common.php');

$base = new db_connect("localhost","root","1","book");

$incl_file_arr = array();
$incl_file_arr = include_file_real($_REQUEST['rqpath'],$object_inclide_param);

//first parameter is needed for checking path there is really or not
$incl_file = "";
if($incl_file_arr[0]){
    $incl_file = $incl_file_arr[0];
}
//second parameter is needed to determine opens into this window or create new window
if($incl_file_arr[1]){
    $incl_separate = $incl_file_arr[1];
}
//for ajax query should to exit from page
if($incl_separate==1){
  echo 1;
    include $incl_file;
    unset($base);
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Blog Post - Start Bootstrap Template</title>
  <!-- Bootstrap Core CSS -->
  <link href="../../../include/bootstrap/css/bootstrap.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="../../../include/bootstrap/css/blog-post.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="../../../include/css/common.css" rel="stylesheet">
  <link href="../../../include/css/soc_network.css" rel="stylesheet">
  
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
  <!-- jQuery -->
  <script src="../../../include/js/jquery/jquery-1.11.2.min.js"></script>
  <!-- Bootstrap Core JavaScript -->
  <script src="../../../include/bootstrap/js/bootstrap.min.js"></script>

  <script src="../../../include/js/main.js"></script>
</head>

<?php
if($incl_separate==2){
  include $incl_file;
  unset($base);
  exit();
}
?>

<body>
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"></h4>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- end modal -->



    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header ">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Start Bootstrap</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="/">О проекте</a>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="article">Статьи<span class="caret" style="margin-left:10px;"></span></a>
                        <ul class="dropdown-menu">
                          <li><a href="article?id=1">Page1</a></li>
                          <li><a href="#">Page2</a></li>
                          <li><a href="#">Page3</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="contacts">Контакты</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">

        <div class="row">

            <!-- Blog Post Content Column -->
          
            <div class="col-lg-8">
<?php
//insert page
if($incl_file && $incl_file!=-1){
  include $incl_file;
?>
<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

<?php  
  //echo "dd";
} else {
  if($incl_file!=-1){
    echo "<br><div class='div_error'>Ошибка! Страница не найдена!</div><br>";
  }
}

if($incl_file==-1){
?> 

//jdgfsdugfydgf




 
<?php
}
?>
            </div>

            <!-- Blog Sidebar Widgets Column -->
            <div class="col-md-4">

                <!-- Blog Search Well -->
                <!--<div class="well">
                  <h4>Blog Search</h4>
                  <div class="input-group">
                      <input type="text" class="form-control">
                      <span class="input-group-btn">
                          <button class="btn btn-default" type="button">
                              <span class="glyphicon glyphicon-search"></span>
                      </button>
                      </span>
                  </div>
                </div>-->

                <!-- Blog Categories Well -->
                <div class="well">
                    <h4>Blog Categories</h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <ul class="list-unstyled">
                                <li><a href="#">Category Name</a>
                                </li>
                                <li><a href="#">Category Name</a>
                                </li>
                                <li><a href="#">Category Name</a>
                                </li>
                                <li><a href="#">Category Name</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <ul class="list-unstyled">
                                <li><a href="#">Category Name</a>
                                </li>
                                <li><a href="#">Category Name</a>
                                </li>
                                <li><a href="#">Category Name</a>
                                </li>
                                <li><a href="#">Category Name</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /.row -->
                </div>

                <!-- Side Widget Well -->
                <!--<div class="well">
                    <h4>Side Widget Well</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, perspiciatis adipisci accusamus laudantium odit aliquam repellat tempore quos aspernatur vero.</p>
                </div>-->

            </div>

        </div>
        <!-- /.row -->

        <!--<hr>-->

        <!-- Footer -->
        <footer>
            <!-- /.row-->
        </footer>

    </div>
    <!-- /.container -->



</body>

</html>
