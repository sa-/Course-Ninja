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
