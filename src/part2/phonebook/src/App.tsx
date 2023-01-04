import React, { useState, useEffect } from "react";
import { Person } from "./types";
import { Filter, PersonForm, Persons } from "./components";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((p) => p.name === person.name)) {
      alert(`${person.name} is already added to phonebok`);
      return;
    }
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
    setFilter("");
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
