var screenText = document.getElementById("timer-label");

var timer = {
	secondsRemaining: 25*60
};

timer.secondsRemaining -= 3;

var minutes = Math.floor(timer.secondsRemaining/60);
var seconds = timer.secondsRemaining%60;

screenText.innerHTML = `${minutes}:${seconds < 10 ? '0' 
						+ seconds.toString(): seconds}`;


