/*
 * Timer store types section
 * */

export interface TimerState {
  startTime: number; // time, when the timer has started
  duration: number;
  endTime: number; // calculated time, when the timer will be finished
  pausedAt: number; // time, when the timer has paused
  isRunning: boolean;
}

export type TimerStartAction = {
  startTime: number;
  duration: number;
};

export type TimerPauseAction = {
  pausedAt: number;
};

export type TimerContinueAction = {
  startTime: number;
};
/*
 * next section
 * */
