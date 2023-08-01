var buttonColors=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedpattern=[];
var started= false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("h1").text(level);
        nextSequence();
        started=true;
    }

});

function nextSequence(){
    level=level+1;
    $("h1").text(level);
    var randomNo=Math.floor(Math.random() * 4);
    var randomChosenColor=buttonColors[randomNo];
    gamepattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
} 

$(".btn").click(function(e){

    var userChosenColor=e.target.id;
    // alert(userChosenColor);
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedpattern.length-1);

});

function checkAnswer(currentLevel){
    if(userClickedpattern[currentLevel]===gamepattern[currentLevel]){
        console.log("success");
        if(userClickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedpattern=[];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("fail");
        startOver();
    }
    
}
function startOver(){
    level=0;
    started=false;
    gamepattern=[];
    userClickedpattern=[];
}

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}



function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}




