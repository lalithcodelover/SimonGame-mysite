let buttonColors = ["red","blue","green","yellow"];

let gamePattern =[];

let userClickedPattern=[];

let level = 0;

let started = false;

// Next Sequence
function nextSequence() {
    let randomNumber =Math.floor(Math.random()*4);

    let randomChosenColor =buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level "+level);

    userClickedPattern=[];
    
}

// User clicked button function
$(".btn").click(function(){
    let userChosenColor =this.id;
    
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.indexOf(userChosenColor));  // or userClickedPattern.length-1;
})

// Function to play sound
function playSound(name) {
    let audio= new Audio("sounds/"+name+".mp3")
    audio.play();

}

//Function to animate selected button
function animatePress(currentColor) {
    
    $("#"+currentColor).addClass("pressed");

    setTimeout(() => {
       $("#"+currentColor).removeClass("pressed"); 
    }, 100);
}
   
// Function to identify any key is presses
$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started= true;
    }
});

//Function to check user answer is correct or not
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]) {
        console.log("Success")
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
                
            }, 1000);
        }
        
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press Any Key to Restart")
        setTimeout(() => {
           $("body").removeClass("game-over"); 
        }, 200);
        
        startOver();
    }
}

// Resetting the values when game is restarted
function startOver() {
     level = 0;
     gamePattern = [];
     started = false;
}

