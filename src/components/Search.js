import React from "react";

function Search({ search, handleSearchChange, handleClearSearch }) {
  return (
    <div className="filter">
      <input id="search-bar" type="text" value={search} placeholder="Search Notes" onChange={(e)=>handleSearchChange(e)} />
      <button hidden={search.length > 0 ? false:true} id="clear-search" className="clear-search" onClick={handleClearSearch}>&#10060;</button>
    </div>
  );
}

export default Search;
