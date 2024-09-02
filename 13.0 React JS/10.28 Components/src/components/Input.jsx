import React, { useState } from "react";

function Input(prop) {
  const [item, createItem] = useState("");

  function handleInput(event) {
    createItem(event.target.value);
  }

  function addItems() {
    const newEntry = {
      item: item,
    };

    prop.onAdd((prevItems) => {
      return [...prevItems, newEntry];
    });

    createItem("");
  }

  return (
    <div className="form">
      <input type="text" onChange={handleInput} value={item} />
      <button onClick={addItems}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default Input;
