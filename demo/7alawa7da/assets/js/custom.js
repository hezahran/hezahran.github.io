// JavaScript Document
$(function(){

	var target = 'October 25, 2014'; 	// SET TARGET DATE HERE
	/************************************************/
	// Don't edit below this line
	// Initial digit position for each number graphic
	// 9-0
	var initialPos = [-450, -400, -350, -300, -250, -200, -150, -100, -50, 0];
	// 5-0 (first minute and second digit)
	var initialMidPos = [-250, -200, -150, -100, -50, 0];
	// 2-0 (first hour digit)
	var initialSmallPos = [-100, -50, 0];
	var classNames = ['يوم', 'ساعة', 'دقيقة', 'ثانية'];
	var idNames = ['d', 'h', 'm', 's'];
	var animationFrames = 5;
	var frameShift = 103;
	// If no number in URL (?date=1/1/11), then use default one
	target = (window.location.search == "") ? target : window.location.search.substring(6);
	// Starting numbers
	var now = new Date().getTime();
	var end = Date.parse(target);
	// Fix if date is in past
	if (end < now){
		end = Date.parse(target);
	}
	var theDiff = end-now;
	var theDiffString = getTimeString(theDiff);
	// Increment (count one second at a time)
	var increment = 1000;
	// Pace of counting in milliseconds (refresh digits every second)
	var pace = 1000;
	// Function that controls counting
	function doCount(){
		var x = getTimeString(theDiff);
		theDiff -= increment;
		var y = getTimeString(theDiff);
		if (theDiff <= 0){
			// Counter is done, do something
		}
		else{
			digitCheck(x,y);
		}
	}
	// This checks the old value vs. new value, to determine how many digits need to be animated.
	function digitCheck(x,y){
		var a = x.split(':');
		var b = y.split(':');
		for (var i = 0, c = a.length; i < c; i++){
			if (a[i].length < 2) a[i] = '0' + a[i];
			if (b[i].length < 2) b[i] = '0' + b[i];
			var countA = a[i].toString().length;
			var countB = b[i].toString().length;
			if (countB < countA) removeDigit(i, countB);
			for (var j = 0; j < countB; j++){
				if (b[i].charAt(j) != a[i].charAt(j)){
					var which = idNames[i] + j;
					animateDigit(which, a[i].charAt(j), b[i].charAt(j));
					//console.log(which + ' ' + a[i].charAt(j) + ' ' + b[i].charAt(j));
				}
			}
		}
		setTimeout(doCount, pace);
	}
	// Function to break the time into day:hour:minute:second
	function getTimeString(d){
		var diff = d;
		var days = Math.floor(diff / 86400000);
		diff -= days * 86400000;
		var hours = Math.floor(diff / 3600000);
		diff -= hours * 3600000;
		var minutes = Math.floor(diff / 60000);
		diff -= minutes * 60000;
		var seconds = Math.floor(diff / 1000);
		return days + ':' + hours + ':' + minutes + ':' + seconds;
	}
	// Looks in correct array to get the digit's position
	function getPos(id, digit){
		if (id == 's0' || id == 'm0'){
			return initialMidPos[digit];
		}
		else if (id == 'h0'){
			return initialSmallPos[digit];
		}
		else{
			return initialPos[digit];
		}
	}
	// Animation function
	function animateDigit(which, oldDigit, newDigit){
		var speed = 80;
		var pos = getPos(which, oldDigit);
		var newPos = getPos(which, newDigit);
		// Each animation is 5 frames long, and 103px down the background image.
		// We delay each frame according to the speed above.
		for (var k = 0; k < animationFrames; k++){
			pos -= frameShift;
			if (k == (animationFrames - 1)){
				$("#" + which).delay(speed).animate({'background-position': '0 ' + pos + 'px'}, 0, function(){
					// At end of animation, shift position to new digit.
					$("#" + which).css({'background-position': '0 ' + newPos + 'px'}, 0);
				});
			}
			else{
				$("#" + which).delay(speed).animate({'background-position': '0 ' + pos + 'px'}, 0);
			}
		}
	}
	// Remove digit
	function removeDigit(i,count){
		$("li#" + idNames[i] + count).remove();
	}
	// Sets the correct digits on load
	function initialDigitCheck(initial){
		// Creates the html
		var a = initial.split(':');
		for (var i = 0, c = a.length; i < c; i++){
			if (a[i].length < 2) a[i] = '0' + a[i];
			var count = a[i].toString().length;
			var html = '<div class="set"><ul class="' + classNames[i] + '">';
			var bit = count;
			for (var j = 0; j < count; j++){
				bit--;
				html += '<li id="' + idNames[i] + j + '"></li>';
				if (bit != 0 && bit != (count) && bit % 3 == 0) html += '<li class="comma"></li>';
			}
			html += '</ul><p>' + classNames[i] + '</p>';
			// If you don't like the ':' separator, remove the following line
			if (i != 3) html += '</div><div class="separator">:</div>';
			//
			$("#flip-container").append(html);
		}
		// Sets digits to the right number
		for (var n = 0, cn = a.length; n < cn; n++){
			count = a[n].toString().length;
			for (var m = 0; m < count; m++){
				var thisID = idNames[n] + m;
				var thisPos = getPos(thisID, a[n].charAt(m));
				$("#" + idNames[n] + m).css({'background-position': '0 ' + thisPos + 'px'});
			}
		}
		// Start counting
		doCount();
	}
	// Initialize
	initialDigitCheck(theDiffString);
});