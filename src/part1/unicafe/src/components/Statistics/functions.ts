export const getAverage = (good: number, neutral: number, bad: number): number => {
  return (good - bad) / (good + neutral + bad);
};

export const getPositivePercentage = (good: number, neutral: number, bad: number): string => {
  return (good / (good + neutral + bad)) * 100 + "%";
};
