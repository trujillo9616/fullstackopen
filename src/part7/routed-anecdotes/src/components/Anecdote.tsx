import React from "react";

interface AnecdoteProps {
  anecdote:
    | {
        content: string;
        author: string;
        info: string;
        votes: number;
      }
    | null
    | undefined;
}

const Anecdote: React.FC<AnecdoteProps> = ({ anecdote }) => {
  if (!anecdote) {
    return null;
  }
  return (
    <div style={{ padding: 5 }}>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

export default Anecdote;
