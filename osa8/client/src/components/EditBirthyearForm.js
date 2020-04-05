import React, { useState } from 'react';
import Select from 'react-select';

const EditBirthyearForm = props => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  let selectedOption;
  let selectOptions = [
    ...props.authors.map(author => {
      return {
        value: author.name,
        label: author.name,
      };
    }),
  ];

  const submit = async event => {
    event.preventDefault();
    await props.editAuthor({
      variables: { name, setBornTo: Number(born) },
    });

    setName('');
    setBorn('');
  };

  const handleChange = selectedOption => {
    setName(selectedOption.value);
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          options={selectOptions}
          value={selectedOption}
          onChange={handleChange}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditBirthyearForm;
