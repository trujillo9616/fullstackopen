import React from "react";
import { CoursePart } from "../../types";

interface TotalProps {
  parts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ parts }) => {
  const getExerciseSum = (parts: CoursePart[]): number => {
    return parts.reduce((carry, part) => carry + part.exerciseCount, 0);
  };

  return <p>Number of exercises {getExerciseSum(parts)}</p>;
};

export default Total;
