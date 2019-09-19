import React, { useState, useEffect } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "045-1234567" },
    { name: "Testi Testinen", number: "040-1210567" },
    { name: "Marko Virtanen", number: "046-321327" },
    { name: "Joulu Pukki", number: "041-1754322" },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  const handleAddNewPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (
      persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleFiltering = event => {
    let currentList = [],
      newList = [];

    if (event.target.value !== "") {
      currentList = persons;
      newList = currentList.filter(person => {
        return person.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    } else {
      newList = persons;
    }

    setFilteredPersons(newList);
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
      filter shown with
      <input onChange={handleFiltering} />
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
      {filteredPersons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
}

export default App;
