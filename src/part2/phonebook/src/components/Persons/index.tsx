import React from "react";
import { Person, NotificationType } from "../../types";
import PersonInfo from "../PersonInfo";

interface PersonsProps {
  persons: Person[];
  refetch: () => void;
  setNotification: (notification: NotificationType) => void;
  resetNotification: () => void;
}

const Persons: React.FC<PersonsProps> = ({
  persons,
  refetch,
  setNotification,
  resetNotification,
}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <PersonInfo
          key={person.name}
          person={person}
          refetch={refetch}
          setNotification={setNotification}
          resetNotification={resetNotification}
        />
      ))}
    </div>
  );
};

export default Persons;
