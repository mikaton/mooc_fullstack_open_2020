import React from 'react';
import { setFilter } from '../reducers/filterReducer';

const Filter = props => {
  const style = {
    marginBottom: 10,
  };

  const handleChange = event => {
    props.store.dispatch(setFilter(event.target.value));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
