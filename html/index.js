var majors 		= new Array();
var minors 		= new Array();

//List of majors
var majList = [
	"Computer Science B.S.",
	"Computer Science B.A.",
	"German",
	"Mathematics B.S."
];

//List of minors
var minorList = [
	"Computer Science",
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
