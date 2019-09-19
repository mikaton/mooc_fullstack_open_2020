import React from "react";

function AddPersonForm({
  newName,
  newNumber,
  handleInputNameChange,
  handleInputNumberChange,
  handleAddNewPerson,
}) {
  return (
    <div>
      <form onSubmit={handleAddNewPerson}>
        <label>name: </label>
        <input value={newName} onChange={handleInputNameChange} />
        <label>number: </label>
        <input value={newNumber} onChange={handleInputNumberChange} />
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default AddPersonForm;
