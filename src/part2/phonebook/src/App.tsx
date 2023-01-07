import React, { useState, useEffect } from "react";
import { Person, NotificationType } from "./types";
import { Filter, PersonForm, Persons, Notification } from "./components";
import phonebookService from "../src/services/phonebook";

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [notification, setNotification] = useState<NotificationType>({
    message: null,
    type: undefined,
  });

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const refetchPersons = () => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

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

  const resetNotification = () => {
    setTimeout(() => {
      setNotification({ message: null, type: undefined });
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length === 0 ? 1 : persons[persons.length - 1].id + 1,
    };
    if (persons.some((p) => p.name === person.name)) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const oldId = persons.find((p) => p.name === person.name)!.id;
        phonebookService
          .update(oldId, { ...person, id: oldId })
          .then((returnedPerson) => {
            refetchPersons();
            setNewName("");
            setNewNumber("");
            setFilter("");
          });
        setNotification({
          message: `Updated ${person.name}'s number to ${person.number}`,
          type: "info",
        });
        resetNotification();
        return;
      }
    }
    try {
      await phonebookService.create(person);
      refetchPersons();
      setNewName("");
      setNewNumber("");
      setFilter("");
      setNotification({
        message: `Added ${person.name}`,
        type: "success",
      });
    } catch (error: any) {
      setNotification({
        message: error.response.data.error,
        type: "error",
      });
      resetNotification();
      return;
    }
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons
        persons={personsToShow}
        refetch={refetchPersons}
        setNotification={setNotification}
        resetNotification={resetNotification}
      />
    </div>
  );
}

export default App;
