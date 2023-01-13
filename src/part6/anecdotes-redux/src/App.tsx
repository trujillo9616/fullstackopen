import React, { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList";
import NewAnecdote from "./components/NewAnecdote";
import AnecdoteMostVotes from "./components/AnecdoteMostVotes";
import Notification from "./components/Notification";
import { useAppDispatch } from "./app/hooks";
import { initializeAnecdotes } from "./features/anecdotes/anecdotesSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div className="App">
      <Notification />
      <AnecdoteList />
      <NewAnecdote />
      <AnecdoteMostVotes />
    </div>
  );
}

export default App;
