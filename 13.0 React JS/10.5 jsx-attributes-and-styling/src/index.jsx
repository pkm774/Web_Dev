import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div>
    <h1 className="header" id="test1">
      Hello Everyone! What i like ?
    </h1>
    <div>
      <img
        src="https://imgd.aeplcdn.com/642x361/cw/ec/32392/Aston-Martin-DB11-Exterior-115405.jpg"
        alt="car"
      />
      <img
        src="https://m.media-amazon.com/images/I/71vPwvBaokL._SX679_.jpg"
        alt="watch"
      />
      <img
        src="https://images.pexels.com/photos/87088/fighter-jet-jet-aircraft-army-87088.jpeg"
        alt="jet"
      />
    </div>
  </div>
);
