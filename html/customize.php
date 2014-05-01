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
        if($topLevel==0){
          echo '<input type="hidden" name="'.$courseID.'">';
        }
        print_r('<a href="http://www.skedgeur.com/?q='.$courseID.'" target="otherTab">'.$courseID.'</a>');
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

    function getCourses($maj)
    {
        $result = mysqli_query($con,"select * from majors where major_name=\"".$maj."\"");
        $row = mysqli_fetch_array($result);
        echo $row['major_id'];
    }



    function advancedCSCTable(){
        global $con;
        global $courses;
        $result = mysqli_query($con,"SELECT course_id FROM major_requirements WHERE major_id=1 AND req_id=8");

        while ($row = mysqli_fetch_array($result)) { 
           $array[] = $row['course_id'];
       }

        // Match course_id to department and course_num for sorting
        foreach ($array as $id) {
            $keys[] = $id;
            $values[] = $courses[id-1]['department'] . $courses[$id-1]['course_num'];
        }

                    // Sort a combined array (sorting the course_ids by the departent and course_num)
       $sorted = array_combine($keys, $values);
       asort($sorted);

       foreach (array_keys($sorted) as $id) {
           $cid = getCourseId($id);
           $name = getCourseName($id);
           $html = $html . '<input type="checkbox" class="check1 CSCAdvanced" name="';
           $html = $html . $cid . '" />' . $name . '<br />';
       }

       echo $html;
    }

    function getCourseId($id) {
       global $courses;
       $id = $id - 1;
       $dep = strtolower($courses[$id]['department']);
       $number = $dep . $courses[$id]['course_num'];
       return $number;
    }

    function getCourseName($id){
        global $courses;
        $id = $id - 1;
        $number = $courses[$id]['department'] . " " . $courses[$id]['course_num'];
        $name = $number . ": " . $courses[$id]['course_name'];
        return $name;
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



<?php if(false){ ?>
    <h2>Major: Computer Science BS</h2>
    <div class="tabs">
        <ul>
           <li><a href="#tab1">Pre-declaration Courses</a></li>
           <li><a href="#tab2">Core Courses</a></li>
           <li><a href="#tab3">Advanced Courses</a></li>
       </ul>

        <div id="tab1">
            <h3>You must take the following courses:</h3>
            <ul>
              <li>MTH 150: Discrete Mathematics</li>
              <li>CSC 171: The Science of Programming</li>
              <li>CSC 172: The Science of Data Structures</li>
            </ul>
            <script>courses.push("mth150,csc171,csc172");</script>

            <h3>Please select one of the following options:</h3>
            <input type="radio" name="calc" value="mth161,mth162" checked="true">
            MTH 161: Calculus IA
            <br />
            <span>MTH 162: Calculus IIA</span>
            </input>
            <br />
            <br />
            <input type="radio" name="calc" value="mth161,mth162">
            MTH 171: Honors Calculus I
            <br />
            <span>MTH 172: Honors Calculus II</span>
            </input>
            <br />
            <br />
            <input type="radio" name="calc" value="mth161,mth162">
            MTH 141: Calculus I
            <br />
            <span>MTH 142: Calculus II</span>
            <br />
            <span>MTH 143: Calculus III</span>
            </input>
        </div>

<div id="tab2">
  <h3>You must take the following courses:</h3>
  <ul>
     <li>CSC 173: Computation and Formal Systems</li>
     <li>CSC 242: Artificial Intelligence</li>
     <li>CSC 252: Computer Organization</li>
     <li>CSC 254: Programming Language Desing & Impletation</li>
     <li>CSC 280: Computer Models and Limitations</li>
     <li>CSC 282: Design and Analysis of Efficient Algorithms</li>
     <li>CSC 200: Undergraduate Problem Seminar</li>
  </ul>
  <script>courses.push("csc173,csc242,csc252,csc254,csc280,csc282,csc200");</script>

  <h3>Please select one of the following options:</h3>
  <input type="radio" name="linalg" value="mth165" checked="true">
    MTH 165: Linear Algebra with Differential Equations
  </input>
<br />
<input type="radio" name="linalg" value="mth173">
MTH 173: Honors Calculus III
</input>
<br />
<input type="radio" name="linalg" value="mth163,mth235">
MTH 163: Ordinary Differential Equations I
<br />
<span>MTH 235: Linear Algebra</span>
</input>
</div>

  <div id="tab3">
    <h3 class="3">Please select three of the following options:</h3>
    <input type="checkbox" class="check1 CSCAdvanced" name="csc210" />
    CSC 210: Web Programming
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc211" />
    CSC 211: Principles of HCI
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc212" />
    CSC 212: Human Computer Interaction
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc244" />
    CSC 244: Logical Foundations of A.I.
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc246" />
    CSC 246: Machine Learning
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc247" />
    CSC 247: Natural Language Processing
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc248" />
    CSC 248: Statistical Speech & Language Processing<br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc249" />
    CSC 249: Machine Vision
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc250" />
    CSC 250: Corpus Linguistics
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc253" />
    CSC 253: Dynamic Language & Software Development
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc255" />
    CSC 255: Software Analysis and Improvement<br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc256" />
    CSC 256: Operating Systems
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc257" />
    CSC 257: Computer Networks
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc258" />
    CSC 258: Parallel & Distributed Systems
    <br />
    <input type="checkbox" class="check1 CSCAdvanced" name="csc260" />
    CSC 260: Dialog Systems: Conversational Systems: From Siri and Beyond
    <br />
  </div>
</div>

<h2>Major: Mathematics BS</h2>
<div class="tabs">
    <ul>
        <li><a href="#tab1">Pre-declaration Courses</a></li>
        <li><a href="#tab2">Core Courses</a></li>
        <li><a href="#tab3">Advanced Courses</a></li>
    </ul>

    <div id="tab1">
        <h3>You must take the following courses:</h3>
        <ul>
            <li>MTH 161: Calculus IA</li>
            <li>MTH 162: Calculus IIA</li>
            <li>MTH 164: Multidimensional Calculus</li>
            <li>MTH 165: Linear Algebra with Differential Equations</li>
        </ul>
    </div>

    <div id="tab2">
        <h3>You must take the following courses:</h3>
        <ul>
            <li>MTH 235: Linear Algebra</li>
            <li>MTH 236: Introduction to Algebra I</li>
            <li>MTH 240: Introduction to Topology</li>
            <li>MTH 265: Functions of a Real Variable I</li>
            <li>MTH 282: Introduction to Complex Variables with Applications</li>
        </ul>

    </div>

    <div id="tab3">
        <h3 class="3">Please select six of the following options:</h3>
        <input type="checkbox" class="check1 MATHAdvanced" name="ast241" />AST 241: Astrophysics I<br /><input type="checkbox" class="check1 MATHAdvanced" name="ast242" />AST 242: Astrophysics II<br /><input type="checkbox" class="check1 MATHAdvanced" name="bme218" />BME 218<br /><input type="checkbox" class="check1 MATHAdvanced" name="bme221" />BME 221<br /><input type="checkbox" class="check1 MATHAdvanced" name="bme230" />BME 230<br /><input type="checkbox" class="check1 MATHAdvanced" name="bme251" />BME 251<br /><input type="checkbox" class="check1 MATHAdvanced" name="bme 260" />BME 260<br /><input type="checkbox" class="check1 MATHAdvanced" name="bme283" />BME 283<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc250" />CSC 250: Corpus Linguistics<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc253" />CSC 253: Dynamic Language & Software Development<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc255" />CSC 255: Software Analysis and Improvement<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc256" />CSC 256: Operating Systems<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc257" />CSC 257: Computer Networks<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc258" />CSC 258: Parallel & Distributed Systems<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc260" />CSC 260: Dialog Systems: Conversational Systems: From Siri and Beyond<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc263" />CSC 263: Computer Models of Music<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc266" />CSC 266: GPU Parallel C/C++ Programming<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc281" />CSC 281: Intro to Cryptography<br /><input type="checkbox" class="check1 MATHAdvanced" name="csc284" />CSC 284: Advanced Algorithms<br /><input type="checkbox" class="check1 MATHAdvanced" name="ece210" />ECE 210<br /><input type="checkbox" class="check1 MATHAdvanced" name="ece216" />ECE 216<br />	</div>
    </div>



    <h2>Minor: Mathematics</h2>
    <div class="tabs">
        <ul>
          <li><a href="#tab4">Pre-declaration Courses</a></li>
          <li><a href="#tab5">Core Courses</a></li>
          <li><a href="#tab6">Advanced Courses</a></li>
        </ul>

      <div id="tab4">
          <h3>Please select one of the following options:</h3>
          <input type="radio" name="track3" value="req7" checked="true" />
          MTH 150: Discrete Mathematics
          <br />
          <input type="radio" name="track3" value="req8" />
          MTH 164: Multidimensional Analysis
          <br />
          <input type="radio" name="track3" value="req9" />
          MTH 174: Honors Calculus IV

          <h3>Please select one of the following options:</h3>
          <input type="radio" name="track4" value="req10" />
          MTH 163: Ordinary Differential Equations I
          <br />
          <input type="radio" name="track4" value="req11" checked="true" />
          MTH 165: Linear Algebra with Differential Equations
          <br />
          <input type="radio" name="track4" value="req12" />
          MTH 173: Honors Calculus III

          <h3>Please select one of the following options:</h3>
          <input type="radio" name="track5" value="req13" checked="true">
          MTH 161: Calculus IA
          <br />
          <span>MTH 162: Calculus IIA</span>
      </input>
      <br />
      <br />
      <input type="radio" name="track5" value="req14">
      MTH 171: Honors Calculus I
      <br />
      <span>MTH 172: Honors Calculus II</span>
  </input>
  <br />
  <br />
  <input type="radio" name="track5" value="req15">
  MTH 141: Calculus I
  <br />
  <span>MTH 142: Calculus II</span>
  <br />
  <span>MTH 143: Calculus III</span>
</input>
</div>

<div id="tab5">
  <h3>Please select one of the following options:</h3>
  <input type="radio" name="track6" value="req16" />
  MTH 173: Honors Calculus III
  <br />
  <input type="radio" name="track6" value="req17" checked="true" />
  MTH 235: Linear Algebra
</div>

<div id="tab6">
  <h3 class="2">Please select two of the following options:</h3>
</div>
</div>




<h2>Major: German</h2>
<div class="tabs">
    <ul>

        <li><a href="#tab4">Core Courses</a></li>
        <li><a href="#tab5">Advanced Courses</a></li>
    </ul>

    <div id="tab4">
        <h3>You must take the following courses:</h3>
        <ul>
            <li>GER 151</li>
            <li>GER 152</li>
            <li>GER 200: Composition and Conversation</li>
            <li>GER 202: Intoduction to German Cultural Studies</li>
            <li>GER 203: Introduction to German Literature</li>
            <li>CLT 1  :  Intro to Comparative Literature</li>
            <li>CLT 2  :  Major Seminar</li>
        </ul>

    </div>

    <div id="tab5">
        <h3 class="3">Please select four of the following options:</h3>
        <input type="checkbox" class="check1 GERAdvanced" name="ger204" />Ger 204: Marx<br /><input type="checkbox" class="check1 GERAdvanced" name="ger234" />GER 234: Strangers in a strange land<br /><input type="checkbox" class="check1 GERAdvanced" name="ger235" />GER 235: Hitler's Germany<br /><input type="checkbox" class="check1 GERAdvanced" name="ger275" />GER 275: Digital Cityscapes<br /><input type="checkbox" class="check1 GERAdvanced" name="ger294" />GER 294: On Genealogy<br /><input type="checkbox" class="check1 GERAdvanced" name="ger209" />GER 209: Cowboys and Indians<br /><input type="checkbox" class="check1 GERAdvanced" name="ger211" />GER 211: Jewish Writers and Rebels<br /><input type="checkbox" class="check1 GERAdvanced" name="ger215" />GER 215: Berlin: Tales of a city<br /><input type="checkbox" class="check1 GERAdvanced" name="ger288" />GER 288: Mothers, Comrades and Whores<br /><input type="checkbox" class="check1 GERAdvanced" name="ger391" />GER 391: Independent Study<br />	</div>
    </div>

</div>
<?php } ?>
<button onclick="count()">Continue</button>

</body>
</html>
