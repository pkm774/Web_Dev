import React, { useState } from "react";

function ToDoItem(prop) {
  {
    /*
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(clicked => {
        return !clicked;
    });
  }

  return (
    <div onClick={handleClick}>
      <li style={{ textDecoration: clicked ? "line-through" : "none"}} key={prop.key}>
        {prop.value}
      </li>
    </div>
  );*/
  }

  return (
    <div onClick={() => {
        prop.onClick(prop.id);
    }}>
      <li key={prop.id}>{prop.value}</li>
    </div>
  );
}

export default ToDoItem;
