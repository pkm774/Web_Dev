import React, { useState } from "react";

function App() {
  const [id, increaseId] = useState(0);
  const [item, createItem] = useState("");
  const [todolist, appendList] = useState([]);

  function handleInput(event) {
    createItem(event.target.value);
  }

  function addItems() {
    const newEntry = {
      id: id,
      item: item,
    };

    appendList((prevItems) => {
      return [...prevItems, newEntry];
    });

    increaseId(id + 1);
    createItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleInput} value={item} />
        <button onClick={addItems}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todolist.map((todo) => (
            <li key={todo.id}>{todo.item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
