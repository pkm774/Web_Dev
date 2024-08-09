// Style change
$("h1").css("color", "red");
// Insert Class
$("h1").addClass("big-text");
// Attribute change
$("a").attr("href", "https://x.com");
// Event lstner mouse click
$("h1").click(function (e) {
    // Style change
    $("h1").css("color", "pink");
});
// Event lstner key press
$(document).keydown(function (e) { 
    $("h1").text(e.key);
});
// Event lstner using on()
$("button").on("mouseover", function (e) { 
    $("button").css("color", "green");
});
// Animate h1
$("#slide").click(function (e) { 
    $("h1").slideToggle();
});