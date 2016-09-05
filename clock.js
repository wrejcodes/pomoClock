var screenText = document.getElementById("timer-label");
var statusLabel = document.getElementById("status-label");
var startButton = document.getElementById("start");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var resetButton = document.getElementById("reset");
var regular = document.getElementById("default");

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
	"long" : 1,
	"custom" :2
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
	timer.workTime = 25*60;
	timer.breakTime = 5*60;
	timer.secondsRemaining = 0;		
	timer.state = timer.state ? state.REST : state.WORK;

};

var longTime = function(){
	timer.workTime = 60*60;
	timer.breakTime = 12*60;
	timer.secondsRemaining = 0;
	timer.state = timer.state ? state.REST : state.WORK;
};

startButton.addEventListener("click",startTimer,false);
resetButton.addEventListener("click",reset,false);



document.getElementById("options").addEventListener("click",function(e){
	if(e.target && e.target.nodeName == "LI"){
		clearSelected();
		$(e.target).addClass("selected");
		alert(options[e.target.id]);
		switch(options[e.target.id]){
			case options["default"] : defaultTime();
									  break;
			case options["long"] : longTime();
									break;
			case options["custom"] : customTime();
									 break;
		}
		updateLabel();
	}
});

