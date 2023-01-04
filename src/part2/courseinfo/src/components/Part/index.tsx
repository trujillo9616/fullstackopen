import React from "react";

interface PartProps {
  part: {
    name: string;
    exercises: number;
    id: number;
  };
}

const Part: React.FC<PartProps> = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Part;
