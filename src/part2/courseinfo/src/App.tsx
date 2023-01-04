import React from "react";
import Course from "./components/Course";
import courses from "./data";

function App() {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
}

export default App;
