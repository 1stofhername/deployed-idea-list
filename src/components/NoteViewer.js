import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function NoteViewer({ onEditButtonClick, onDeleteButtonClick }) {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  
  
  useEffect(()=>{
    fetch(`https://json-server-heroku-hosting-2.herokuapp.com/notes/${id}`)
    .then(r=>r.json())
    .then(data=> setNote(data))
  }, [id])

  console.log(note)

  if(note){
  return (
    <div className="note-detail-container">

      {note.tags?
      <div id="tag-container">
      <ul>
        {note.tags.map(tag=>{
        return <button key={uuidv4()} name={tag} className="tag">{tag}</button>})}
      </ul>
      </div>:null}
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <Link to={`/edit/${id}`} onClick={()=>onEditButtonClick(note)}>Edit</Link>
      <button onClick={()=>onDeleteButtonClick(note)}>Delete</button>
      <Link id="x" to={"/"}>View All Notes</Link>
     </div>
  );} else {
    return <h1>Loading...</h1>
  }
}

export default NoteViewer;
