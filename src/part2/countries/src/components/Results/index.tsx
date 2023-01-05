import React from "react";
import { Country } from "../../types";
import CountryPage from "../CountryPage";

interface ResultsProps {
  countries: Country[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Results: React.FC<ResultsProps> = ({ countries, setSearch }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return (
      <>
        <CountryPage country={countries[0]} />
      </>
    );
  }

  return (
    <>
      {countries.map((country) => (
        <>
          <p key={country.cca3}>{country.name.common}</p>
          <button onClick={() => setSearch(country.name.common)}>show</button>
        </>
      ))}
    </>
  );
};

export default Results;
