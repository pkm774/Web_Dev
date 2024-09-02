import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [textValue, setTextValue] = useState("");

  function sendValue(event) {
    setValue(event.target.value);
  }

  function showValue(event) {
    setTextValue(value);

    {
      /* Prevent page from reloading */
    }
    event.preventDefault();
  }

  return (
    <form onSubmit={showValue} action="">
      <div className="container">
        <h1>Hello {textValue}</h1>
        <input
          onChange={sendValue}
          type="text"
          placeholder="What's your name?"
        />
        {/*<button type="submit" {onClick={showValue}}>Submit</button>;*/}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
