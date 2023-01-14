import React from "react";
import { Anecdote } from "../types";
import { Link } from "react-router-dom";

interface AnecdoteListProps {
  anecdotes: Anecdote[];
}

const AnecdoteList: React.FC<AnecdoteListProps> = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <div>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
