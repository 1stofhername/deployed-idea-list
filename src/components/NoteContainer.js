import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import TagFilter from "./TagFilter";
import NoteEditor from "./NoteEditor";
import SingleNoteViewer from "./SingleNoteViewer";
import NoteGrid from "./NoteGrid";
import { useHistory } from "react-router-dom";

function NoteContainer () {
  
  const apiUrl = "http://localhost:8888/.netlify/functions/notes"
  const [notes, setNotes] = useState([]);
  const [displayedNote, setDisplayedNote]=useState("");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [editNote, setEditNote]=useState("");
  const [sortedNotes, setSortedNotes]=useState([]);
  const history = useHistory();

  

//Search and Filter

  // const filteredNotes = (sortedNotes.length===0 ? notes : sortedNotes)
  //   .filter(note=>note.title.toLowerCase().includes(search))
  //   .filter(note=> {
  //     if (tagFilter==='All') {
  //       return true 
  //     } else if (tagFilter) {
  //     return note.tags.find(element=>element===tagFilter)
  //   } else if (!tagFilter) {
  //     setTagFilter("All");
  //   }
  // })
  
  function handleSortTitle (){
    if (sortedNotes.length===0){
      const newNotes=[...notes]
      const sortedNotes = newNotes.sort(function (a,b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1
        } else {
          return 1
        }
      })
      setSortedNotes(sortedNotes)
    } else {
      setSortedNotes([])
    }
  }

  // CRUD Functions  //

  // GET //

  useEffect(()=>{
  fetch(apiUrl)
  .then((res)=>res.json())
  .then((data)=>setNotes(data.notes.reverse()))
}, []);

// CREATE //

function handleNewButtonClick () {
  fetch(apiUrl, {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
    },
    body:JSON.stringify({
      userId:2,
      id:Date.now(),
      title:"New Note",
      body: "hello",
      tags:[],
    })
  })
  .then(res=>res.json())
  .then(data=>{
    let newNotes= [data.note, ...notes]; 
    setNotes(newNotes);
    setDisplayedNote(data.note);
    history.push(`/notes/${data.note.id}`);
  })
  
}

// UPDATE //

function handleEditSubmit (editedNoteObj){
  fetch(`${apiUrl}/${editedNoteObj.id}`, {
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(editedNoteObj)
  })
  .then(res=>res.json())
  .then((data)=>{
    const updatedNotes = notes.map((note)=>{ 
      if (note.id===data.id) {
        return data
      } else {
        return note
      }
    });
      setNotes(updatedNotes);
      history.push(`/notes/${data.id}`)
    })
};

// DELETE //

function onDeleteButtonClick (item) {
  fetch(`${apiUrl}/${item.id}`, {
    method:"DELETE",
  })
  .then(res=>res.json())
  .then(data=>history.push(`/`))
  .then(()=>handleDeleteItem(item))
}

//onEvent State Toggle Functions

function onTagClick (event) {
  setTagFilter(()=>event.target.name);
}

function handleTagReset () {
  setTagFilter("");
}

function toggleEditNote (note) {
  setEditNote(note)
}

function toggleDisplayedNote (note) {
  setDisplayedNote(note)
};

function handleSearchChange (event) {
setSearch(event.target.value);
};

function handleDeleteItem (deletedItem) {
  let updatedNotes=notes.filter((note)=>{return note.id!==deletedItem.id});
  setNotes(updatedNotes);
  setDisplayedNote("");
}

function handleClearSearch () {
  setSearch("");
}

  return (

    <>
      <div className="container">
      <Switch>
        <Route exact path="/">
        <Search 
        handleSearchChange={handleSearchChange} 
        handleClearSearch={handleClearSearch} 
        search={search} 
        />
      <TagFilter 
        notes={notes} 
        tagFilter={tagFilter}
        onTagClick={onTagClick}
        handleTagReset={handleTagReset} 
        />
          {notes ?
            <NoteGrid 
              notes={notes} 
              onDeleteButtonClick={onDeleteButtonClick} 
              tagFilter={tagFilter} id={displayedNote.id} 
              handleNewButtonClick={handleNewButtonClick} 
            />: 
            <h1>Loading...</h1>}
        </Route>
        <Route path="/edit/:id">
          <NoteEditor 
            note={editNote} 
            handleEditSubmit={handleEditSubmit} 
            toggleEditNote={toggleEditNote} 
          />
        </Route>
        <Route exact path="/notes/:id">
          <SingleNoteViewer 
            displayedNote={displayedNote} 
            onEditButtonClick={toggleEditNote} 
            onDeleteButtonClick={onDeleteButtonClick} 
            onTagClick={onTagClick} 
            notes={notes}
          />
        </Route>
        <Route path= '*'>
          <div>404 Not Found</div>
        </Route>
      </Switch>
      </div>
    </>
  );
}

export default NoteContainer;
