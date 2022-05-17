import React from "react";
import { Link } from "react-router-dom";
import expand from '../assets/img/expand.svg';


function NoteItem({ note, onDeleteButtonClick }) {
  const { body, title, id } = note
  const caption = (body.length > 20) ? note.body.substr(0,20)+"...": note.body
  

  return (
    
      <div className="note-card">
        <Link to={`/notes/${id}`} onClick={()=>console.log(note)} className="icon-link">
        <div>
      <h2>{title}</h2>
      <p>{caption}</p>
      {/* <span className="button"><button id="view" onClick={()=>onNoteClick(note)}>View</button></span> */}
      <img className="nav-icon" id="expand" src={expand} />
      {/* <button onClick={()=>onDeleteButtonClick(note)}>Delete</button> */}
      </div></Link>
    </div>
    
  );
}

export default NoteItem;
