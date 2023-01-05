import axios from "axios";
import React, { useEffect } from "react";
import { Country } from "../../types";

interface CountryPageProps {
  country: Country;
}

const CountryPage: React.FC<CountryPageProps> = ({ country }) => {
  const [latitude, longitude] = country.capitalInfo.latlng;
  const [weather, setWeather] = React.useState<any>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}1&current_weather=true`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [latitude, longitude]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population} people</p>
      <p>area {country.area} m2</p>

      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" width="100" />

      {weather && (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>
            <strong>temperature: </strong>
            {weather.current_weather.temperature} Celsius
          </p>
          <p>
            <strong>wind: </strong>
            {weather.current_weather.windspeed} mph direction{" "}
            {weather.current_weather.winddirection}
          </p>
        </>
      )}
    </>
  );
};

export default CountryPage;
