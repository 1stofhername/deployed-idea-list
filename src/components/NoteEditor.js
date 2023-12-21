import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function NoteEditor({ note, handleEditSubmit, toggleEditNote }) {
  const [editedNoteContent, setEditedNoteContent]=useState(note);
  const { id } = useParams();

  useEffect(()=>{
    fetch(`http://localhost:8888/.netlify/functions/get-note-by-id?id=${id}`)
    .then(r=>r.json())
    .then(data=> setEditedNoteContent(data))
  }, [id])
  console.log("id:", id)
  function handleFormChange (event){
    setEditedNoteContent({...editedNoteContent, [event.target.name]:event.target.value})
  }
  
  function handleTagChange (e) {
    setEditedNoteContent({...editedNoteContent, [e.target.name]:e.target.value.split(',')})
  }

  function onEditSubmit (event) {
    event.preventDefault();
    handleEditSubmit(editedNoteContent);
  }

  if(note){
    return (
      <form className="note-editor" onSubmit={e=>onEditSubmit(e)}>
        <input type="text" name="title" value={editedNoteContent.title} onChange={e=>handleFormChange(e)} />
        <textarea name="body" value={editedNoteContent.body} onChange={e=>handleFormChange(e)} />
        <input type="text" name="tags" id="tags" value={editedNoteContent.tags} placeholder="Enter tags separated by ," onChange={(e)=>handleTagChange(e)} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" onSubmit={()=>onEditSubmit}/>
          <button onClick={toggleEditNote()}>Cancel</button>
        </div>
      </form>
    )} else {
      return <h1>Loading...</h1>;
    };
}

export default NoteEditor;
