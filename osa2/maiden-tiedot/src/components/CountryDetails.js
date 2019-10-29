import React from "react";

function CountryDetails({ country }) {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      {country.languages.map(lang => (
        <p key={lang.name}>{lang.name}</p>
      ))}
      <img src={country.flag} />
    </div>
  );
}

export default CountryDetails;
