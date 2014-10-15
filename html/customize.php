<?php

require_once("common.php");


    $majors = json_decode($_GET['majors']);
    $minors = json_decode($_GET['minors']);
    $groupData = json_decode(file_get_contents("requirements.json"), true);
    $courseData = json_decode(file_get_contents("courseDB.json"), true);
    $requiredCourses = array();
    $tableCount = 0;

    function populate($groupName,$topLevel=0){
        global $groupData;
        $group = $groupData[$groupName];

        //Create radio button group if we must.

        if(count($group['satisfiers']) > 1 ){
            echo "<h3>Pick one of the following</h3>\n";
        }
        
        
        foreach($group['satisfiers'] as $track){
            if(count($group['satisfiers']) > 1 ){
                echo '<div class="radio courses-pick-one"><label><input type="radio" name='.$groupName.' value="'.makeRadioValue($track).'">';
            }
            expandTrack($track,$topLevel);
            if(count($group['satisfiers']) > 1 ){
                echo '</label></div>';
            }

        }
    }

    function makeRadioValue($track){

        $return = $track[1];
        for($i=2;$i<count($track);$i++){
            $return = $return.",".$track[$i];
        }

        return $return;
    }

    function expandTrack($track,$topLevel){  //See requirements.json for groups
        global $groupData;

        //Store groups so we can print them after the courses
        $groups  = array();

        echo '<div>';
        $check = False;
        if(strcmp($track[0], "all") != 0 ) {
            $check = True;
            echo '<h3>Choose '.intval($track[0])." of the following options</h3>\n";
        }
        for($i=1; $i<count($track); $i++){  
            //Don't print if it's a group.
            if(array_key_exists($track[$i], $groupData)){
                $groups[]  = $track[$i];
            } else {

                printCourse($track[$i],$check,$topLevel);

            }
            //echo '<br>';
        }

        foreach($groups as $group){
            populate($group,1);
        }
        echo '</div>';
    }

    function printCourse($courseID,$check,$topLevel){
        if($check){
          echo '<div class="checkbox"><label><input type="checkbox" name="'.$courseID.'">';
        }
        elseif($topLevel==0){
          echo '<div class="checkbox disabled"><label title="This course is required."><input type="checkbox" checked disabled name="'.$courseID.'">';
        }
        echo '<div class="course-name">' . makeTitle($courseID) . '&nbsp;<a href="http://www.skedgeur.com/?q='.$courseID.'" target="otherTab"><span class="glyphicon glyphicon-info-sign"></span></a></div>';

        if ($check || $topLevel==0) {
          echo "</label></div>";
        }
    }

    function makeTitle($courseID){
        global $courseData;

        return $courseData[$courseID]['name'].": ".$courseData[$courseID]['title'];
    }

    function makeTable($groupName){
        global $groupData;
        global $tableCount;

        if($tableCount != 0 && $tableCount % 2 == 0){
            echo "\t</div>";
            echo "\t<div class=\"row\">";
        }
        $tableCount++;

        //Get the group from its name.
        $group = $groupData[$groupName];
        
        echo "\n\t\t<div class=\"col-lg-6\"><div class=\"panel panel-primary\">";

        //Display title
        echo "\t\t<div class=\"panel-heading\"><h3 class=\"panel-title\">".$group['title'].'</h3></div>';


        //Create a div
        echo "\n\t<div class=\"panel-body\">\n";

        //Make the tabs
        echo "\t\t<ul class=\"nav nav-tabs\" role=\"tablist\">";
        $satisfiers = $group['satisfiers'][0];

        for($i=1; $i<count($satisfiers); $i++){
            //Get the group
            $satGroup = $groupData[$satisfiers[$i]];
            
            $liAttrs = "";
            
            if ($i == 1) {
              $liAttrs .= " class=\"active\"";
            }

            //Make its tab.
            echo "\n\t\t\t<li$liAttrs><a href=\"#tab-" . makeSafeForCss($groupName) . "-$i\" role=\"tab\" data-toggle=\"tab\">".$satGroup['title']."</a></li>";
        }
        echo "\n\t\t</ul>\n";
        
        echo "\n\t\t<div class=\"tab-content\">";

        //Populate the tabs
        for($i=1; $i<count($satisfiers); $i++){
            //Get the group
            $satGroup = $satisfiers[$i];
            
            $classes = "tab-pane fade";
            if ($i == 1) {
              $classes .= " in active";
            }

            //Create the div for it
            echo "\n\t\t<div class=\"$classes\" id=\"tab-" . makeSafeForCss($groupName) . "-$i\">\n";
            populate($satGroup);
            echo "\n\t\t</div>\n";

        }
        
        echo "\n\t\t</div>";

        //End the divs
        echo "\n\t</div></div></div>\n\n";
    }

    function makeManualTable(){
        global $tableCount;

        if($tableCount != 0 && $tableCount % 2 == 0){
            echo "\t</div>";
            echo "\t<div class=\"row\">";
        }
        $tableCount++;
        
        echo "\n\t\t<div class=\"col-lg-6\"><div class=\"panel panel-primary\">";

        //Display title
        echo "\t\t<div class=\"panel-heading\"><h3 class=\"panel-title\">Manually add courses</h3></div>";


        //Create a div
        echo "\n\t<div class=\"panel-body\">\n";
        echo "\n\t\t<h5>Enter course IDs to add them manually</h><br>";
?>
        
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" id="manualCourses" style="border: 2px solid #aaa;border-right-style:hidden">
              <span class="input-group-btn">
                <button id="manualCoursesAddBtn" class="btn btn-primary" type="button"><span class="glyphicon glyphicon-plus"></span></button>
              </span>
            </div><!-- /input-group -->
          </div><!-- /form-group -->

        <ul id="manualList" class="list-group"></ul>
<?php
        
        echo "\n\t\t</div>";

        //End the divs
        echo "\n\t</div></div>\n\n";
    }

    function getGroup($groupName){
        global $groupData;

        //Returns the group if it exists
        if(array_key_exists($groupName, $groupData)){
            return $groupData[$groupName];
        }

        //Returns -1 if it's an error.
        return -1;
    }
    
    // converts any string to a valid CSS class name
    // credit to tsi: http://stackoverflow.com/a/12351201/992504
    function makeSafeForCss($className) {
      $cleanName = preg_replace('/\W+/','',strtolower($className));
      return $cleanName;
    }
    

printHeader("Customize your schedule", array("css/customize.css"));
printNavbar();

?>

<div class="container">



  <div class="page-header">
    <h1>Select your courses</h1>
  </div>
  
  <div class="row">
    <?php 

    foreach($majors as $major){
        makeTable($major);
    }


    foreach($minors as $minor){
        makeTable($minor." minor");
    }

    makeManualTable();

    ?>
  </div>
  
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4 col-xs-8 col-xs-offset-2">
      <div class="well">
          <button id="continueBtn" class="btn btn-primary btn-lg btn-block" type="button">Continue</button>
      </div>
    </div>
  </div>

</div>

<?php

printFooter(array("js/jquery-ui-1.10.4.custom.min.js", "js/customize.js"));

?>
