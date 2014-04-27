<?php

	class course{
		var $id;

		var $earliest;  //\
		var $latest;    // Both of these are used for the planning algorithm.

		var $prereqs;  //needed for the insert
		var $postreqs; //for the topological sort
		var $placed = -1;   //The semester in which it is placed. inf if not placed.

		var $depth; //maximum distance from a source node in the prereq graph
	}

	class semester{
		var $type; // 0 is fall, 1 is spring.
		var $courses = array();
	}

	$semesters = array();


	function findEarliest($course){
		global $semesters;

		$semesterNumber = latestPrereq($course);
		$coursenextPossibleSemester($course, $semesterNumber);
	}

	function latestPrereq($course){
		$max = -1;

		foreach ($course.$prereqs as $prereq) {
			if ($prereq.$earliest > $max)
				$max = $prereq.$earliest;
		}

		return $max;
	}

	function topological_sort($nodeids, $edges) {
    $L = $S = $nodes = array();
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

	function place($course, $i){
		global $semesters;
		$semesters[$i].$courses[] = $course;
	}

	function canTake($course, $semesterNumber){
		global $semesters;

	}

	function findLatest($course){

	}

	function updateLastests($course){

	}


	function nextPossibleSemester($course, $semesterNumber){
		for($i=$placeAfter; $i<count($semesters); $i++){

			if( canTake($course, $i) ){
				return $i;
			}

		}
	}

	function placeInPreviousPossibleSemester($course, $placeAfterSemester){
		
	}
?>
