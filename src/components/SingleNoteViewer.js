import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import backArrow from '../assets/img/backArrow.svg';

function NoteViewer({ onEditButtonClick, onDeleteButtonClick }) {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  
  
  useEffect(()=>{
    fetch(`http://localhost:8888/.netlify/functions/get-note-by-id?id=${id}`)
    .then(r=>r.json())
    .then(data=> {
      setNote(data); 
      console.log(data);
    })
  }, [id]);

  if(note){
  return (

    <div className="note-detail-container">
    <div><Link className="icon-link" id="x" to={"/"}><img className="nav-icon" id="back" src={backArrow} /></Link></div>
      {note.tags?
      <div id="tag-container">
      <ul>
        {note.tags.map(tag=>{
        return <button key={uuidv4()} name={tag} className="tag">{tag}</button>})}
      </ul>
      </div>:null}
      <h2 className="note-title">{note.title}</h2>
      <p className="note-body">{note.body}</p>
      <span className="button-container">
      <Link to={`/edit/${id}`} onClick={()=>onEditButtonClick(note)}>Edit</Link>
      <button onClick={()=>onDeleteButtonClick(note)}>Delete</button>
      </span>
     </div>
     
  );} else {
    return <h1>Loading...</h1>
  }
}

export default NoteViewer;
