import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

function NoteEditor({ API_URL, handleEditSubmit, toggleEditNote }) {
  const [editedNoteContent, setEditedNoteContent]=useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(()=>{
<<<<<<< HEAD
    fetch(`http://localhost:8888/.netlify/functions/get-note-by-id/${id}`)
    .then(r=>r.json())
    .then(data=> setEditedNoteContent(data))
  }, [id])
  console.log("id:", id)
  function handleFormChange (event){
    setEditedNoteContent({...editedNoteContent, [event.target.name]:event.target.value})
  }
=======
    fetch(`${API_URL}/get-note-by-id?id=${id}`)
    .then(r=>r.json())
    .then(data=> setEditedNoteContent(data.note))
  }, [id]);

  function handleFormChange (e){
    setEditedNoteContent({...editedNoteContent, [e.target.name]:e.target.value})
  };
>>>>>>> dev
  
  function handleTagChange (e) {
    setEditedNoteContent({...editedNoteContent, [e.target.name]:e.target.value.split(',')})
  };

  function onEditSubmit (e) {
    e.preventDefault();
    handleEditSubmit(editedNoteContent);
    history.push(`/notes/${id}`);
  };

  if(editedNoteContent){
    return (
      <form className="note-editor" onSubmit={e=>onEditSubmit(e)}>
        <input type="text" name="title" value={editedNoteContent.title} onChange={e=>handleFormChange(e)} />
        <textarea name="body" value={editedNoteContent.body} onChange={e=>handleFormChange(e)} />
        <input type="text" name="tags" id="tags" value={editedNoteContent.tags} placeholder="Enter tags separated by ," onChange={(e)=>handleTagChange(e)} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" onSubmit={()=>onEditSubmit}/>
          <button onClick={toggleEditNote}>Cancel</button>
        </div>
      </form>
    )} else {
      return <h1>Loading...</h1>;
    };
}

export default NoteEditor;
