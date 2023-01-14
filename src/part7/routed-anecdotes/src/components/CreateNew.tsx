import React from "react";
import { Anecdote } from "../types";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

interface CreateNewProps {
  createNew: (anecdote: Anecdote) => void;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const CreateNew: React.FC<CreateNewProps> = ({
  createNew,
  setNotification,
}) => {
  const { reset: contentReset, ...content } = useField("text", "content");
  const { reset: authorReset, ...author } = useField("text", "author");
  const { reset: infoReset, ...info } = useField("text", "info");
  const navigate = useNavigate();

  const handleReset = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNew({
      id: Math.floor(Math.random() * 10000),
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(`a new anecdote ${content.value} created!`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
    handleReset();
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => handleReset()}>reset</button>
    </div>
  );
};

export default CreateNew;
