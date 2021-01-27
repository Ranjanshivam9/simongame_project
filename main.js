//  purpose of the code bellow is to creat a stack for pattern that tghe game will use
//  it will start with one color will add to stack and will
//  loop through all the color and it will seem like a pattern

//  array fo  all the colors of the box
var buttonColors = [ 'yellow', 'blue', 'cyan', 'orange', 'pink', 'green' ];

// empty array to hold the pattern of the game
var gamePattern = [];

// Pattern clicked by user .
var userPattern = [];

//  var to define if game is started or not and what level is this
var started = false;
var level = 1;

$(document).keypress(function () {
	if (!started) {
		newSequence();
		started = true;
		userClick();
	}
});

function newSequence () {
	userPattern = [];
	$('#level-title').text('Level ' + level);

	level++;
	//  Generating random b/w 0-3 (4) Or it should be equal to the number of boxes
	var randomNumber = Math.floor(Math.random() * 6);

	//  Using the random number to push a new color into the stack
	var randomColor = buttonColors[randomNumber];

	gamePattern.push(randomColor);

	//  below method was not working as all the elements were animating at the same time async and callback animate did work
	// after 5 hours of researching

	// looping to animate the whole pattern for displaying to the user

	// for (let i = 0; i < gamePattern.length; i++) {
	// 	const element = gamePattern[i];
	// 	$('#' + element).delay(i * 500).fadeOut(100).fadeIn(100);
	// Animation complete.
	// }

	//  Another way of doing looping arrays in jquery

	// $.each(gamePattern, function (index, value) {
	// 	$('#' + value).fadeOut(100).fadeIn(100);
	// });

	//  can also use .fadeIn fadeOut also
	animatePattern(gamePattern, index);
}

//  index to help animate the buttons
var index = 0;

//  function to show the complete animation for the pattern
function animatePattern (arr, index) {
	$('#' + arr[index])
		.delay(200)
		.animate({ opacity: '.2' }, 200)
		.animate({ opacity: '1' }, 200, function () {
			if (index < arr.length) {
				index++;
				animatePattern(arr, index);
			}
		});
}
//

//  function to start the user click !!!
function userClick () {
	$('.btn').click(function () {
		// CLicked by user xD
		var userColor = $(this).attr('id');
		userPattern.push(userColor);

		animatePress(userColor);
		// checking answer for every input
		checkAnswer(userPattern.length - 1);
	});
}

function checkAnswer (answer) {
	if (gamePattern[answer] === userPattern[answer]) {
		if (userPattern.length === gamePattern.length) {
			setTimeout(function () {
				newSequence();
			}, 1000);
		}
	}
	else {
		$('body').addClass('game-over');
		$('#level-title').text('Game Over');
		$('.btn').addClass('game-over-btn');
		$('button').css('display', 'inline-block');

		// dding event listen to restart the game !!!
		$('button').click(function () {
			location.reload();
			// don't need any function to restart as
		});
	}
}
function animatePress (userColor) {
	var card = $('#' + userColor);
	// can also use this to animate the random pattern too xD
	card.toggleClass('flipped');

	// $('#' + userColor).animate({ opacity: '.2' }, 200).animate({ opacity: '1' }, 200);
}
