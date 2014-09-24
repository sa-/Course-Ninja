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
    buildMajorsList(null);
    $('#majorChooser').val("");
	}
	else{
		//Turn the box red or something.
	}
}

function addMinor(name){
	if($.inArray(name, minorList)>-1){
    minors.push(name);
    buildMinorsList(null);
    $('#minorChooser').val("");
  }
	else{
		//Turn the box red or something.
	}
}

// builds the majors list
// should be called iff an item is added or removed to/from the list
// removeItem = an object with an index and a name to be removed from the list (or null)
function buildMajorsList(removeItem) {
	var html= "";
	for(i=0;i<majors.length;i++){
    
    // if we have a to-be-removed item at this index, add a dummy li for it
    if (removeItem != null && removeItem.index == i) {
      html += buildListItem(" js-li-to-remove", removeItem.name);
    }
    // if this is a new item, give it a special class so it can be animated
    var classes = "";
    if (i+1 >= majors.length && removeItem == null) {
      classes += " js-li-to-add";
    }
    // add item to majors
		html += buildListItem(classes, majors[i], "removeMajor("+i+")");
	}
  // if we have a to-be-removed item after the end of the list, add a dummy li for it
  if (removeItem != null && removeItem.index >= majors.length) {
      html += buildListItem(" js-li-to-remove", removeItem.name);
  }
  
  // update the document
	$('#majorList').html(html);
  animateListItems();
}

// builds the minors list
// should be called iff an item is added or removed to/from the list
// removeItem = an object with an index and a name to be removed from the list (or null)
function buildMinorsList(removeItem) {
	var html= "";
	for(i=0;i<minors.length;i++){
    
    // if we have a to-be-removed item at this index, add a dummy li for it
    if (removeItem != null && removeItem.index == i) {
      html += buildListItem(" js-li-to-remove", removeItem.name);
    }
    // if this is a new item, give it a special class so it can be animated
    var classes = "";
    if (i+1 >= minors.length && removeItem == null) {
      classes += " js-li-to-add";
    }
    // add item to list
		html += buildListItem(classes, minors[i], "removeMinor("+i+")");
	}
  // if we have a to-be-removed item after the end of the list, add a dummy li for it
  if (removeItem != null && removeItem.index >= minors.length) {
      html += buildListItem(" js-li-to-remove", removeItem.name);
  }
  
  // update the document
	$('#minorList').html(html);
  animateListItems();
}

// shortcut for buildListItem(classes,name,onclick) with no onclick
function buildListItem(classes,name) {
  return buildListItem(classes,name,null);
}

// generates HTML for a list item
// classes = extra classes to add
// name = name of item to be displayed to user
// onclick = some JS to run when the li is clicked (or null)
function buildListItem(classes,name,onclick) {
  var li = "<li class=\"list-group-item" + classes + "\"";
  if (onclick != null) {
    li += " onclick=\"" + onclick + "\"";
  }
  li += "><a class=\"text-warning pull-right js-remove-li-btn remove-li-btn\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\"><span class=\"glyphicon glyphicon-remove\"></span></a> " + name + " </li>";
  return li;d
}

// executes list item animations
function animateListItems() {
  $(".js-li-to-remove").slideUp();
  $(".js-li-to-add").slideDown(function() {
    $(this).css("display", "block");
  });
  listenRemoveLiBtn();
}

function removeMajor(index) {
  var removedItem = majors.splice(index, 1)[0];
  buildMajorsList({name: removedItem, index: index});
}

function removeMinor(index) {
  var removedItem = minors.splice(index, 1)[0];
  buildMinorsList({name: removedItem, index: index});
}

function continueToNextPage(){
  if (majors.length == 0 && minors.length == 0) {
    $('#modalNothingSelected').modal('show');
    return;
  }
	window.location.assign("customize.php?majors="+JSON.stringify(majors)+"&minors="+JSON.stringify(minors));
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

function listenRemoveLiBtn() {
  $(".js-remove-li-btn").hover(
    function() {
      ($(this).parents(".list-group-item")).addClass("list-group-item-danger");
      $('#element').tooltip('show');
    }, function() {
      ($(this).parents(".list-group-item")).removeClass("list-group-item-danger");
      $('#element').tooltip('hide');
    }
  );
  $(".js-remove-li-btn").tooltip();
}
listenRemoveLiBtn();