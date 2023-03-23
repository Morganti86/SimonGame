
var buttonColours = ["red", "blue", "green", "yellow"];

var cpuPattern = [];
var playerPattern = [];

var maxLevelCompleted = 0
var level = 0;

// Game start
$("#start").click(function () {
    restart();
    setTimeout(
        function () {
            //do something special
            cpuSequence();
        }, 1000);
    ;
})

// Detecting Button Press
$(".btn").click(function (event) {
    var colorClicked = event.target.id;
    playerPattern.push(colorClicked);
    playSound(colorClicked);
    animatePress(colorClicked);
    compare(playerPattern.length - 1);
})


// Restart
function restart() {
    level = 1
    refreshLevel();
    cpuPattern = [];
    playerPattern = [];
}

// CPU sequence
function cpuSequence() {
    playerPattern = [];
    var number = Math.floor(Math.random() * 4);
    var colour = buttonColours[number];
    cpuPattern.push(colour);
    animatePress(colour);
    playSound(colour);
}

// Compare
function compare(pos) {
    if (cpuPattern[pos] == playerPattern[pos]) {
        if (cpuPattern.length == playerPattern.length) {
            maxLevel(level);
            nextlevel();
            setTimeout(
                function () {
                    //do something special
                    
                    cpuSequence();
                }, 2000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(
            function () {
                //do something special
                $("body").removeClass("game-over");
            }, 350);
        $("#level-title").text("Press START to play again");
    }
}

function maxLevel(actualLevel) {
    if(actualLevel > maxLevelCompleted) {
        maxLevelCompleted = actualLevel
        $(".maxLevelCompleted").text("Max level completed: " + maxLevelCompleted);        
    }
}

// Animations
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(
        function () {
            //do something special
            $("." + currentColour).removeClass("pressed");
        }, 150);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextlevel() {
    $("#level-title").text("LEVEL " + level + " COMPLETED");
    level++;
    setTimeout(
        function () {
            //do something special
            refreshLevel();
        }, 1000);   
}


function refreshLevel() {
    $("#level-title").text("LEVEL " + level);
}