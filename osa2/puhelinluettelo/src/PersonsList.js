import React from "react";

function PersonsList({ persons, deletePerson }) {
  console.log(persons);
  return (
    <div>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      ))}
    </div>
  );
}

export default PersonsList;
