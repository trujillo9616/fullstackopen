import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  voteAnecdote,
  selectAnecdotes,
} from "../features/anecdotes/anecdotesSlice";
import { setNotification } from "../features/notifications/notificationSlice";
import { selectFilter } from "../features/filter/filterSlice";
import Filter from "./Filter";

const AnecdoteList: React.FC = () => {
  const anecdotes = useAppSelector(selectAnecdotes);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const vote = (id: string) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `You voted for "${anecdotes.find((a) => a.id === id)?.content}`,
        5
      )
    );
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.value.toLowerCase())
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {filteredAnecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnecdoteList;
