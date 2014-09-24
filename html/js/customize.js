//The list of all courses that we're taking.
var courses = [];

function count(){

	var newList = [];
	for (var i=0; i<courses.length; i++){
		var nameList = courses[i].split(",")
    	for(var j=0;j<nameList.length;j++){
	        newList.push(nameList[j]);
	    }
	}
	courses = newList;

	var inputTags = document.getElementsByTagName('input');
	
	for (var i=0, length = inputTags.length; i<length; i++) {
	    if ((inputTags[i].type == 'checkbox' && inputTags[i].checked)) {
	    	var nameList = inputTags[i].name.split(",")
	    	for(var j=0;j<nameList.length;j++){
		        courses.push(nameList[j]);
		    }
	    }

	    if(inputTags[i].type == 'hidden'){
	    	courses.push(inputTags[i].name);
	    }

	    if (inputTags[i].type == "radio" && inputTags[i].checked) {
	    	var nameList = inputTags[i].value.split(",")
	    	for(var j=0;j<nameList.length;j++){
		        courses.push(nameList[j]);
		    }
	    }
	}
	//alert(JSON.stringify(courses));
	window.location.assign("test.php?courses="+JSON.stringify(courses));
}

//$( ".tabs" ).tabs();

$("#continueBtn").click(function() {
  count();
});

/*
$(function(){
	set_count($("button"));
	
});

function set_count(Button) {
	Button.click(function() {
		var x = 1;
		var list = document.getElementsByClassName("check" + x);
		var goalNum, count;
		var errors = "";
		
		while (list.length > 0) {
			goalNum = list[0].previousElementSibling.className;
			count = $("[type='checkbox'].check" + x + ":checked").length;
			
			if (goalNum != count) {
				var index = list[0].className.indexOf(' ');
				var clas = list[0].className.substring(index);
				clas = clas.substring(0, 4) + " " + clas.substring(4) + " Courses";
				errors += "\n" + clas;
			}
			
			list = document.getElementsByClassName("check" + (++x));
		}
		
		if (errors.length > 0) {
			errors = "Please fix the following options before continuing: " + errors;
			alert(errors);
		} else {
			window.location.href = "schedule.html";
			return false;
		}
	});
}
*/