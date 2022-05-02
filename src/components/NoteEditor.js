import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function NoteEditor({ note, handleEditSubmit, toggleEditNote }) {
  const [editedNoteContent, setEditedNoteContent]=useState(note);
  const { id } = useParams();

  useEffect(()=>{
    fetch(`https://json-server-heroku-hosting-2.herokuapp.com/notes/${id}`)
    .then(r=>r.json())
    .then(data=> setEditedNoteContent(data))
  }, [id])

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
  );
}

export default NoteEditor;
