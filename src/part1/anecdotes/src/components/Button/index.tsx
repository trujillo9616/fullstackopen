import React from "react";

interface ButtonProps {
  handleClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default Button;
