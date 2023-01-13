import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import anecdoteService from '../../services/anecdotes';

export interface Anecdote {
  id: string;
  content: string;
  votes: number;
};

export interface AnecdoteState {
  value: Anecdote[];
};

const initialState: AnecdoteState = {
  value: [],
};

export const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteFor: (state, action: PayloadAction<string>) => {
      const anecdote = state.value.find((a) => a.id === action.payload);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    addAnecdote: (state, action: PayloadAction<Anecdote>) => {
      state.value.push(action.payload);
    },
    appendAnecdote: (state, action: PayloadAction<Anecdote>) => {
      state.value.push(action.payload);
    },
    setAnecdotes: (state, action: PayloadAction<Anecdote[]>) => {
      state.value = action.payload;
    }
  },
});

export const { voteFor, addAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch: any) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content: string) => {
  return async (dispatch: any) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  }
}

export const voteAnecdote = (id: string) => {
  return async (dispatch: any, getState: any) => {
    const anecdote = getState().anecdotes.value.find((a: Anecdote) => a.id === id);
    if (anecdote) {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      await anecdoteService.update(id, updatedAnecdote);
      dispatch(voteFor(id));
    }
  }
}

export const selectAnecdotes = (state: RootState) => state.anecdotes.value;

export default anecdotesSlice.reducer;
