import counterReducer, {
  CounterState,
  good,
  neutral,
  bad,
  restart,
} from './counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: {
      good: 3,
      neutral: 1,
      bad: 0,
    },
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: {
        good: 0,
        neutral: 0,
        bad: 0,
      },
      status: 'idle',
    });
  });

  it('should handle good', () => {
    const actual = counterReducer(initialState, good());
    expect(actual.value.good).toEqual(4);
  });

  it('should handle ok', () => {
    const actual = counterReducer(initialState, neutral());
    expect(actual.value.neutral).toEqual(2);
  });

  it('should handle bad', () => {
    const actual = counterReducer(initialState, bad());
    expect(actual.value.bad).toEqual(1);
  });

  it('should handle restart', () => {
    const actual = counterReducer(initialState, restart());
    expect(actual.value).toEqual({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  });
});
