import React from "react";
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
const root = createRoot(container);

var name = 'Prabhat';
var year = new Date().getFullYear();

root.render(
    <div>
        <p>
            Created by {name}.
        </p>
        <p>
            Copyright {year}.
        </p>
    </div>
);
//Create a react app from scratch.
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

