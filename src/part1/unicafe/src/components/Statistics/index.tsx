import React from "react";
import StatisticsTable from "./StatisticsTable";

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

const Statistics: React.FC<StatisticsProps> = ({ good, neutral, bad }) => {
  const hasFeedback: boolean = good + neutral + bad > 0;

  return (
    <>
      <h1>statistics</h1>
      <div>
        {hasFeedback ? (
          <>
            <StatisticsTable good={good} neutral={neutral} bad={bad} />
          </>
        ) : (
          <p>No feedback given</p>
        )}
      </div>
    </>
  );
};

export default Statistics;
