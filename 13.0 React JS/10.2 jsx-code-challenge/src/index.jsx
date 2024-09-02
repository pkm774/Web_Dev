import React from "react";
import { createRoot } from "react-dom/client"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
<div>
    <h1>Hello Everyone</h1>
    <ul>
        <li>
            I am good
        </li>
        <li>
            Hope you too
        </li>
        <li>
            Have a nice day!
        </li>
    </ul>
</div>
);