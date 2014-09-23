<?php

$GLOBALS['siteName'] = "UR Planner";


/**
 * Prints the site's common page header
 *
 * pageTitle = a title for the current page being loaded
 * extraCss = an array of URLs for additional CSS files this page needs
 */
function printHeader($pageTitle, $extraCss=array()) {
    global $SITE_NAME;

    ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Course planner for University of Rochester students">
    <!--<meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">-->

    <title><?php printf("%s &ndash; %s", $GLOBALS['siteName'], $pageTitle); ?></title>
    
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <?php
    
    for ($i = 0; $i < count($extraCss); $i++) {
        echo "\n<link href=\"" . $extraCss[$i] . "\" rel=\"stylesheet\">";
    }
    
    ?>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
<?php /*
    <div class="navbar navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><?php echo $GLOBALS['siteName']; ?></a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>*/

}

/**
 * Prints the site's common page footer
 *
 * extraCss = an array of URLs for additional JS files this page needs
 */
function printFooter($extraJs=array()) {
    ?>
    <hr>
    <footer class="text-center">
      Created by some people in 2014
    </footer>
    
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <?php
    
    for ($i = 0; $i < count($extraJs); $i++) {
        echo "\n<script src=\"" . $extraJs[$i] . "\"></script>";
    }
    
    ?>
  </body>
</html>

<?php
}

?>