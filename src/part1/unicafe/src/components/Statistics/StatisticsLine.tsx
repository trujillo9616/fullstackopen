import React from "react";

interface StatisticsLineProps {
  text: string;
  value: number | string;
}

const StatisticsLine: React.FC<StatisticsLineProps> = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

export default StatisticsLine;
