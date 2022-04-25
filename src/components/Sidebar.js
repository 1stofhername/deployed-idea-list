import React from "react";
import NoteGrid from "./NoteGrid";

function Sidebar({ notes, onNoteClick, handleNewButtonClick, handleSortTitle }) {

  return (
    <div className="master-detail-element view-all">
      {/* <button onClick={(e)=>handleNewButtonClick()}>New</button>
      <button onClick={handleSortTitle}>Sort by title</button> */}
      <NoteGrid notes={notes} onNoteClick={onNoteClick} />
      {/* <button onClick={(e)=>handleNewButtonClick()}>New</button> */}
    </div>
  );
}

export default Sidebar;
