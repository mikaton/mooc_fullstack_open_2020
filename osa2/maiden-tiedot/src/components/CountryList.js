import React from "react";
import Country from "./Country";
import CountryDetails from "./CountryDetails";

function CountryList({ countries }) {
  const displayFilter = () => {
    if (countries.length === 0) {
      return (
        <div>
          <p>No countries found</p>
        </div>
      );
    } else if (countries.length === 1) {
      return <CountryDetails country={countries[0]} />;
    } else if (countries.length > 1 && countries.length <= 10) {
      return (
        <div>
          {countries.map(country => (
            <Country key={country.name} country={country} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p>Too many matches, specify another filter.</p>
        </div>
      );
    }
  };

  return <div>{displayFilter()}</div>;
}

export default CountryList;
