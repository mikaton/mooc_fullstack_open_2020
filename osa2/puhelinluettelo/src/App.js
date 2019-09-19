import React, { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  const handleAddNewPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName };
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  const handleInputChange = event => {
    setNewName(event.target.value);
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
}

export default App;
