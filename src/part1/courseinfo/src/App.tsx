import React from "react";
import { CoursePart } from "./types";
import { Header, Content, Total } from "./components";

function App() {
  const course: string = "Half Stack application development";
  const parts: CoursePart[] = [
    {
      name: "Fundamentals of React",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "State of a component",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
