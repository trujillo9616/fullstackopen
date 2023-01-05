import React, { useState, useEffect } from "react";
import { Country } from "./types";
import Results from "./components/Results";
import axios from "axios";

function App() {
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const countriesToShow = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <p>
        find countries <input value={search} onChange={handleSearchChange} />
      </p>
      <Results countries={countriesToShow} setSearch={setSearch} />
    </div>
  );
}

export default App;
