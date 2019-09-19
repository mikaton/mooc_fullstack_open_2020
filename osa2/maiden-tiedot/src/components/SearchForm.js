import React from "react";

function SearchForm({ handleFilter }) {
  return (
    <div>
      <label>find countries </label>
      <input onChange={handleFilter} />
    </div>
  );
}

export default SearchForm;
