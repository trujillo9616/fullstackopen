import { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from '../types';

export const useField = (type: string, name: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const reset = () => {
    setValue('');
  }

  return {
    type,
    name,
    value,
    onChange,
    reset
  }
};

export const useCountry = (name: string) => {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        setCountry(response.data[0]);
      } catch (error) {
        setCountry(null)
      }
    }

    if (name) {
      fetchCountry();
    }
  }, [name]);

  return country;
}