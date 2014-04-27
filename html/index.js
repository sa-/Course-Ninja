var majors 		= new Array();
var minors 		= new Array();

//List of majors
var majList = [
	"Applied Mathematics B.S.",
	"Computer Science B.S.",
	"Computer Science B.A.",
	"German",
	"Mathematics (Honors) B.A.",
	"Mathematics B.S.",
	"Mathematics B.A.",
	"Philosophy B.A.",
	"Psychology B.A."
];

//List of minors
var minorList = [
	"Computer Science",
	"Mathematics",
	"Philosophy of Science",
	"Ethics",
	"History of Philosophy",
	"Psychology",
	"Psychology as a Natural Science",
	"Psychology as a Social Science",
	"Clinical Psychology",
	"Health Psychology",
	"Organizational Psychology",
	"Social and Emotional Development",
	"German"
];

function addMajor(name){
	if($.inArray(name, majList)>-1){
		majors.push(name);
		var html= "<ul>";
		for(i=0;i<majors.length;i++){
			html += "<li>" + majors[i] +" </li>";
		}
		html+="</ul>";
		document.getElementById('majorChooser').value = '';
		document.getElementById('majorList').innerHTML = html;
	}
	else{
		//Turn the box red or something.
	}
}

function addMinor(name){
	minors.push(name);
	var html= "<ul>";
	for(i=0;i<minors.length;i++){
		html += "<li>" + minors[i] +" </li>";
	}
	html+="</ul>";
	document.getElementById('minorChooser').value = '';
	document.getElementById('minorList').innerHTML = html;
}

function continueToNextPage(){
	window.location.assign("/customize.php?majors="+JSON.stringify(majors)+"&minors="+JSON.stringify(minors));
	//alert(JSON.stringify(majors));
}

$(function() {
	
	$( "#majorChooser" ).autocomplete({
		source: majList
	});

	
	$( "#minorChooser" ).autocomplete({
		source: minorList
	});

});
