function random() {
    var rand = Math.floor(Math.random() * 6);

    return rand + 1;
}

function renderImage(n1, n2) {
    document.querySelector("#dice1 img").setAttribute("src", "./images/dice" + n1 + ".png");
    document.querySelector("#dice2 img").setAttribute("src", "./images/dice" + n2 + ".png");
}

var p1 = random();
var p2 = random();

if (p1 < p2) {
    document.querySelector("h1").textContent = "Player 2 Wins 🚩";
    renderImage(p1, p2);
} else if (p1 > p2) {
    document.querySelector("h1").textContent = "🚩 Player 1 Wins";
    renderImage(p1, p2);
} else {
    document.querySelector("h1").textContent = "🎌 Draw 🎌";
    renderImage(p1, p2);
}