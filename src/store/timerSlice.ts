/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TimerState,
  TimerStartAction,
  TimerPauseAction,
  TimerContinueAction,
} from 'models/storeTypes';

const initialState: TimerState = {
  startTime: 0,
  duration: 0,
  endTime: 0,
  pausedAt: 0,
  isRunning: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    timerStart: (state, action: PayloadAction<TimerStartAction>) => {
      const { startTime } = action.payload;
      state.isRunning = true;
      state.startTime = startTime;
      state.duration = action.payload.duration;

      state.endTime = startTime + action.payload.duration;
    },
    timerPause: (state, action: PayloadAction<TimerPauseAction>) => {
      state.isRunning = false;
      state.pausedAt = action.payload.pausedAt;
    },
    timerContinue: (state, action: PayloadAction<TimerContinueAction>) => {
      const newStartTime = action.payload.startTime;
      const newDuration = state.duration - (state.pausedAt - state.startTime);
      const newEndTime = newStartTime + newDuration;

      state.isRunning = true;
      state.pausedAt = 0;
      state.startTime = newStartTime;
      state.duration = newDuration;
      state.endTime = newEndTime;
    },
    timerReset: () => initialState,
  },
});

export const { timerStart, timerPause, timerContinue, timerReset } = timerSlice.actions;

export default timerSlice.reducer;
