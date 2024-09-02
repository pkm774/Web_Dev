import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(prop) {
  const [expanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;

    setNote((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    prop.addlist((prevItems) => {
      return [...prevItems, note];
    });

    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleClick}>
        {expanded ? (
          <input
            name="title"
            value={note.title}
            onChange={handleInput}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          value={note.content}
          onChange={handleInput}
          onClick={expand}
          placeholder="Take a note..."
          rows={expanded ? "4" : "1"}
        />
        {expanded ? (
          <Zoom in={true}>
            <Fab className="button" type="submit">
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}
      </form>
    </div>
  );
}

export default CreateArea;
