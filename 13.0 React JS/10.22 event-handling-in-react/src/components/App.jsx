import React, { useState } from "react";

function App() {
  const [underMouse, setColor] = useState(false);

  function mouseHover() {
    setColor(true);
  }

  function mouseOut() {
    setColor(false);
  }

  return (
    <div className="container">
      <h1>Hello</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        onMouseOver={mouseHover}
        onMouseOut={mouseOut}
        style={{ backgroundColor: underMouse ? "black" : "white" }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
