import React from "react";
import { useState } from "react";

function getTime(){
  return (new Date().toLocaleTimeString());
}

function App() {
  const [val, fun] = useState(getTime());

  function updateTime(){
    fun(getTime());
  }
  setInterval(updateTime, 1000);

  return (
    <div className="container">
      <h1>{val}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
