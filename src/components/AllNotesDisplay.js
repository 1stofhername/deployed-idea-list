import NoteItem from "./NoteItem";

function AllNotesDisplay ({ notes, onNoteClick }) {
    return (
        <div className="all-notes-display">
          {notes.map((note)=><NoteItem key={note.id} note={note} onNoteClick={onNoteClick} />)}
        </div>
      );
}

export default AllNotesDisplay