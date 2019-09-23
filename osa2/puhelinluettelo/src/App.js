import React, { useState, useEffect } from "react";
import FilterForm from "./FilterForm";
import AddPersonForm from "./AddPersonForm";
import PersonsList from "./PersonsList";

import * as personService from "./PersonService";

function App() {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  // Listan hakeminen palvelimelta, kun sovellus käynnistetään
  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons);
      setFilteredPersons(persons);
    });
  }, []);

  // Listan päivitys, kun listaan on lisätty/poistettu henkilö
  useEffect(() => {
    setPersons(persons);
    setFilteredPersons(persons);
  }, [persons]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      personService.create(newPerson).then(() => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
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
      <FilterForm handleFiltering={handleFiltering} />
      <h2>Add a new person</h2>
      <AddPersonForm
        newName={newName}
        newNumber={newNumber}
        handleInputNameChange={handleInputNameChange}
        handleInputNumberChange={handleInputNumberChange}
        handleAddNewPerson={handleAddNewPerson}
      />
      <h2>Numbers</h2>
      <PersonsList persons={filteredPersons} />
    </div>
  );
}

export default App;
