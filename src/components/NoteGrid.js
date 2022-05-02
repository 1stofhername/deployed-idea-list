import React from "react";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";


function NoteGrid({ notes, onDeleteButtonClick, handleNewButtonClick, tagFilter }) {
  return (  
    <div className="all-notes-display">

    {<div className="note-card">
      <h2>Create a New Note</h2>
      <AddNotes handleNewButtonClick={handleNewButtonClick} />
      {/* <Link to={`/notes/${id}`} onClick={()=>console.log(note)}>Edit</Link> */}
    </div>}
    
      {notes.map((note)=><NoteItem key={note.id} note={note} onDeleteButtonClick={onDeleteButtonClick} id={note.id} />)}
    </div>
  );
}

export default NoteGrid;
