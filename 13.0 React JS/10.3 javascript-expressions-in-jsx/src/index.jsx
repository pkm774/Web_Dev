import React from "react";
import { createRoot } from "react-dom";

const name = "Prabhat";
var random = Math.floor(Math.random() * 9999);

var container = document.getElementById("root");
var root = createRoot(container);

root.render(
  <div>
    <h1>Hello {name}</h1>
    <p>Your lucky number is {random}</p>
  </div>
);
 