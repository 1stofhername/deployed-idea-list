function AddNotes ({ handleNewButtonClick }) {

    return(
        <div id="add-new">
            <button className="add-new" onClick={handleNewButtonClick}>+ New Note</button>
        </div>
    )
}

export default AddNotes