<?php
	
	
	/* PHP index:
	- Variables
	- Scheduling methods
	- Formatting output methods
	- Class definitions
	*/
	
	//Global Variables
	$courses		= array(); //Local copy of the courses in the schedule. Multiple purposes.
	$canTake 		= array(); //Courses whose prereqs have been satisfied
	$mustTake 		= array(); //Courses that are yet to be taken
	$semesters 		= array(); //An array of semesters
	$adjList	 	= array(); //The implementation of a graph, courses are nodes.

	//Initializing them
	//fillLocalCourses();
	//buildPrereqGraph();
	
	//--Initializer.
	//--Fills $prereqEdges with edges from A to B where
	//--A is a prerequisite of B
	function buildAdjList(){
		global $courses;
		foreach ($courses as $course){
			$adjList[$course['number']]= array(); 
			//Incomplete here
		}
	}

	function createEdge($from, $to){

	}

	function getTitleByID($id){

	}

	function fillLocalCourses(){
		
	}
	
	//The Scheduling Function
	function schedule(){
		global $canTake;
		global $mustTake;
		global $semesters;
		global $years;
		
		$isFall = true;
		for($i=0; $i<$years*2; $i++){
			$sem = new Semester();
			$limit = 19;
			
			//Find courses that don't have awaiting prereqs
			$canTake = getTakeableCourses($isFall);
			
			//Sort them so that the course that satisfies most prerequisites is last
			//(So that it can be popped)
			$canTake = sortByPrereqs($canTake);
			
			$withinLimit = true;
			while($withinLimit and count($canTake)>0){
				$c = array_pop($canTake);
				
				$ccredits = $c->credits;
				if(count($c->concurrent)>0){
					//ADD CODEHERE
				}
			}
			
			//Add this semester to the main array.
			$semesters[] = $sem;
			$isFall = !$isFall;
		}
	}
	
	function getTakeableCourses($isFall){
		
	}
	
	//--Helper function for schedule()
	//--Sorts an array of courses by the number of courses it is a prerequisite for
	function sortByPrereqs($courseArray){
		return usort($courseArray);
	}
	
	//----Helper for sortByPrereqs
	//----Setting up a comparator for sorting by number of prereqs
	function sort_callback($a,$b){
		if( count($a->post) == count($b->post) ) {
			return 0;
		}
	}
	
	
	//Class definitions for JSON encoding
	class Schedule{
		var $majors;
		var $minors;
		var $clusters;
		var $years;
		var $courses;
	}
	class Major{
		var $title;
		var $predec;
		var $core;
		var $advanced;
	}
	class Minor{
		var $title;
		var $predec;
		var $core;
		var $advanced;
	}
	class Cluster{
		var $title;
		var $courses;
	}
	class Year{
		var $title;
		var $semesters;
	}
	class Semester{
		var $title;
		var $courses;
	}
	class Course{
		var $name;
		var $title;
		var $id;
		var $clas;
		var $credits;
		var $concurrent = array();
		var $pre = array();
		var $post = array();
		var $weight =0;
	}
	
	$a = new Year();
	$a = new Semester();
	$a = new Cluster();
	$a = new Major();
	$a = new Minor();
	$a = new Schedule();
	
	
	class Node
	{
		public $parentNode = null; //reference to prereq
		public $children = array(); //postreqs
		 
		function __construct($params = null)
		{
			foreach($params as $key=>$val)
			$this->$key = $val;
			if (isset($this->parentNode))
			$this->parentNode->addChild($this);
		}
		public function addChild(Node $node)
		{
			$this->children[] = $node;
		}
	}
	class Tree
	{
		public $root = null;
	
	function __construct($maxLevel = 3)
	{
		$this->buildTree($maxLevel);
	}
	
	public function buildTree($maxLevel = 3)
	{
		$this->root = new Node(array('text'=>'Root'));
		$this->populateChildren($this->root, 1, $maxLevel);
	}
	
	public function printNodes()
	{
		$this->printChildren($this->root);
	}
	
	private function printChildren(Node $node)
	{
	$N = $node->depth * 4;
		for ($idx = 0; $idx < $N; $idx++)
			echo '&nbsp;';
	
	echo $node->text . "<br />\n";
		foreach($node->children as $child)
			$this->printChildren($child);
	}
	
	private function populateChildren(Node $pnode, $level, $maxLevel)
	{
	//demonstrate how to populate tree's node
	if ($level <= $maxLevel)
	{
	for($idx = 0; $idx < $level; $idx++)
	{
	$child = new Node(array(
		'parentNode'=> $pnode,
		'text' => "$level::Node[$idx]",
		'depth'=>$level)
	);
	$this->populateChildren($child, $level + 1, $maxLevel);
	}
	}
	}	
}
?>
