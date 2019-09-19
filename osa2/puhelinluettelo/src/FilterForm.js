import React from "react";

function FilterForm({ handleFiltering }) {
  return (
    <div>
      <label>filter shown with </label>
      <input onChange={handleFiltering} />
    </div>
  );
}

export default FilterForm;
