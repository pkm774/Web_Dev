import React from "react";
import { createRoot } from "react-dom/client";
import Heading from "./Heading"

const mainContainer = document.getElementById("root");
const mainRoot = createRoot(mainContainer);

mainRoot.render(
    <Heading />
);