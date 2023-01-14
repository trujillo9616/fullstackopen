import React from "react";
import { Country as CountryType } from "../types";

interface CountryProps {
  country: CountryType | null;
}

const Country: React.FC<CountryProps> = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="100"
      />
    </div>
  );
};

export default Country;
