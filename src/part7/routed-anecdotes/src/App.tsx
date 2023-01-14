import React, { useState } from "react";
import { Anecdote as AnecdoteType } from "./types";
import {
  Menu,
  AnecdoteList,
  Anecdote,
  About,
  CreateNew,
  Footer,
  Notification,
} from "./components";
import { Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState("");

  const createNew = (anecdote: AnecdoteType) => {
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  // const anecdoteById = (id: number) => anecdotes.find((a) => a.id === id);
  // const vote = (id: number) => {
  //   const anecdote = anecdoteById(id);
  //   if (!anecdote) {
  //     return;
  //   }
  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };
  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route
          path="/create"
          element={
            <CreateNew
              createNew={createNew}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
