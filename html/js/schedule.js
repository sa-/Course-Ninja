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

// from http://jarrin.net/viewportDetect
/*!
* viewportDetect Plugin
* v1.0 [jj 13Dec18]
*
* returns the current viewport ("xs", "sm", "md", or "lg")
* $.viewportDetect() 
*
* create a callback function that is called whenever the viewport changes
* $.viewportDetect(function(currentViewport, previousViewport) { }); 
*/

$(document).ready(function () {
	// create some unobtrusive dom that bootstrap will show and hide depending on its media queries
	$("body").append("<div id=\"viewportDetect\"><div class=\"visible-xs\" data-viewport=\"xs\"></div><div class=\"visible-sm\" data-viewport=\"sm\"></div><div class=\"visible-md\" data-viewport=\"md\"></div><div class=\"visible-lg\" data-viewport=\"lg\"></div></div>");

	/* examples
	// simply log the current viewport size every two seconds
	setInterval(function () { 
		console.log("interval: " + $.viewportDetect());	},
	2000);

	// a callback fn that gets called whenever the viewport changes
	$.viewportDetect(function (vp, prevVp) {
		console.log("onChange: " + prevVp + " -> " + vp);
	});
	*/
});

(function ($) {
	var _currentViewport = "";

	$.viewportDetect = function(onChange) {
		if (arguments.length == 0) {
			return $("#viewportDetect div:visible").data("viewport");
		} 

		// onChange is a function we want to call whenever the viewport changes
		$(window).resize(function () {
			var viewport = $("#viewportDetect div:visible").data("viewport");
			if (_currentViewport == "") _currentViewport = viewport; // the first change is not really a change at all

			if (_currentViewport != viewport) {
				var prevViewport = _currentViewport;
				_currentViewport = viewport;
				onChange(_currentViewport, prevViewport);
			}
		});
	};

})(jQuery);

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};








/**
 * OUR CODE
 */

//getting fun stuff from javascript.
populateHTML();

var schedule;

$('.semester').sortable({
  connectWith: ".semester",
  cursor: "move",
  revert: 100,
  distance: 10,
  handle: updateCourseHandles(false),
  receive: function(event,ui) {
    updateCredits();
  },
  start: function(event,ui) {
    ui.item.addClass('noclick');
  }
}).disableSelection();

$.viewportDetect(function (currentViewport, previousViewport) {
  updateCourseHandles(true);
});

function updateCourseHandles(sortableReady) {
  
  // don't bother with handles on a non-touch device
  if (!Modernizr.touch) {
    $(".handle-course").removeClass("visible-xs-inline");
    $(".handle-course").addClass("hidden");
    return false;
  }
  
  if ($(".handle-course").css("display") == "none") {
    if (sortableReady) {
      $(".semester").sortable("option", "handle", false);
    }
    return false;
    
  } else {
    if (sortableReady) {
      $( ".semester" ).sortable("option", "handle", ".handle-course");
    }
    return ".handle-course";
    
  }
}


$('.course-collapse').collapse({
  parent: '.semester',
  toggle: false
})

$('.course').click(function() {
  if ($(this).hasClass('noclick')) {
    $(this).removeClass('noclick');
  } else {
    var collapseBox = $(this).find('.course-collapse');
    collapseBox.collapse('toggle');
  }
});
  
$(".semesters").tooltip({
  selector: '.course-credits',
  placement: 'auto top',
  container: 'body'
});




function getElectiveAnimationSpeed() { return 250; }

$('.btn-add-elective-unhide').click(function() {
  var container = $(this).parents(".add-elective-container");
  var hiddenBox = container.find(".hidden-add-elective");
  
  var unhideBox = container.find('.btn-add-elective-unhide-container');
  unhideBox.hide("slide", {
    direction: "left"
  }, getElectiveAnimationSpeed());
  unhideBox.queue(function() {
    hiddenBox.show("slide", {
      direction: "left"
    }, getElectiveAnimationSpeed());
    $(this).dequeue();
  });
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
  
  hiddenBox.hide("slide", {
    direction: "left"
  }, getElectiveAnimationSpeed());
  hiddenBox.queue(function() {
    container.find('.btn-add-elective-unhide-container').show("slide", {
      direction: "left"
    }, getElectiveAnimationSpeed());
    $(this).dequeue();
  });
  
  nameField.val("");
  creditsField.val("");
  
  updateCredits();
});

$('.btn-add-elective-cancel').click(function() {
  
  var container = $(this).parents(".add-elective-container");
  var hiddenBox = container.find(".hidden-add-elective");
  var nameField = container.find(".input-add-elective-name");
  var creditsField = container.find(".input-add-elective-credits");
  
  hiddenBox.hide("slide", {
    direction: "left"
  }, getElectiveAnimationSpeed());
  hiddenBox.queue(function() {
    container.find('.btn-add-elective-unhide-container').show("slide", {
      direction: "left"
    }, getElectiveAnimationSpeed());
    $(this).dequeue();
  });
  
  nameField.val("");
  creditsField.val("");
});
  
$(".add-elective-container").tooltip({
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



function getHandleCourseHtml() {
  return '<span class="handle-course visible-xs-inline label label-primary is-movable pull-right"><span class="glyphicon glyphicon-resize-vertical"></span></span>';
}

function getCreditsBadgeHtml(credits) {
  return '<span class="badge course-credits" data-toggle="tooltip" title="' + credits + ' credits">' + credits + '</span>';
}


function getElectiveHtml(name, credits) {
  //TODO keep a list of electives and assign every elective a unique ID
  var html = "";
  html += '<li class="list-group-item course course-elective">';
  html += name;
  html += getHandleCourseHtml();
  html += getCreditsBadgeHtml(credits);
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
    creditSpan.html(creditsInSem + " credits");
    if (creditsInSem > 19) {
      panel.removeClass("panel-primary");
      panel.addClass("panel-danger");
    } else {
      panel.addClass("panel-primary");
      panel.removeClass("panel-danger");
    }
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
      if (j != 0) {
        html += '</div>'; // end of div.year
      }
      html += '<div class="year-container"><h2 class="year-title col-sm-12">' + YEAR_NAMES[j/2] + '</h2>';
    }
    
    
    html += '<div class="col-sm-6 print-change-6">';
		html += '<div class="panel panel-primary semester-panel sem' + j + '">';
    html += '<div class="panel-heading">' + (j%2==0 ? "Fall" : "Spring") + ' <span class="credit-total text-muted pull-right"></span>' + '</div>';
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
      
			html += '>';
      html += getHandleCourseHtml();
      html += getCreditsBadgeHtml(course.credits);
      html += getCourseDisplayName(course);
      
      
      
      html += '<div class="collapse course-collapse">';
      html += '<div class="well well-sm course-collapse-well">';
      
      if (course.pre != null && course.pre.length > 0) {
        html += 'Prerequisites:<ul>';
        for (var k = 0; k < course.pre.length; k++) {
          if(schedule.courses[course.pre[k]] != null){ // This null check is a workaround. Not sure what the bug is.
            html += '<li>' + schedule.courses[course.pre[k]].name + '</li>';
          }
        }
        html += '</ul><br>';
      }
      
      html += '<a href="http://www.skedgeur.com/?q=' + course.name + '"  target="_blank" class="btn btn-default btn-xs">skedge <span class="glyphicon glyphicon-new-window"></span></a>';
      html += '</div>';
      
      
      
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
  html += '</div>'; // end of the final div.year

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
  $('.hide-during-print').addClass('hide-during-print-active');
}

function afterPrint() {
  $('.print-change-6').removeClass('col-xs-6');
  $('.hide-during-print').removeClass('hide-during-print-active');
}

/**
 * Calling beforePrint() and afterPrint() in this function seems like it's 
 * redundant with setting the window.onbeforeprint and window.onafterprint 
 * methods, and indeed it is! However, only IE and Firefox support those 
 * window methods, so the redundancy is necessary for the print button to 
 * work in other browsers
 */
function cleanPrint() {
  beforePrint();
  window.print();
  afterPrint();
}

// set listener for print buttons
$('#btnPrint').click(function() {
  cleanPrint();
});

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
