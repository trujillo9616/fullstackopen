import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CounterState {
  value: {
    good: number;
    neutral: number;
    bad: number;
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  status: 'idle',
};


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    good: (state) => {
      state.value.good += 1;
    },
    neutral: (state) => {
      state.value.neutral += 1;
    },
    bad: (state) => {
      state.value.bad += 1;
    },
    restart: (state) => {
      state.value = {
        good: 0,
        neutral: 0,
        bad: 0,
      };
    }
  },
});

export const { good, neutral, bad, restart } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
