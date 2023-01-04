import React from "react";
import { CoursePart } from "../../types";

interface PartProps {
  content: CoursePart;
}

const Part: React.FC<PartProps> = ({ content }) => {
  return (
    <p>
      {content.name} {content.exerciseCount}
    </p>
  );
};

export default Part;
