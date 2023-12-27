function AddNotes ({ handleNewButtonClick }) {
function logInfo () {
    console.log('hello')
};
    return(
        <div id="add-new">
            <button className="add-new" onClick={handleNewButtonClick}>+ New Note</button>
        </div>
    )
}

export default AddNotes