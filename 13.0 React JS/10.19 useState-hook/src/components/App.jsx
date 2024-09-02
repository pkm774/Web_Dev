import React, { useState } from "react";

var init = 0;

function App() {
  const [count, countUpdate] = useState(init);

  function increase() {
    countUpdate(count + 1);
  }

  function decrease() {
    countUpdate(count - 1);
  }

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
