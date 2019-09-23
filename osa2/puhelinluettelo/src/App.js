import React, { useState, useEffect } from "react";
import FilterForm from "./FilterForm";
import AddPersonForm from "./AddPersonForm";
import PersonsList from "./PersonsList";
import Message from "./Message";
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

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        personService
          .update(personToFind.id, person)
          .then(() => {
            setSuccessMessage(`Updated ${person.name}'s number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
            personService.getAll().then(persons => {
              setPersons(persons);
              setFilteredPersons(persons);
              setNewName("");
              setNewNumber("");
            });
          })
          .catch(() => {
            setErrorMessage(
              `${personToFind.name} on jo poistettu palvelimelta.`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService.create(person).then(() => {
        setSuccessMessage(`Added ${person.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
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
      personService
        .deleteById(personToDelete.id)
        .then(() => {
          setPersons(newList);
          setFilteredPersons(newList);
        })
        .catch(() => {
          setErrorMessage(
            `${personToDelete.name} on jo poistettu palvelimelta.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      <Message messageType="success" message={successMessage} />
      <Message messageType="error" message={errorMessage} />
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
