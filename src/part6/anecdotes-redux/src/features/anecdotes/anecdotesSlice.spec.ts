import anecdotesReducer, {
  AnecdoteState,
  addAnecdote,
  voteFor,
} from './anecdotesSlice';

describe('anecdotes reducer', () => {
  const initialState: AnecdoteState = {
    value: [
      {
        id: '1',
        content: "If it hurts, do it more often.",
        votes: 0,
      },
      {
        id: '2',
        content: "Adding manpower to a late software project makes it later!",
        votes: 0,
      },
    ]
  };

  it('should handle initial state', () => {
    const actual = anecdotesReducer(undefined, { type: 'unknown' });
    expect(actual.value.length).toEqual(0);
  });

  it('should handle addAnecdote', () => {
    const newAnecdote = {
      id: '3',
      content: "If it hurts, do it more often.",
      votes: 0,
    }
    const actual = anecdotesReducer(initialState, addAnecdote(newAnecdote));
    expect(actual.value.length).toEqual(3);
  });

  it('should handle voteFor', () => {
    const actual = anecdotesReducer(initialState, voteFor('1'));
    expect(actual.value[0].votes).toEqual(1);
  });
});
