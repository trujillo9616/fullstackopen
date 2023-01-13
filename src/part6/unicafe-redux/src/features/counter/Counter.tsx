import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { good, bad, neutral, restart, selectCount } from "./counterSlice";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const statistics = () => {
    if (count.good === 0 && count.neutral === 0 && count.bad === 0) {
      return <p>No feedback given :(</p>;
    }

    const total = count.good + count.neutral + count.bad;
    const average = (count.good - count.bad) / total;
    const positive = (count.good / total) * 100;

    return (
      <div>
        <p>good {count.good}</p>
        <p>neutral {count.neutral}</p>
        <p>bad {count.bad}</p>
        <p>all {total}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    );
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => dispatch(good())}>good</button>
      <button onClick={() => dispatch(neutral())}>neutral</button>
      <button onClick={() => dispatch(bad())}>bad</button>
      <button onClick={() => dispatch(restart())}>restart</button>

      <h2>statistics</h2>
      {statistics()}
    </div>
  );
}
