/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);



//getting fun stuff from javascript.
populateHTML();

$('.semester').sortable({
  connectWith: ".semester",
  revert: 100,
  distance: 10,
  receive: function(event,ui) {
    updateCredits();
  }
}).disableSelection();


$('.btn-add-elective-unhide').click(function() {
  var container = $(this).parents(".add-elective-container");
  var hiddenBox = container.find(".hidden-add-elective");
  
  hiddenBox.show("slide", {
    direction: "left"
  });
  container.find('.btn-add-elective-unhide-container').css("display","none");
});

$('.btn-add-elective-submit').click(function() {
  
  var container = $(this).parents(".add-elective-container");
  var hiddenBox = container.find(".hidden-add-elective");
  var nameField = container.find(".input-add-elective-name");
  var creditsField = container.find(".input-add-elective-credits");
  
  var name = nameField.val();
  var credits = creditsField.val();
  
  //TODO make sure both fields were actually filled with valid values
  
  var electiveHtml = getElectiveHtml(name,credits);
  $(this).parents(".semester-panel").find(".semester").append(electiveHtml);
  
  container.find('.btn-add-elective-unhide-container').show("slide", {
    direction: "left"
  });
  hiddenBox.css("display","none");
  
  nameField.val("");
  creditsField.val("");
  
  updateCredits();
});

$('.btn-add-elective-cancel').click(function() {
  
  var container = $(this).parents(".add-elective-container");
  var hiddenBox = container.find(".hidden-add-elective");
  var nameField = container.find(".input-add-elective-name");
  var creditsField = container.find(".input-add-elective-credits");
  
  container.find('.btn-add-elective-unhide-container').show("slide", {
    direction: "left"
  });
  hiddenBox.css("display","none");
  
  nameField.val("");
  creditsField.val("");
});
  
$("body").tooltip({
  selector: '.btn-add-elective',
  placement: 'auto top'
});

/*set_collapse($("img.collapse"));
set_expand($("img.expand"));

set_sorting($(".semester"));
select_courses($(".course"));

add_electives($("button.addElective"));
//	delete_elective($("button.delete"));
save($("#save"));
print($("#print"));


var lastSelected = "";
var num = 1;
var from = null;
var dragged = false;*/


function getElectiveHtml(name, credits) {
  //TODO keep a list of electives and assign every elective a unique ID
  var html = "";
  html += '<li class="list-group-item course course-elective">';
  html += name;
  html += '<span class="badge pull-right course-credits">' + credits + '</span>';
  html += '</li>';
  return html;
}

// updates the credit totals of every semester
function updateCredits() {
  $(".semester").each(function(index) {
    var semester = $(this);
    
    var panel = semester.parents(".semester-panel");
    var creditSpan = panel.find(".credit-total");
    var coursesInSem = semester.children(".course");
    
    var creditsInSem = 0;
    coursesInSem.each(function(index) {
      var courseCredits = parseInt($(this).find(".course-credits").html());
      if (!isNaN(courseCredits)) {
        creditsInSem += courseCredits;
      }
    });
    creditSpan.html(creditsInSem);
  });
}


function populateHTML() {
	populateCenter();
}

function populateCenter() {
	var all_courses = schedule.courses;
	var col_num, year, semester, sem_courses, course;
	var html = "";
  
  var YEAR_NAMES = ["Freshman", "Sophomore", "Junior", "Senior"];

	html += '<div class="semesters row">';
	
	for (var j = 0; j<8;j++) {
		semester = schedule.semesters[j];
		sem_courses = semester.courses;
    
    if (j % 2 == 0) {
      html += '<div class="clearfix"></div>';
      html += '<h2 class="year-title">' + YEAR_NAMES[j/2] + '</h2>';
    }
    
    
    html += '<div class="col-sm-6 print-change-6">';
		html += '<div class="panel panel-primary semester-panel sem' + j + '">';
    html += '<div class="panel-heading">' + (j%2==0 ? "Fall" : "Spring") + ' (<span class="credit-total"></span> credits)' + '</div>';
		html += '<ul class="list-group semester">';
    
		//var html2 = "";
		for (var i in sem_courses) {
			course = all_courses[sem_courses[i]];

			html += '<li class="list-group-item course';
			if (course.clas != null)
				html += ' ' + course.clas;
		
			//html2 += '" title="' + course.credits + ' credits"';
	
			if (course.id != null)
				html += '" id="' + course.id + '"';
      
      //TODO since the badges don't work on small screens, find some other way to convey credits
			html += '><span class="badge course-credits">' + course.credits + '</span>';
      html += getCourseDisplayName(course);
      
      html += '<div class="collapse course-collapse">';
      html += '<p>';
      
      if (course.pre != null && course.pre.length > 0) {
        html += 'Prerequisites:<ul>';
        for (var k = 0; k < course.pre.length; k++) {
          html += '<li>' + course.pre[k] + '</li>';
        }
        html += '</ul><br>';
      }
      
      html += '<a href="http://www.skedgeur.com/?q=' + course.name + '"  target="_blank" class="btn btn-default btn-xs">skedge <span class="glyphicon glyphicon-new-window"></span></a></p>'
      html += '</div></li>';
		}
		html += '</ul>';
    
    // add electives
		html += '<div class="panel-footer hidden-print add-elective-container">';
    html += '<div class="hidden-add-elective form-inline" style="display:none;">';
    html += '<div class="form-group"><input type="text" placeholder="Course name" class="form-control input-add-elective-name"></div>';
    html += '<div class="form-group"><input type="number" placeholder="Cr." class="form-control input-add-elective-credits" min="0" max="99" step="1" maxlength="2"></div>';
    html += '<div class="form-group"><button data-toggle="tooltip" title="Add elective" class="btn btn-success btn-add-elective btn-add-elective-submit"><span class="glyphicon glyphicon-plus"></span><span class="visible-xs-inline"> Add</span></button></div>';
    html += '<div class="form-group"><button data-toggle="tooltip" title="Cancel" class="btn btn-warning btn-add-elective btn-add-elective-cancel"><span class="glyphicon glyphicon-remove"></span><span class="visible-xs-inline"> Cancel</span></button></div>';
    html += '</div>';
    html += '<div class="btn-add-elective-unhide-container"><button class="btn btn-success btn-add-elective-unhide"><span class="glyphicon glyphicon-plus"></span> Elective</button></div>';
    html += '</div>';
    
		html += '</div></div>';
	}

	html += '</div>';
	$("#schedule").html(html);
  updateCredits();
}

function getCourseDisplayName(course) {
  return course.name + ': ' + course.title;
}



/**
 * PRINTING EXPLANATION
 *
 * Okay so basically, browsers are really stupid and don't have a good 
 * standard for printing things; as a result, a lot of them end up using 
 * Bootstrap's XS layout intended for mobile phones when printing, which 
 * looks awful and uses up a lot of paper.
 * 
 * So as a workaround, when the user hits the print button, we change it 
 * so that elements have the same width on XS that they do in other 
 * viewports, print the page, and then change the widths back before the 
 * user sees the XS layout become ridiculously cramped. It ain't pretty 
 * but it works, goddammit!
 */

function beforePrint() {
  $('.print-change-6').addClass('col-xs-6');
}

function afterPrint() {
  $('.print-change-6').removeClass('col-xs-6');
}

/**
 * Calling beforePrint() and afterPrint() in this function seems like it's 
 * redundant with setting the window.onbeforeprint and window.onafterprint 
 * methods, and indeed it is! However, only IE and Firefox support those 
 * window methods, so the redundancy is necessary for the print button to 
 * work in other browsers
 */
function myprint() {
  beforePrint();
  window.print();
  afterPrint();
}
// this totally shouldn't work but it does
window.print = myprint;

// set listener for print buttons
$('#btnPrint').click(myprint);

//set before/after print listeners (unfortunately only in IE and Firefox)
window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;



/**
*collapses the review the user clicked on
*/
/*function set_collapse(UpArrow){
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
			//console.log(id);
      
      //$(this).find("collapse").collapse('toggle');
      
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
}*/

/*$('body').popover({
  title: "Untitled Course",
  content: "No data available",
  placement: "auto top",
  html: true,
  selector: ".course:not(.ui-sortable-helper)",
  trigger: "click"
});*/
