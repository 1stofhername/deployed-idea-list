import React from "react";

function TagFilter ({ notes, tagFilter, onTagClick, handleTagReset }) {
    const allTags=[];
    notes.map(note=>allTags.push('All', ...note.tags))
    const uniqueTags = ([...new Set(allTags)]);

    return (
    <div className="tag-filter">
        Filter by tag: 
        {uniqueTags.map(tag=>
        <button key={tag} name={tag} className="tag-selector" attribute={tagFilter===tag?"selected": null} onClick={(e)=>onTagClick(e)}>
            {tag}
        </button>)}
    </div>
    )
}

export default TagFilter