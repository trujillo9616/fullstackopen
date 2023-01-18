import React from "react";
import { useField, useResource } from "./hooks";
import { Note, Person } from "./types";

function App() {
  const { reset: resetContent, ...content } = useField("text", "content");
  const { reset: resetName, ...name } = useField("text", "name");
  const { reset: resetNumber, ...number } = useField("text", "number");
  const { resources: notes, service: noteService } = useResource<Note>(
    "http://localhost:3005/notes"
  );
  const { resources: persons, service: personService } = useResource<Person>(
    "http://localhost:3005/persons"
  );

  const handleNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    resetContent();
  };

  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type="submit">create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>users</h2>
      <form onSubmit={handleUserSubmit}>
        <input {...name} />
        <input {...number} />
        <button type="submit">create</button>
      </form>
      {persons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
}

export default App;
