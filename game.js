
//var audio = new Audio('audio_file.mp3');
//audio.play();

// array of elements to be clicked on
var fields;

// sounds by 44932__digifishmusic freesounbd.org
var sounds = [new Audio('solfege-la-short.wav'),
			new Audio('solfege-la-short-high.wav'),
			new Audio('solfege-la-short-low.wav'),
			new Audio('solfege-la-short-high2.wav')];

// mooh by 58277__benboncan freesound.org
var mooh = new Audio('cow.wav');

// this array will save the pattern to be clicked
var round = [];
// this is the cursor, which points to the position we're at in the round array
var currentRound = 0;

var hardcore = false;
var hardcoreJump = 2;

// this holds the game state and makes buttons clickable
var gameState = "repeat" //start, listen, repeat, gameOver


// this will wire the field and button clicks
function callbacks(){
	// retrieve all clickable fields
	fields = document.querySelectorAll(".field")

	// wire them up
	for (var i = 0; i < fields.length; i++) {
		// some fancy anonymous shit
		(function(){
			var num = i;
			fields[i].addEventListener('click', function(e){fieldClicked(e,num)});
		}());
	};

	// wire the restart button
	document.getElementById("btnRepeat").addEventListener("click", restart)

	//hardcore toggle
	document.getElementById("hardcoreToggle").addEventListener("click", function(){
		hardcore = !hardcore;

		if (hardcore){
			this.innerHTML = "I'm a beginner."
		}
		else{
			this.innerHTML = "I'm not a beginner."
		}
	});
}

// this happens every time a field is clicked.
// checks whether the right field is clicked, if so moves the currentRound up to the next number
function fieldClicked(e, fieldNumber){
	// repeat mode(repeat after)
	if (gameState=="repeat"){
		// is the right field
		if (round[currentRound] == fieldNumber){

			sounds[fieldNumber].pause();
			sounds[fieldNumber].currentTime = 0;
			sounds[fieldNumber].play();
			// go to next field
			currentRound++;
			// if the round is over, create a new one
			if (currentRound == round.length)
				setTimeout(newRound,500);

		}
		else
		{
			// you lost, show message
			currentRound = 0;
			gameState = "gameOver";

			mooh.play();
			
			document.getElementById("messageWrong").classList.add("show");
		}
	}
}

// this function creates a new round, and then triggers play
function newRound(){
	currentRound = 0;
	gameState = "listen";

	for (var i = 0; i < hardcoreJump; i++) {
		round.push(Math.floor(Math.random()*4));
		if (!hardcore)
			i = hardcoreJump
	};

	console.log("new round:")
	console.log(round);

	playRound();
}

function playRound(){
	currentRound = 0;

	
	setTimeout(hideColors, 300);
}

function restart(){
	round = [];
	currentRound = 0;

	document.getElementById("messageWrong").classList.remove("show");
	setTimeout(newRound, 500);
}

function showColor(){
	if (currentRound < round.length){
		fields[round[currentRound]].classList.add("active");
		sounds[round[currentRound]].pause();
		sounds[round[currentRound]].currentTime = 0;
		sounds[round[currentRound]].play();
	}

	currentRound++;
	setTimeout(hideColors, 300);
};
function hideColors(){
	for (var i = 0; i < fields.length; i++) {
		fields[i].classList.remove("active");
	};

	if (currentRound == round.length){
		gameState = "repeat";
		currentRound = 0;
		return;
	}
	setTimeout(showColor, 100);
};

//fire
callbacks();
newRound();