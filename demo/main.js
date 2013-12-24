function ge$(d) {
	var x = document.getElementById(d);
	if (!x) {
		var y = document.getElementsByName(d);
		if (y.length>0) x = y[0];
	}
	return x;
}

function newWin(lnk) {
	var addr=lnk.getAttribute("href");
	window.open(addr);}

function BackBut() {
	var showb = true;

	if (!window.history)
		showb = false;
	else {
		if (navigator.appName.indexOf("Microsoft") != -1) {   // MSIE
			if (window.history.length == 0)
				showb = false ;
		} else {
			if (window.history.length == 1)    // Other
				showb = false;
		}
	}

	if (showb) {
		document.write('\n<div id="backdiv">');
		document.write('<a id="backbut" href=" " onclick="GoBack();return false;"></a>');
		document.write('</div>\n');
	}
}

function GoBack() {history.back(-1)}

function commas(num) {return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

var focused = '';
function closeBox(obj) {
	obj.style.display = 'none';
	if (focused != '') focused.focus();
}

function debug(txt) {window.console && console.log(txt);}

function endCursor(el) {
	el.focus();
	if (el.setSelectionRange) {
		var endPos = el.value.length;
		el.setSelectionRange(endPos, endPos);
	}
}

function enterToTab(obj,e) {
	var e = (typeof event!='undefined') ? window.event : e;	// IE : Mozilla 
	if (e.keyCode==13) {
		var q;
		var ele = document.forms[0].elements;
		for (var i=0, len=ele.length; i<len; i++) {
			q = (i==ele.length-1) ? 0: i+1;
			if (obj==ele[i]) {
				ele[q].focus();
				break;
			}
		}
		return false;
	}
}

function winScrollX() {
	var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	return x;}

function winScrollY() {
	var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	return y;}

function winHeight() {
	var wh = 460;
	if (document.body && document.body.offsetHeight)
		wh = document.body.offsetHeight;
	if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetHeight)
		wh = document.documentElement.offsetHeight;
	if (window.innerHeight)
		wh = window.innerHeight;
	return wh;
}

function winWidth() {
	var ww = 630;
	var sb = scrollBarWidth();
	if (document.body && document.body.offsetWidth)
		ww = document.body.offsetWidth - sb;
	if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth)
		ww = document.documentElement.offsetWidth - sb;
	if (window.innerWidth)
		ww = window.innerWidth - sb;
	return ww;
}

function scrollBarWidth() { 
	var inner = document.createElement('p');
	inner.style.cssText = "width:100%; height:200px;";

	var outer = document.createElement('div');
	outer.style.cssText = "position:absolute; top:0px; left:0px; width:200px; height:150px; visibility:hidden; overflow:hidden;";
	outer.appendChild (inner);

	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild (outer);

	return (w1 - w2);
}
