function getMajors() {
  return JSON.parse(sessionStorage.getItem("majors"));
}

function setMajors(val) {
  sessionStorage.setItem("majors", JSON.stringify(val));
}

function getMinors() {
  return JSON.parse(sessionStorage.getItem("minors"));
}

function setMinors(val) {
  sessionStorage.setItem("minors", JSON.stringify(val));
}

var BUILD_LIST_NO_CHANGE = {name:null, index:-1};

if (!sessionStorage.majors) {
  setMajors(new Array());
}
if (!sessionStorage.minors) {
  setMinors(new Array());
}

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
	if($.inArray(name, majList)>-1 && !($.inArray(name, getMajors())>-1)){
    var majors = getMajors();
    majors.push(name);
    setMajors(majors);
    buildMajorsList(null);
    $('#majorChooser').val("");
	}
	else{
		//Turn the box red or something.
	}
}

function addMinor(name){
	if($.inArray(name, minorList>-1) && !($.inArray(name, getMinors())>-1)){
    var minors = getMinors();
    minors.push(name);
    setMinors(minors);
    buildMinorsList(null);
    $('#minorChooser').val("");
  }
	else{
		//Turn the box red or something.
	}
}

// builds the majors list
// should be called iff an item is added or removed to/from the list
// 
// removeItem = an object with an index and a name to be removed from the list
//              should be null if an object is being added
//              should be BUILD_LIST_NO_CHANGE if the list has not been changed
function buildMajorsList(removeItem) {
  var majors = getMajors();
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
// 
// removeItem = an object with an index and a name to be removed from the list
//              should be null if an object is being added
//              should be BUILD_LIST_NO_CHANGE if the list has not been changed
function buildMinorsList(removeItem) {
  var minors = getMinors();
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
  var li = "<li class=\"list-group-item list-group-item-info " + classes + "\"><a";
  if (onclick != null) {
    li += " onclick=\"" + onclick + "\"";
  }
  li += " class=\"pull-right js-remove-li-btn remove-li-btn\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Delete\"><span class=\"glyphicon glyphicon-remove\"></span></a> " + name + " </li>";
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
  var majors = getMajors();
  var removedItem = majors.splice(index, 1)[0];
  setMajors(majors);
  buildMajorsList({name: removedItem, index: index});
}

function removeMinor(index) {
  var minors = getMinors();
  var removedItem = minors.splice(index, 1)[0];
  setMinors(minors);
  buildMinorsList({name: removedItem, index: index});
}

// preps listeners for list item remove buttons
function listenRemoveLiBtn() {
  $(".js-remove-li-btn").hover(
    function() {
      ($(this).parents(".list-group-item")).addClass("list-group-item-danger");
      ($(this).parents(".list-group-item")).removeClass("list-group-item-info");
    }, function() {
      ($(this).parents(".list-group-item")).removeClass("list-group-item-danger");
      ($(this).parents(".list-group-item")).addClass("list-group-item-info");
    }
  );
  $(".js-remove-li-btn").tooltip();
}

function continueToNextPage(){
  if (getMajors().length == 0 && getMinors().length == 0) {
    $('#modalNothingSelected').modal('show');
    return;
  }
	window.location.assign("customize.php?majors="+JSON.stringify(getMajors())+"&minors="+JSON.stringify(getMinors()));
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

$("#resetBtn").click(function() {
  
  // only do a reset if another reset is not currently in progress
  if ($(".js-fade-on-reset-home").css("opacity") == 1) {
    var TRANSITION_EFFECT = "fade";
    $(".js-fade-on-reset-home").hide(TRANSITION_EFFECT);
    $(".js-fade-on-reset-home").queue(function() {
        setMajors(new Array());
        setMinors(new Array());
        buildMajorsList(BUILD_LIST_NO_CHANGE);
        buildMinorsList(BUILD_LIST_NO_CHANGE);
        $(this).dequeue();
      })
    $(".js-fade-on-reset-home").show(TRANSITION_EFFECT);
  }
});

listenRemoveLiBtn();
buildMajorsList(BUILD_LIST_NO_CHANGE);
buildMinorsList(BUILD_LIST_NO_CHANGE);