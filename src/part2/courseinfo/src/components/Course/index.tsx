import React from "react";
import Header from "../Header";
import Content from "../Content";
import Total from "../Total";

interface CourseProps {
  course: {
    id: number;
    name: string;
    parts: {
      name: string;
      exercises: number;
      id: number;
    }[];
  };
}

const Course: React.FC<CourseProps> = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
