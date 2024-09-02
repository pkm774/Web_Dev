import React from "react";
import { createRoot } from "react-dom/client";

const mainContainer = document.getElementById("root");
const mainRoot = createRoot(mainContainer);

var greetingStyle = {
    color: "red"
};
var greeting;

var dayTime = new Date().getHours();

if (dayTime < 12 && dayTime >= 0) {
    greeting = "Good morning";
} else if (dayTime >= 12 && dayTime < 18) {
    greetingStyle.color = "green";
    greeting = "Good afternoon!";
} else {
    greetingStyle.color = "blue";
    greeting = "Good afternoon!";
}

mainRoot.render(
    <h1 style={greetingStyle}>
        {greeting}
    </h1>
);

