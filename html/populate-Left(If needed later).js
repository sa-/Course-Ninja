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
