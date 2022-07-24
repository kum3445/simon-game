var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
// for initial key down
$(document).keydown(function(){
    if (gamePattern.length==0){
        nextSequence();
    }
});

// for user chosen color by clicking the button
$("div .btn").click(function(){ 
    var userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// for random generating the next sequence
function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    randomNumber =Math.floor(Math.random()*3)+1;
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}

// for playing the audio
function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}

// for animating the click
function animatePress(currentColour){
 $("."+currentColour).addClass("pressed");
 setTimeout(function(){
    $("."+currentColour).removeClass("pressed")},100  
 )
}

// for checking the sequence of user clicked vs game pattern
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){nextSequence()},1000);
            userClickedPattern=[];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//for restarting
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}
