var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(document).keypress(function(event) {
  if (level === 0) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
  }
})

$(".btn").on("click", function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  
  if (isAnswerCorrect()) {
    if ( userClickedPattern.length === level) {
      userClickedPattern = [];
      nextSequence();
    }
  } else {
    gameOver();
  }
})

function isAnswerCorrect(){
  for(let i=0; i<userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function gameOver(){
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern=[];
  userClickedPattern=[];
  playSound("wrong");
}

function nextSequence(){
  const maxNumber = 3;
  let randomNumber = Math.floor(Math.random()*(maxNumber+1));
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level += 1;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name){
  let colorSound = new Audio(`sounds/${name}.mp3`);
  colorSound.play(); 
}

function animatePress(currentColor){
  $(`#${currentColor}`).addClass("pressed");
  window.setTimeout(function() {
    $(`#${currentColor}`).removeClass("pressed")
  }, 100);
}