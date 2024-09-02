import React from "react";
import { createRoot } from "react-dom/client";
import * as calculator from "./calculator"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ul>
    <li>{calculator.default(1, 2)}</li>
    <li>{calculator.multiply(2, 3)}</li>
    <li>{calculator.subtract(7, 2)}</li>
    <li>{calculator.divide(5, 2)}</li>
  </ul>,
);