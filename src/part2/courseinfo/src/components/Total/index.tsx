import React from "react";

interface TotalProps {
  parts: {
    name: string;
    exercises: number;
    id: number;
  }[];
}

const Total: React.FC<TotalProps> = ({ parts }) => {
  const total = parts.reduce((carry, part) => carry + part.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export default Total;
