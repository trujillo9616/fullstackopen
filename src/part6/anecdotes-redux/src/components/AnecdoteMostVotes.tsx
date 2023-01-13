import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectAnecdotes } from "../features/anecdotes/anecdotesSlice";

const AnecdoteMostVotes: React.FC = () => {
  const anecdotes = useAppSelector(selectAnecdotes);
  if (anecdotes.length === 0) {
    return null;
  }
  const mostVotes = anecdotes.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current
  );

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <div>{mostVotes.content}</div>
      <div>has {mostVotes.votes} votes</div>
    </div>
  );
};

export default AnecdoteMostVotes;
