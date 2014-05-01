<?php


    $majors = json_decode($_GET['majors']);
    $minors = json_decode($_GET['minors']);
    $groupData = json_decode(file_get_contents("requirements.json"), true);
    $courseData = json_decode(file_get_contents("courseDB.json"), true);
    $requiredCourses = array();


    function populate($groupName,$topLevel=0){
        global $groupData;
        $group = $groupData[$groupName];

        //Create radio button group if we must.

        if(count($group['satisfiers']) > 1 ){
            echo "<h3>Pick one of the following</h3><br>\n";
        }



        foreach($group['satisfiers'] as $track){
            if(count($group['satisfiers']) > 1 ){
                echo '<input type="radio" name='.$groupName.' value="'.makeRadioValue($track).'">';
            }
            expandTrack($track,$topLevel);

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
            echo '<h3>Choose '.intval($track[0])." of the following options:</h3>\n";
        }
        for($i=1; $i<count($track); $i++){  
            //Don't print if it's a group.
            if(array_key_exists($track[$i], $groupData)){
                $groups[]  = $track[$i];
            } else {

                printCourse($track[$i],$check,$topLevel);

            }
            echo '<br>';
        }

        foreach($groups as $group){
            populate($group,1);
        }
        echo '</div>';
    }

    function printCourse($courseID,$check,$topLevel){
        if($check){
          echo '<input type="checkbox" name="'.$courseID.'">';
        }
        elseif($topLevel==0){
          echo '<input type="hidden" name="'.$courseID.'">';
        }
        print_r('<a href="http://www.skedgeur.com/?q='.$courseID.'" target="otherTab">'.makeTitle($courseID).'</a>');
        //print_r($courseID,makeTitle($courseID));
    }

    function makeTitle($courseID){
        global $courseData;

        return $courseData[$courseID]['name'].": ".$courseData[$courseID]['title'];
    }

    function makeTable($groupName){
        global $groupData;

        //Get the group from its name.
        $group = $groupData[$groupName];

        //Display title
        echo "\t\t<h2>".$group['title'].'</h2>';


        //Create a div
        echo "\n\t<div class=\"tabs\">\n";

        //Make the tabs
        echo "\t\t<ul>";
        $satisfiers = $group['satisfiers'][0];

        for($i=1; $i<count($satisfiers); $i++){
            //Get the group
            $satGroup = $groupData[$satisfiers[$i]];

            //Make its tab.
            echo "\n\t\t\t<li><a href=\"#tab".$i."\">".$satGroup['title']."</a></li>";
        }
        echo "\n\t\t</ul>\n";

        //Populate the tabs
        for($i=1; $i<count($satisfiers); $i++){
            //Get the group
            $satGroup = $satisfiers[$i];

            //Create the div for it
            echo "\n\t\t<div id=\"tab".$i."\">\n";
            populate($satGroup);
            echo "\n\t\t</div>\n";

        }

        //End the div whose id="tabs" 
        echo "\n\t</div>\n\n";
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



?> 

<html>
<head>
    <meta charset="utf-8">
    <title>Customize your Schedule</title>
    <link rel="stylesheet" href="customize.css" type = "text/css">
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script src="customize.js" type="text/javascript"></script>
    <script>
     $(function() {
        $( ".tabs" ).tabs();
    });
    </script>
</head>

<body>




    <h1>Select your courses</h1>
    
    <?php 

        foreach($majors as $major){
            makeTable($major);
        }


        foreach($minors as $minor){
            makeTable($minor." minor");
        }

    ?>



<button onclick="count()">Continue</button>

</body>
</html>
