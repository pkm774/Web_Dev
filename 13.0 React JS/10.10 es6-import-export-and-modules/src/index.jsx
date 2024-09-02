import React from "react";
import { createRoot } from "react-dom/client";
import * as hello from "./hello";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div>
    <p>{hello.default}</p>
    <p>{hello.world}</p>
    <p>{hello.helloworld()}</p>
    <p>{hello.worldhello()};</p>
  </div>
);
