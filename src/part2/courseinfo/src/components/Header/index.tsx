import React from "react";

interface HeaderProps {
  course: string;
}

const Header: React.FC<HeaderProps> = ({ course }) => {
  return <h1>{course}</h1>;
};

export default Header;
