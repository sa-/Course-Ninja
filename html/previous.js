$(function() {
	add($("#add"));
});
        
function add(Button){
	Button.click(function() {
		var department = document.getElementById("department").value;
		var number = document.getElementById("number").value;
		var credits = parseInt(document.getElementById("credits").value);

		var errors = "";
		if (department == "") errors += "\nDepartment code";
		if (number == "") errors += "\nCourse number";
		if (isNaN(credits)) errors += "\nNumber of credits";
		
		if (errors != "") {
			errors = "Please correct the following error(s):" + errors;
			alert(errors);
		} else {
			var radios = document.getElementsByName("semester");
			var semester = "";
			for (var i = 0; i < radios.length; i++) {       
        		if (radios[i].checked) {
           		 	semester = radios[i].value;
            		break;
        		}
        	}
        	
        	// Should never be hit because of default value
        	if (semester == "") alert("ERROR: a semester must be selected");
        	
        	var year = document.getElementById("year").value;
        	
		
			var ul = document.getElementById("courses");
			var course = '<li title="' + credits + ' credits">' + department + " " + number + " ("
				+ credits + " credits, taken " + semester + " " + year + ") [edit]</li>";
			ul.innerHTML = course + ul.innerHTML;
			
			document.getElementById("department").value = "";
			document.getElementById("number").value = "";
			document.getElementById("credits").value = "";
			
			
			$("li").unbind();
			edit_courses($("li"));
		}
	});
}

function edit_courses(Li) {
	Li.click(function() {
		alert("Clicked");
		
	});
}
