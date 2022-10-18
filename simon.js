var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level=0;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started=true;
  }
});

//1.use jquery to detect when any of the buttons got clicked and trigger handler function.
$(".btn").click(function(){
//2.create a new variable usergotclicked to store the id of the button got clicked.
var userChoosenColour = $(this).attr("id");
userClickedPattern.push(userChoosenColour);
playSound(userChoosenColour);
animatePress(userChoosenColour);
//2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
checkAnswer(userClickedPattern.length -1);
});

//game main logic
function checkAnswer(currentLevel) {
  //if statment to check whether most recent user answer is the same as the game pattern.
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    //if the user got most recent answer right in step ,then check thet they have finished their sequence another if statment
    if(userClickedPattern.length === gamePattern.length){
      //call next sequence after a 1000 millisecond daley.
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
      startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  //increase level by 1 every time nextsequence is called...
  level++;

  //change the text according to the level number
  $("#level-title").text("Level"+level);
  var randomNumber =  Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  }

  //function for animate the button.
  function animatePress(currentColour){
    //to add this pressed class to the button that gets clicked inside animatepress()...
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
  }
//function for sound play..
function playSound(name){
var audio = new Audio("sounds/"+name+".mp3");
audio.play();
}

//to Restart the game
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
