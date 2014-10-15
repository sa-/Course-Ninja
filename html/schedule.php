<?php

require_once("common.php");

	class course{
		var $id;

		var $latest;    // Both of these are used for the planning algorithm.

		var $prereqs;  //needed for the insert
		var $placed;   //The semester in which it is placed. 

		var $credits;

		var $fall;
		var $spring;
	}

	class courses{
		var $name;
		var $title;
		var $id;
		var $clas;
		var $credits;
		var $pre = array();
		var $post = array();
	}

	class semester{
		var $title;
		var $courses = array();

	}

	class schedule{
		var $courses;
		var $semesters;
	}


	$inputCourses = json_decode($_GET['courses']);
	$inputCourses = array_unique($inputCourses);
	$courses = array();
	$semesters = array();

	for ($i=0; $i<8; $i=$i+2){
		$semesters[$i] = new semester;
		$semesters[$i]->title = "Fall";
		$semesters[$i+1] = new semester;
		$semesters[$i+1]->title = "Spring";
	}

	//Set up an array of nodes for the topological sort.
	$nodeIDs = array();
	$edges = array();

	//Fill in courses with data
	$courseData = json_decode(file_get_contents("courseDB.json"), true);

	foreach ($inputCourses as $inputCourse) {
		$course = new course;
		$temp = $courseData[$inputCourse];
		$course->id = $temp['id'];
		$course->title = $temp['title'];
		$course->prereqs = $temp['pre'];
		$course->credits = $temp['credits'];
		$course->latest = count($semesters)-1;
		$course->placed = count($semesters);
		$course->fall = $temp['fall'];
		$course->spring = $temp['spring'];
		$courses[$temp['id']] = $course;

		//Also build the inputs for the topological sort
		$nodeIDs[] = $course->id;
		foreach($course->prereqs as $prereqID){
			if(in_array($prereqID, $inputCourses)){
				$edges[] = array($course->id, $prereqID);
			} 
		}
	}


	$topSortedList = topological_sort($nodeIDs, $edges);
	computeLatests();

	//Sort courses by latest!
	$courseLookup = $courses;
	usort($courses, "cmp");

	//Finally place them all.
	placeCoursesInSemesters();

	//printSems();

	function printSems(){
		global $semesters;

		foreach($semesters as $sem){
			echo $sem->title."<br>";
			foreach($sem->courses as $c){
				echo $c->id;
				echo "<br>";
			}
			echo "<hr><br>";
		}
	}

	function computeLatests(){
		global $topSortedList;
		global $courses;

		foreach($topSortedList as $id){
			$course = $courses[$id];
			$newPossibleLatest = getLatestSemester($course);
			if($newPossibleLatest < $course->latest){
				$course->latest = $newPossibleLatest;
			}

			foreach($course->prereqs as $prereqID){
				$prereq = $courses[$prereqID];
				$prereq->latest = $course->latest-1;
			}

		}
	}

	function topological_sort($nodeids, $edges) {
	    $L = array();
	    $S = array();
	    $nodes = array();
	    foreach($nodeids as $id) {
	        $nodes[$id] = array('in'=>array(), 'out'=>array());
	        foreach($edges as $e) {
	            if ($id==$e[0]) { $nodes[$id]['out'][]=$e[1]; }
	            if ($id==$e[1]) { $nodes[$id]['in'][]=$e[0]; }
	        }
	    }
	    foreach ($nodes as $id=>$n) { if (empty($n['in'])) $S[]=$id; }
	    while (!empty($S)) {
	        $L[] = $id = array_shift($S);
	        foreach($nodes[$id]['out'] as $m) {
	            $nodes[$m]['in'] = array_diff($nodes[$m]['in'], array($id));
	            if (empty($nodes[$m]['in'])) { $S[] = $m; }
	        }
	        $nodes[$id]['out'] = array();
	    }
	    foreach($nodes as $n) {
	        if (!empty($n['in']) or !empty($n['out'])) {
	            return null; // not sortable as graph is cyclic
	        }
	    }
	    return $L;
	}



	function canTake($course, $semesterNumber){
		global $semesters;
		global $courseLookup;

		//Don't take if it's already taken
		if($course->placed < count($semesters)){
			return False;
		}

		foreach($course->prereqs as $prereqID){
			$prereq = $courseLookup[$prereqID];
			if($prereq->placed>=$semesterNumber){
				return False;
			}
		}

		if($semesterNumber % 2 == 0 and $course->fall == False){
			return False;
		}

		if($semesterNumber % 2 != 0 and $course->spring == False){
			return False;
		}

		return True;
	}

	//Only call AFTER the topological sort!
	function getLatestSemester($course){
		global $semesters;

		for($i = $course->latest; $i>=0; $i--){
			if(strcmp($semesters[$i]->title, "Fall") == 0 && $course->fall){
				return $i;
			}
			if(strcmp($semesters[$i]->title, "Spring") == 0 && $course->spring){
				return $i;
			}
		}

		return -1;
	}

	function placeCoursesInSemesters(){
		global $courses;
		global $semesters;



		for($i=0; $i<count($semesters); $i++){
			$maxCredits = 19;
			$credits = 0;

			$semesters[$i]->courses = array();
			
			foreach($courses as $course){
				if(canTake($course, $i) && ($course->credits+$credits < $maxCredits || $course->latest == $i) ){
					$semesters[$i]->courses[] = $course;
					$course->placed = $i;
					$credits = $credits + $course->credits;
				}
			}
		}

	}

	function cmp($courseA, $courseB){
		return $courseA->latest > $courseB->latest;
	}	

	function generateOutput(){
		global $semesters;
		global $courses;
		global $courseData;

		$output = array();

		$map = array();

		$schedule = new schedule;

		for($i=0; $i<count($courses); $i++){
			$map[$courses[$i]->id] = $i;
			$temp = new courses;
			$temp->title = $courseData[$courses[$i]->id]['title'];
			$temp->id = strtoupper($courses[$i]->id);
			$temp->name = strtoupper($courses[$i]->id);
			$temp->clas = strtoupper($courses[$i]->id);
			$temp->pre = $courses[$i]->prereqs;
			$temp->credits = $courses[$i]->credits;
			$courses[$i] = $temp;
		}

		foreach($courses as $course){
			for($i=0;$i<count($course->pre);$i++){
				$course->pre[$i] = $map[$course->pre[$i]];
			}
		}

		foreach($semesters as $semester){
			for($i = 0; $i<count($semester->courses); $i++){
				$semester->courses[$i] = $map[$semester->courses[$i]->id];
			}
		}

		$schedule->courses = $courses;
		$schedule->semesters = $semesters;
		return json_encode($schedule);
	}

printHeader("Schedule", array("css/schedule.css"));
echo '<script>';
echo 'var schedule = ' . generateOutput() . ';';
echo 'var howSmallIsSmall = "' . (isset($_GET['print']) ? "xs" : "sm") . '";';
echo '</script>';
printNavbar();

?>
<div class="container">
  <div class="visible-print-block hide-during-print">
    <div class="alert alert-warning" role="alert">
      <strong>Hold on a sec!</strong> This printout will look a lot better if you use the Print button on the page.
    </div>
  </div>
  
  <div class="row">
    
    <div class="col-md-3 col-md-push-9">
      <div id="right" class="hidden-print">
        <h2>How to use</h2>
        
        <p>Drag courses to re-arrange them as you please. </p>
        <p>Click or tap on a course to see more information about it.</p>
        
        <p>
          <button class="btn btn-primary" id="btnPrint"><span class="glyphicon glyphicon-print"></span> Print</button>
        </p>
        
        <!--<ul id="prereq" class="non-bullet">
          <li id="course"></li>
          <li id="concur"></li>
          <li id="pres"></li>
          <li id="posts"></li>
        </ul>-->
      </div>
    </div>
    
    <div class="col-md-9 col-md-pull-3">
      <div id="schedule">
      </div>
    </div>
    
  </div>
</div>

<?php

printFooter(array("js/jquery-ui-1.10.4.custom.min.js", "js/schedule.js"));

?>
