var gameSelectedColors = [];
var userSelectedColors = [];
var level = 0;
var gameStarted = false;
var colorArray = ['green', 'red', 'yellow', 'blue'];

function playAudio(audioColor) {
    audioFile = 'sounds/' + audioColor + '.mp3';
    var playColor = new Audio(audioFile);
    playColor.play();
}

function fadeTile(fadeColor) {
    colorId = '#' + fadeColor;
    playAudio(fadeColor);
    $(colorId).fadeOut(150);
    $(colorId).fadeIn(1);
}

function flashTile(flashColor) {
    const colorId = '#' + flashColor;
    $(colorId).addClass("glow-button");
    setTimeout(() => {
        $(colorId).removeClass("glow-button");
    }, 80);
}

function setLevel(num) {
    gameLevel = 'Level ' + num;
    $("#level-title").text(gameLevel);
}

function gameError() {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var errorSound = new Audio("./sounds/wrong.mp3");
    errorSound.play();
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 150);
    gameSelectedColors = [];
    level = 0;
    gameStarted = false;
}

function automatedInput() {
    var randomButton = Math.floor(Math.random() * 4);

    var color = colorArray[randomButton];
    fadeTile(color);
    gameSelectedColors.push(color);
}

function matchPattern(arrayIndex) {
    if (gameSelectedColors[arrayIndex] === userSelectedColors[arrayIndex]) {
        if (userSelectedColors.length === gameSelectedColors.length) {
            setTimeout(function () {
                startGame();
            }, 1000);
        }
    } else {
        gameError();
    }
}

function startGame() {
    level++;
    userSelectedColors = [];
    setLevel(level);
    setTimeout(function () {
        automatedInput();
    }, 300);
}

$(".btn").on('click', function () {
    //console.log($(this).attr("id"));
    playAudio($(this).attr("id"));
    flashTile($(this).attr("id"));
    userSelectedColors.push($(this).attr("id"));
    matchPattern(userSelectedColors.length - 1);
});

$(document).keydown(function (e) {
    if (!gameStarted) {
        startGame();
        gameStarted = true;
    }
});