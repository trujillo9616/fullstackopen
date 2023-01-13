import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Notification {
  message: string;
};

export interface NotificationState {
  value: Notification;
};

const initialState: NotificationState = {
  value: {
    message: '',
  }
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification: (state, action: PayloadAction<string>) => {
      state.value.message = action.payload;
    },
    clearNotification: (state) => {
      state.value.message = '';
    }
  },
});

export const { newNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message: string, timeout: number) => {
  return async (dispatch: any) => {
    dispatch(newNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  }
}

export const selectNotification = (state: RootState) => state.notification.value;

export default notificationSlice.reducer;