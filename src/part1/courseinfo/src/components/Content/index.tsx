import React from "react";
import Part from "../Part";
import { CoursePart } from "../../types";

interface ContentProps {
  parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part content={part} />
      ))}
    </>
  );
};

export default Content;
