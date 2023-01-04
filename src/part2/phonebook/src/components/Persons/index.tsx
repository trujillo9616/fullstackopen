import React from "react";
import { Person } from "../../types";

interface PersonsProps {
  persons: Person[];
}

const Persons: React.FC<PersonsProps> = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
