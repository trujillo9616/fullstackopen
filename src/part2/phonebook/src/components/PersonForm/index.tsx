import React from "react";

interface PersonFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newNumber: string;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
