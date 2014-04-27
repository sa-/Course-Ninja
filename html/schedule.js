//getting fun stuff from javascript.
$(function(){
	populateHTML();

	set_collapse($("img.collapse"));
	set_expand($("img.expand"));
	
	set_sorting($(".semester"));
	select_courses($(".semester>li"));
	
	add_electives($("button.addElective"));
//	delete_elective($("button.delete"));
	save($("#save"));
	print($("#print"));
});

var lastSelected = "";
var num = 1;
var from = null;
var dragged = false;

function populateHTML() {
	populateLeft();
	populateCenter();
}

function populateLeft() {
	var html = '<h2>Major' + populateLeftSection(schedule.majors);
	
	if (schedule.minors.length > 0)
		html += '<h2>Minor' + populateLeftSection(schedule.minors);
	
	if (schedule.clusters.length > 0)
		html += '<h2>Cluster' + populateClusters(schedule.clusters);
		
	document.getElementById('left').innerHTML = html;
}

function populateLeftSection(lst) {
	var courses = schedule.courses;
	var html = "";
	
	if (lst.length > 1)
		html += 's';
	html += '</h2>';

	for (var i in lst) {
		html += '<p><div><img src="res/DownWedge.png" alt="Expand" title="Expand" class="expand"/>' +
			'<span class="expandable">' + lst[i].title + '</span><ul>';
		
		
		if (lst[i].predec.length > 0) {
			html += '<li><img src="res/DownWedge.png" alt="Expand" title="Expand" class="expand"/>' + 
				'<span class="expandable">Pre-declaration Courses</span><ul>';
				
				
			for (var j in lst[i].predec) {
				course = courses[lst[i].predec[j]];
				html += '<li><button class="' + course.clas + '">' + course.name + '</button></li>';
			}
			
			html += '</ul></li>';
		}
		
		if (lst[i].core.length > 0) {
			html += '<li><img src="res/DownWedge.png" alt="Expand" title="Expand" class="expand"/>' + 
				'<span class="expandable">Core Courses</span><ul>';
				
			for (var j in lst[i].core) {
				course = courses[lst[i].core[j]];
				html += '<li><button class="' + course.clas + '">' + course.name + '</button></li>';
			}
			
			html += '</ul></li>';
		}
		
		if (lst[i].advanced.length > 0) {
			html += '<li><img src="res/DownWedge.png" alt="Expand" title="Expand" class="expand"/>' + 
				'<span class="expandable">Advanced Courses</span><ul>';
				
			for (var j in lst[i].advanced) {
				course = courses[lst[i].advanced[j]];
				html += '<li><button class="' + course.clas + '">' + course.name + '</button></li>';
			}
			
			html += '</ul></li>';
		}
		
		html += '</ul></div></p>';
	}
	
	return html;
}

function populateClusters(lst) {
	var html = "";
	var courses = schedule.courses;
	
	if (lst.length > 1)
		html += 's';
	html += '</h2>';
	
	for (var i in lst) {
		html += '<p><div><img src="res/DownWedge.png" alt="Expand" title="Expand" class="expand"/>' +
			'<span class="expandable">' + lst[i].title + '</span><ul>';
			
		for (var j in lst[i].courses) {
				course = courses[lst[i].courses[j]];
				html += '<li><button class="' + course.clas + '">' + course.name + '</button></li>';
			}
			
		html += '</ul></div></p>';
	}
	
	return html;
}

function populateCenter() {
	var all_courses = schedule.courses;
	var col_num, year, semester, sem_courses, course;
	var html = "";
	
	for (var i in schedule.years) {
		col_num = 1;
		year = schedule.years[i];
		
		html += '<h2>' + year.title + '</h2>';
		html += '<div class="semesters">';
	
		for (var i in year.semesters) {
			semester = year.semesters[i];
			sem_courses = semester.courses
		
			html += '<div class="col' + col_num + '">';
			html += '<ul class="connectedSortable semester">';
			var html2 = "";
			var credits = 0;
			for (var i in sem_courses) {
				course = all_courses[sem_courses[i]];
				credits += course.credits;

				html2 += '<li class="ui-default';
				if (course.clas != null)
					html2 += ' ' + course.clas;
			
				html2 += '" title="' + course.credits + ' credits"';
		
				if (course.id != null)
					html2 += ' id="' + course.id + '"';
				
				
				html2 += '>' + course.name + ': ' + course.title + '</li>';
			}
			html += '<li class="ui-default ui-disabled semester-header">' + semester.title + 
				' <span class="credits">(' + credits + ' credits)</span></li>';
			html += html2 + '</ul>';
			html += '<button class="addElective">Add an Elective</button>';
			html += '</div>';
	
			col_num = col_num + 1;
		}


		html += '</div>';
		html += '<br class="clear"/>';
	}
	
	document.getElementById('years').innerHTML = html;
}

/**
*collapses the review the user clicked on
*/
function set_collapse(UpArrow){
	UpArrow.click(function(){  
		$(this).parent().children("ul").first().slideUp();
		
		$(this).attr("src", "res/DownWedge.png");
		$(this).attr("alt", "Expand");
		$(this).attr("title", "Expand");
		$(this).attr("class", "expand");
		
		$(this).unbind("click");
		set_expand($(this));
	});
}

function set_expand(DownArrow){
	DownArrow.click(function(){
		$(this).parent().children("ul").first().slideDown();

		$(this).attr("src", "res/UpWedge.png");
		$(this).attr("alt", "Hide");
		$(this).attr("title", "Collapse");
		$(this).attr("class", "collapse");
		
		$(this).unbind("click");
		set_collapse($(this));
	});
}

function toWhite(id) {
	if (id == "") return;
	
	var index = -1;
	for (var i in schedule.courses) {
		if (schedule.courses[i].id == id) {
			index = i;
			break;
		}
	}
	
	if (index < 0) {		// This is not a course from the JSONP file, so no data on prereqs
 		var course = document.getElementById(id);
 		course.style.background = "rgba(255, 255, 255, .5)";
	} else {		// This is a course from a JSONP file
		var course = document.getElementById(id);
		course.style.background = "rgba(255, 255, 255, .5)";
		
		if (schedule.courses[index].concurrent != null) {
			var coIndex = schedule.courses[index].concurrent;
			var co = document.getElementById(schedule.courses[coIndex].id);
			co.style.background = "rgba(255, 255, 255, .5)";
		}
		
		var preInds = schedule.courses[index].pre;
		var pre;
		for (var i in preInds) {
			pre = document.getElementById(schedule.courses[preInds[i]].id);
			pre.style.background = "rgba(255, 255, 255, .5)";
		}
		
		var postInds = schedule.courses[index].post;
		var post;
		for (var i in postInds){
			post = document.getElementById(schedule.courses[postInds[i]].id);
			post.style.background = "rgba(255, 255, 255, .5)";
		}
	}
}

function toColor(id) {
	var index = -1;
	for (var i in schedule.courses) {
		if (schedule.courses[i].id == id) {
			index = i;
			break;
		}
	}
	
	if (index < 0) {		// This is not a course from the JSONP file, so no data on prereqs
		var course = document.getElementById(id);
		course.style.background = "rgba(0, 255, 255, .5)";
	} else {		// This is a course from a JSONP file
		var course = document.getElementById(id);
		course.style.background = "rgba(0, 255, 255, .5)";		// Cyan
		
		if (schedule.courses[index].concurrent != null) {
			var coIndex = schedule.courses[index].concurrent;
			var co = document.getElementById(schedule.courses[coIndex].id);
			co.style.background = "rgba(255, 255, 0, .5)";		// Yellow
		}
		
		var preInds = schedule.courses[index].pre;
		var pre;
		for (var i in preInds) {
			pre = document.getElementById(schedule.courses[preInds[i]].id);
			pre.style.background = "rgba(255, 0, 0, .5)";		// Red
		}
		
		var postInds = schedule.courses[index].post;
		var post;
		for (var i in postInds) {
			post = document.getElementById(schedule.courses[postInds[i]].id);
			post.style.background = "rgba(0, 255, 0, .5)";		// Green
		}
	}
}

function hideRight() {
	document.getElementById('prereq').style.display = "none";
	document.getElementById('directions').style.display = "block";
}

function showRight(id) {
	document.getElementById('directions').style.display = "none";

	if (id.indexOf('elective') < 0) {		// This is a required course
		var name = id.toUpperCase().substring(0,3) + " " + id.substring(3);
		var html = name;
		document.getElementById('course').innerHTML = html;
		document.getElementById('course').style.backgroundColor = "rgba(0, 255, 255, 0.5)";
		
		var index = -1;
		for (var i in schedule.courses) {
			if (schedule.courses[i].id == id) {
				index = i;
				break;
			}
		}
		if (index < 0) return;		// ERROR: it was not found
		
		var course = schedule.courses[index];
		
		html = "";
		if (course.concurrent != null) {
			var concur = schedule.courses[course.concurrent];
			html = name + " must be taken concurrently with: ";
			html += '<ul class="show"><li>' + concur.clas.substring(0,3) + " ";
			html += concur.clas.substring(3) + "</li></ul>";
		}
		document.getElementById('concur').innerHTML = html;
		document.getElementById('concur').style.backgroundColor = "rgba(255, 255, 0, .5)";
		
		html = "";
		if (course.pre.length > 0)
			html += 'Prerequisites for ' + name + ':<ul class="show">';
		var pName;
		for (var i in course.pre) {
			pName = schedule.courses[course.pre[i]].clas.substring(0,3) + " ";
			pName += schedule.courses[course.pre[i]].clas.substring(3);
			html += '<li>' + pName + '</li>';
		}
		document.getElementById('pres').innerHTML = html;
		document.getElementById('pres').style.backgroundColor = "rgba(255, 0, 0, .5)";
	
		
		html = "";
		if (course.post.length > 0)
			html += name +  ' is a prerequisite for:<ul class="show">';
		for (var i in course.post) {
			pName = schedule.courses[course.post[i]].clas.substring(0,3) + " ";
			pName += schedule.courses[course.post[i]].clas.substring(3);
			html += '<li>' + pName + '</li>';
		}
		document.getElementById('posts').innerHTML = html;
		document.getElementById('posts').style.backgroundColor = "rgba(0, 255, 0, .5)";
	
		
		document.getElementById('prereq').style.display = "block";
		document.getElementById('concur').style.display = "block";
		document.getElementById('pres').style.display = "block";
		document.getElementById('posts').style.display = "block";	
	} else {		// This is an elective
		var name = document.getElementById(id).textContent;
		var html = name.substring(0, name.length-1);
		document.getElementById('course').innerHTML = html;
		document.getElementById('course').style.backgroundColor = "rgba(0, 255, 255, 0.5)";
		
		document.getElementById('concur').style.display = "none";
		document.getElementById('pres').style.display = "none";
		document.getElementById('posts').style.display = "none";	
		document.getElementById('prereq').style.display = "block";
	}
}

function set_sorting(Data) {
	Data.sortable({ items: "li:not(.ui-disabled)" });
	Data.sortable({ connectWith: ".connectedSortable" });
    Data.sortable({ placeholder: "ui-highlight" });
    
    Data.droppable({ drop: function( event, ui ) {
    		dragged = true;
    		recalculate_credits($(this), $(ui.draggable).attr('title'));
    	}
    });
    
    Data.disableSelection();
}

function select_courses(Li) {
	Li.mousedown(function() {
		if ($(this).attr('class').indexOf('semester-header') < 0) {
			from = $(this).parent().children().first().children().first();	// The span of credits
		}
	});
	
	Li.click(function() {
		if (($(this).attr('class').indexOf('semester-header') < 0) && !dragged) {
			var clas = $(this).attr('class');
			var index1 = clas.indexOf(' ');
			var clas = clas.substring(index1+1);
			var id = clas.toLowerCase();
			
			var curr = document.getElementById(id).style.background;
		
			if (lastSelected == id) {	// It is already the selected one
				toWhite(id);
				hideRight();
				lastSelected = "";
			} else {
				toWhite(lastSelected);
				toColor(id);
				showRight(id);
				lastSelected = id;
			}
		} else {
			dragged = false;
		}
	});
}

function recalculate_credits(Semester, Title) {
	var to = Semester.children().first().children().first();
	
	if (to.parent().text() != from.parent().text()) {	// It is being moved between semesters
		var fromCredits = 0;
		var toCredits = 0;
		var index = Title.indexOf(' credits');
		var credits = +(Title.substring(0, index));
		
		for (var i = 0; i < from.parent().siblings().length; i++) {
			var li = from.parent().siblings()[i];
			if (typeof li == "object") {
				if (li.title) {
					index = li.title.indexOf(' credits');
					if (index > 0) fromCredits += +(li.title.substring(0, index));
				}
			}
		}
	
		for (var i = 0; i < to.parent().siblings().length; i++) {
			var li = to.parent().siblings()[i];
			
			if (li.title) {
				index = li.title.indexOf(' credits');
				if (index > 0) toCredits += +(li.title.substring(0, index));
			}
		}
		
		toCredits = toCredits + credits;
		fromCredits = fromCredits - credits;
		
		from.html("(" + fromCredits + " credits)");
		to.html("(" + toCredits + " credits)");
	}
}

function add_electives(Button) {
	Button.click(function(){
		var name = prompt("Please enter course name", "Elective");
		if (name != null) {	// They did not select Cancel
			var credits = prompt("Please enter the number of credits for " + name, "0");
			if (credits != null) {	// They did not select Cancel
				var id = $(this).prev().children().last().attr('id');
	
				document.getElementById(id).parentNode.innerHTML += '<li class="ui-default ELECTIVE'
					+ num + '" id="elective' + (num++) + '" title="' + credits + ' credits">' +
					name + '<button class="delete">-</button></li>';
			
				// Allow this new element to be dragged and dropped
				set_sorting($(document.getElementById(id).parentNode));
				
				// Reset prereq highlighting
				$('.semester>li').unbind();
				select_courses($(".semester>li"));
				
				// Reset deleting of any electives
				$("button.delete").unbind();
				delete_elective($("button.delete"));

				var semester = $(this).prev();
				add_credits(semester, credits);
			}	
		}
	});
}

function add_credits(Semester, Credits) {
	var span = Semester.children().first().children().first();
	var index = span.text().indexOf(' credits');
	var credits = +(span.text().substring(1, index));
	credits += +(Credits);
	span.text('(' + credits + ' credits)');
}

function delete_elective(Button) {
	Button.click(function(){
		var message = "Are you sure you want to delete " + $(this).prev().text() + "?";
		var confirm = window.confirm(message);
		
		if (confirm) {
			var id = $(this).parent().attr('id');		
			var html = document.getElementById(id).parentNode.innerHTML;
		
			var index1 = html.indexOf(id);
 			var html1 = html.substring(0, index1);
 			index1 = html1.lastIndexOf('<li');
 			html1 = html1.substring(0, index1);
 	 
 	 		var html2 = html.substring(index1);
			var index2 = html2.indexOf('</li>');
			html2 = html2.substring(index2+5);
			
			// Must be done before resetting the HTML (clearing the elective)
			var title = document.getElementById(id).title;
			index1 = title.indexOf(' credits');
			var credits = title.substring(0, index1);
			var semester = $(this).parent().parent();
			
			if (lastSelected == id) {	// It is selected for showing prereqs
				toWhite(id);
				hideRight();
				lastSelected = "";
			}

			// Clearing the elective
			document.getElementById(id).parentNode.innerHTML = html1 + html2;
			
			// Must be done after resetting the HTML (clearing the elective)
			remove_credits(semester, credits);
			
			// Reset prereq highlighting
			$('.semester>li').unbind();
			select_courses($(".semester>li"));
		}
	});
}

function remove_credits(Semester, Credits) {
	var span = Semester.children().first().children().first();
	var index = span.text().indexOf(' credits');
	var credits = +(span.text().substring(1, index));
	credits -= +(Credits);
	span.text('(' + credits + ' credits)');
}

function save(Button) {
	Button.click(function() {
		alert("Saving");
		
	});
}

function print(Button) {
	Button.click(function() {
//		alert("Printing");
		window.print();
//		alert("done");
	});
}

