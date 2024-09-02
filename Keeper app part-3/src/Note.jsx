import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(prop) {
  return (
    <div className="note">
      <h1>{prop.title}</h1>
      <p>{prop.content}</p>
      <button
        style={{ background: "none" }}
        onClick={() => {
          prop.onDelete(prop.id);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
