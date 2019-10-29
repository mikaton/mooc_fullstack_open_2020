import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import CountryList from "./CountryList";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCoutries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      setCountries(res.data);
    });
  }, []);

  const handleFilter = event => {
    let newList = [],
      currentList = [];

    if (event.target.value !== "") {
      currentList = countries;
      newList = currentList.filter(country => {
        return country.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    } else {
      newList = countries;
    }

    setFilteredCoutries(newList);
  };

  return (
    <div className="App">
      <SearchForm handleFilter={handleFilter} />
      <CountryList countries={filteredCountries} />
    </div>
  );
}

export default App;
