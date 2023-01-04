import React from "react";
import { getAverage, getPositivePercentage } from "./functions";

interface StatisticsTableProps {
  good: number;
  neutral: number;
  bad: number;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({
  good,
  neutral,
  bad,
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{getAverage(good, neutral, bad)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{getPositivePercentage(good, neutral, bad)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatisticsTable;
