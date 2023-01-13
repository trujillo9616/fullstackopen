import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import anecdotesReducer from '../features/anecdotes/anecdotesSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
