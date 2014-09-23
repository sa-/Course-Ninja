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
		var html= "";
		for(i=0;i<majors.length;i++){
			html += "<li class=\"list-group-item\">" + majors[i] +" </li>";
		}
		html+="";
		document.getElementById('majorChooser').value = '';
		document.getElementById('majorList').innerHTML = html;
	}
	else{
		//Turn the box red or something.
	}
}

function addMinor(name){
	minors.push(name);
	var html= "";
	for(i=0;i<minors.length;i++){
		html += "<li class=\"list-group-item\">" + minors[i] +" </li>";
	}
	document.getElementById('minorChooser').value = '';
	document.getElementById('minorList').innerHTML = html;
}

function continueToNextPage(){
	window.location.assign("customize.php?majors="+JSON.stringify(majors)+"&minors="+JSON.stringify(minors));
	//alert(JSON.stringify(majors));
}


$( "#majorChooser" ).autocomplete({
  source: majList,
  select: function( event, ui ) {
    event.preventDefault();
    addMajor(ui.item.value);
  }
});

$( "#minorChooser" ).autocomplete({
  source: minorList,
  select: function( event, ui ) {
    event.preventDefault();
    addMinor(ui.item.value);
  }
});


$("#majorChooserAddBtn").click(function() {
  addMajor($('#majorChooser').val());
});

$("#minorChooserAddBtn").click(function() {
  addMinor($('#minorChooser').val());
});

$("#continueBtn").click(function() {
  continueToNextPage();
});