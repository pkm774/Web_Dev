import React from "react";
import Card from "./Card";
import emojipedia from "../emojipedia";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <div className="dictionary">
        {emojipedia.map((emoji) => (
          <Card
            id={emoji.id}
            name={emoji.name}
            emoji={emoji.emoji}
            meaning={emoji.meaning}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
