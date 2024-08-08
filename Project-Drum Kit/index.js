/* for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var pressedKey = this.innerHTML;

        switch (pressedKey) {
            case "w":
                var crash = new Audio('sounds/crash.mp3')
                crash.play();
                break;
            case "a":
                var kick = new Audio('sounds/kick-bass.mp3')
                kick.play();
                break;
            case "s":
                var snare = new Audio('sounds/snare.mp3')
                snare.play();
                break;
            case "d":
                var tom1 = new Audio('sounds/tom-1.mp3')
                tom1.play();
                break;
            case "j":
                var tom2 = new Audio('sounds/tom-2.mp3')
                tom2.play();
                break;
            case "k":
                var tom3 = new Audio('sounds/tom-3.mp3')
                tom3.play();
                break;
            case "l":
                var tom4 = new Audio('sounds/tom-4.mp3')
                tom4.play();
                break;
            default:
                console.log("Nothing gonna happen !")
                break;
        }
    });
} */

function glow(button) {
    keyArray = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
    for (var i = 0; i < keyArray.length; i++) {
        var toggleKey = "." + keyArray[i] + ".drum";
        document.querySelector(toggleKey).classList.remove("glow");
    }

    pkey = "." + button + ".drum";
    document.querySelector(pkey).classList.toggle("glow");
}

document.addEventListener("keydown", function (event) {
    var pressedKey = event.key;

    switch (pressedKey) {
        case "w":
            glow("w");
            var crash = new Audio('sounds/crash.mp3')
            crash.play();
            break;
        case "a":
            glow("a");
            var kick = new Audio('sounds/kick-bass.mp3')
            kick.play();
            break;
        case "s":
            glow("s");
            var snare = new Audio('sounds/snare.mp3')
            snare.play();
            break;
        case "d":
            glow("d");
            var tom1 = new Audio('sounds/tom-1.mp3')
            tom1.play();
            break;
        case "j":
            glow("j");
            var tom2 = new Audio('sounds/tom-2.mp3')
            tom2.play();
            break;
        case "k":
            glow("k");
            var tom3 = new Audio('sounds/tom-3.mp3')
            tom3.play();
            break;
        case "l":
            glow("l");
            var tom4 = new Audio('sounds/tom-4.mp3')
            tom4.play();
            break;
        default:
            console.log("Nothing gonna happen !")
            break;
    }
})