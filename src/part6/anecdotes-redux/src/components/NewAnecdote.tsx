import React from "react";
import { useAppDispatch } from "../app/hooks";
import { createAnecdote } from "../features/anecdotes/anecdotesSlice";

const NewAnecdote: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddAnecdote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = (event.target as HTMLFormElement).anecdote.value;
    dispatch(createAnecdote(content));
    (event.target as HTMLFormElement).anecdote.value = "";
  };

  return (
    <div>
      <form onSubmit={handleAddAnecdote}>
        <input name="anecdote" />
        <button type="submit">add anecdote</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
