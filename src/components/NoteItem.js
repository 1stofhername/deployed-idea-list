import React from "react";
import { Link } from "react-router-dom";

function NoteItem({ note, onNoteClick }) {
  const { body, title, id } = note
  const caption = (body.length > 20) ? note.body.substr(0,20)+"...": note.body
  

  return (
    <div className="note-card">
      <h2>{title}</h2>
      <p>{caption}</p>
      {/* <span className="button"><button id="view" onClick={()=>onNoteClick(note)}>View</button></span> */}
      <Link to={`/notes/${id}`} onClick={()=>console.log(note)}>Expand</Link>
    </div>
  );
}

export default NoteItem;
