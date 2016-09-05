var screenText = document.getElementById("timer-label");
var statusLabel = document.getElementById("status-label");
var startButton = document.getElementById("start");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var resetButton = document.getElementById("reset");
var regular = document.getElementById("default");
var saveChanges = document.getElementById("saveChanges");

var state = {
	WORK:1,
	REST:0,
};

var timer = {
	secondsRemaining: 25*60,
	state: state.WORK,
	workTime: 25*60,
	breakTime: 5*60,
	running: false,
	ID: null
};

var options = {
	"default" : 0,
	"long" : 1
};

var updateLabel = function(){
	if(timer.secondsRemaining == 0){
		switch(timer.state){
			case state.WORK : timer.secondsRemaining = timer.breakTime + 1;
							  timer.state = state.REST;
							  statusLabel.innerHTML = "Break";
							  break;
			case state.REST : timer.secondsRemaining = timer.workTime + 1;
							  timer.state = state.WORK;
							  statusLabel.innerHTML = "Work";
							  break;
		}
	}
	timer.secondsRemaining -= 1;
	var minutes = Math.floor(timer.secondsRemaining/60);
	var seconds = timer.secondsRemaining%60;
	screenText.innerHTML = `${minutes}:${seconds < 10 ? '0' 
						+ seconds.toString(): seconds}`;
};


var startTimer = function(){
	if(!timer.running){
		timer.ID = window.setInterval(updateLabel,1000);
		timer.running = true;
		pause.className = "fa fa-pause";
		play.className = "fa fa-play current";
	} else {
		clearTimeout(timer.ID);
		timer.running = false;
		play.className = "fa fa-play";
		pause.className = "fa fa-pause current";
	}
};

var reset = function(){
	switch(timer.state){
		case state.WORK : timer.secondsRemaining = timer.workTime + 1;
						  updateLabel();
						  break;
		case state.REST : timer.secondsRemaining = timer.breakTime + 1;
						  updateLabel();
						  break;
	}
};

var clearSelected = function(){
	regular.className = "";
	long.className = "";
	custom.className = "";
};

var defaultTime = function(){
	setTimes(25,5);
};

var longTime = function(){
	setTimes(60,12);
};

var setTimes = function(newWork, newBreak){
	timer.workTime = newWork*60;
	timer.breakTime = newBreak*60;
	timer.secondsRemaining = 0;
	timer.state = timer.state ? state.REST : state.WORK;
	updateLabel();
}
var save = function(){
	var customWork = document.getElementById("work-minutes").value;
	var customBreak = document.getElementById("break-minutes").value;
	if(!customWork || !customBreak){
		alert("You must input a value!");
	} else {
		setTimes(customWork,customBreak);
		$('#customTime').modal('hide');
	}
};

startButton.addEventListener("click",startTimer,false);
resetButton.addEventListener("click",reset,false);
saveChanges.addEventListener("click",save,false);



document.getElementById("options").addEventListener("click",function(e){
	if(e.target && e.target.nodeName == "LI"){
		clearSelected();
		$(e.target).addClass("selected"); 
		switch(options[e.target.id]){
			case options["default"] : defaultTime();
									  break;
			case options["long"] : longTime();
									break;
		}
	}
});

