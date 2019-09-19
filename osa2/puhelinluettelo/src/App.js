import React, { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "045-1234567" },
  ]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const handleAddNewPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  const handleInputNameChange = event => {
    setNewName(event.target.value);
  };

  const handleInputNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input value={newName} onChange={handleInputNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
}

export default App;
