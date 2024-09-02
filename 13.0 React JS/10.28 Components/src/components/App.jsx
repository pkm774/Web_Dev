import React, { useState } from "react";
import Input from "./Input";
import ToDoItem from "./ToDoItem";

function App() {
  const [todolist, appendList] = useState([]);

  function deleteClick(id) {
    appendList((prevItems) => {
      return prevItems.filter((value, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <Input onAdd={appendList} />
      <div>
        <ul>
          {todolist.map((todo, index) => (
            <ToDoItem
              key={index}
              id={index}
              value={todo.item}
              onClick={deleteClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
