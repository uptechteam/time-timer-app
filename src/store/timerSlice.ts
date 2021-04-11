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
      const { startTime, duration } = action.payload;
      if (duration > 0) {
        state.isRunning = true;
        state.startTime = startTime;
        state.duration = duration;
        state.endTime = startTime + duration;
      }
    },
    timerPause: (state, action: PayloadAction<TimerPauseAction>) => {
      if (state.duration > 0 && state.isRunning) {
        const newDuration = state.duration - (action.payload.pausedAt - state.startTime);

        state.isRunning = false;
        state.pausedAt = action.payload.pausedAt;
        state.duration = newDuration;
      }
    },
    timerContinue: (state, action: PayloadAction<TimerContinueAction>) => {
      if (state.startTime > 0) {
        const newStartTime = action.payload.startTime;
        // const newDuration = state.duration - (state.pausedAt - state.startTime);
        const newEndTime = newStartTime + state.duration;

        state.isRunning = true;
        state.pausedAt = 0;
        state.startTime = newStartTime;
        // state.duration = newDuration;
        state.endTime = newEndTime;
      }
    },
    timerReset: () => initialState,
  },
});

export const { timerStart, timerPause, timerContinue, timerReset } = timerSlice.actions;

export default timerSlice.reducer;
