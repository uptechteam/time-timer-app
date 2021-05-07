// tick - time in ms for each tick

const Timer = (repeater: () => void) => {
  const tick = 1000;
  let isRunning = false;

  const stopTimer = () => {
    isRunning = false;
  };

  const starTimer = () => {
    isRunning = true;

    timerCycle(tick);
  };

  const continueTimer = () => {
    isRunning = true;

    repeater();
    timerCycle(tick);
  };

  const timerCycle = (t: number) => {
    const currentCycleStartAt = new Date().getTime();

    setTimeout(() => {
      if (isRunning) {
        const fix = new Date().getTime() - currentCycleStartAt - tick; // make timeout more accurate
        timerCycle(t - fix);

        repeater();
      }
    }, t);
  };

  return {
    stopTimer,
    starTimer,
    continueTimer,
  };
};

export default Timer;
