$(document).ready(function () {

    const emptArray = [];
    var gameStarted = false;
    var automatedColors = [];
    var selectedColors = [];
    var level = 1;
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

    function emptyArray(arrayToEmpty) {
        while (arrayToEmpty.length > 0) {
            arrayToEmpty.pop();
        }
    }

    function setLevel(num) {
        gameLevel = 'Level ' + num;
        $("#level-title").text(gameLevel);
    }

    function checkCondition() {
        if (JSON.stringify(automatedColors) === JSON.stringify(selectedColors)) {
            console.log(automatedColors);
            console.log(selectedColors);
            console.log('inside ' + selectedColors + ' ' + selectedColors.length);
            setLevel(level + 1);
            selectedColors = emptArray;
            setTimeout(startGame, 900);
        } else {
            gameError();
        }
    }

    function takeInput() {
        $("#green").on('click', function () {
            playAudio('green');
            flashTile('green');
            selectedColors.push('green');
            if (automatedColors.length === selectedColors.length) {
                checkCondition();
            } else {
                takeInput();
            }
        });

        $("#red").on('click', function () {
            playAudio('red');
            flashTile('red');
            selectedColors.push('red');
            if (automatedColors.length === selectedColors.length) {
                checkCondition();
            } else {
                takeInput();
            }
        });

        $("#yellow").on('click', function () {
            playAudio('yellow');
            flashTile('yellow');
            selectedColors.push('yellow');
            if (automatedColors.length === selectedColors.length) {
                checkCondition();
            } else {
                takeInput();
            }
        });

        $("#blue").on('click', function () {
            playAudio('blue');
            flashTile('blue');
            selectedColors.push('blue');
            if (automatedColors.length === selectedColors.length) {
                checkCondition();
            } else {
                takeInput();
            }
        });
    }

    function startGame() {
        var randomButton = Math.floor(Math.random() * 4);

        var color = colorArray[randomButton];
        fadeTile(color);
        automatedColors.push(color);
        console.log('pushed ' + automatedColors + ' ' + automatedColors.length);
        console.log('have ' + selectedColors + ' ' + selectedColors.length);

        takeInput();
    }

    function gameError() {
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var errorSound = new Audio("./sounds/wrong.mp3");
        errorSound.play();
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 150);
        automatedColors = emptArray;
        selectedColors = emptArray;
        gameStarted = false;
    }

    $(document).keydown(function (e) {
        if (!gameStarted) {
            gameStarted = true;
            console.log("Game started!");
            setLevel(level);
            startGame();
        }
    });
});