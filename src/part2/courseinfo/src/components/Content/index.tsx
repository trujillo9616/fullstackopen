import React from "react";
import Part from "../Part";

interface ContentProps {
  parts: {
    name: string;
    exercises: number;
    id: number;
  }[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
