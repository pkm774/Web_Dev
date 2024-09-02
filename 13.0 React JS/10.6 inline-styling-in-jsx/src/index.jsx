import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

var style = {color: "red",
    fontSize: "55px",
    border: "2px solid black",
    textAlign: "center"
};

style.color = "blue";

root.render(
    <h1 style={style}>
        Hello!
    </h1>
);