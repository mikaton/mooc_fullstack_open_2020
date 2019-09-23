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

    let personToFind = persons.find(person => person.name === newName);

    if (personToFind) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero?`
        )
      ) {
        const person = { name: personToFind.name, number: newNumber };
        personService.update(personToFind.id, person).then(() => {
          personService.getAll().then(persons => {
            setPersons(persons);
            setFilteredPersons(persons);
            setNewName("");
            setNewNumber("");
          });
        });
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService.create(person).then(() => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeletePerson = person => {
    let personToDelete = persons.find(p => p.id === person.id);

    if (window.confirm(`Poistetaanko ${personToDelete.name}?`)) {
      let newList = [];
      newList = persons.filter(person => person.id !== personToDelete.id);
      personService.deleteById(personToDelete.id).then(() => {
        setPersons(newList);
        setFilteredPersons(newList);
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
      <PersonsList
        persons={filteredPersons}
        deletePerson={handleDeletePerson}
      />
    </div>
  );
}

export default App;
