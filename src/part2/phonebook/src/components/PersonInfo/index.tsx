import React from "react";
import { Person, NotificationType } from "../../types";
import phonebookService from "../../services/phonebook";

interface PersonInfoProps {
  person: Person;
  refetch: () => void;
  setNotification: (notification: NotificationType) => void;
  resetNotification: () => void;
}

const PersonInfo: React.FC<PersonInfoProps> = ({
  person,
  refetch,
  setNotification,
  resetNotification,
}) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(person.id)
        .then((response) => console.log(response))
        .then(() => {
          refetch();
          setNotification({
            message: `Deleted ${person.name}`,
            type: "success",
          });
          resetNotification();
        })
        .catch((error) => {
          console.log(error);
          setNotification({
            message: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
          resetNotification();
        });
    }
  };

  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default PersonInfo;
