// tick - time in ms for each tick
// maxCounter - how many times to run tick
// For example: timer = 1000, maxCounter = 60 - a minute timer that will tick every second

const Timer = (repeater: (currentSeconds: number) => void, final: () => void) => {
  const tick = 1000;
  let isRunning = false;
  let timerStartAt = 0;

  const stopTimer = () => {
    isRunning = false;
  };

  const starTimer = () => {
    timerStartAt = new Date().getTime();

    isRunning = true;

    timerCycle(tick);
  };

  const timerCycle = (t: number) => {
    const currentCycleStartAt = new Date().getTime();

    setTimeout(() => {
      if (isRunning) {
        const fix = new Date().getTime() - currentCycleStartAt - tick; // make timeout more accurate
        timerCycle(t - fix);

        repeater(timerStartAt);
      } else {
        final();
      }
    }, t);
  };

  return {
    stopTimer,
    starTimer,
  };
};

export default Timer;
