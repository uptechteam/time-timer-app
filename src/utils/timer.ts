// tick - time in ms for each tick
// maxCounter - how many times to run tick
// For example: timer = 1000, maxCounter = 60 - a minute timer that will tick every second

const Timer = (repeater: (currentRealTime: number) => void, final: () => void) => {
  const tick = 1000;
  let counter = 1;
  let maxCounter = 0;
  let currentRealTime = 0;

  const stopTimer = () => {
    maxCounter = 0;
  };

  const starTimer = (max: number) => {
    maxCounter = max;
    currentRealTime = new Date().getTime();

    timerCycle(tick);
  };

  const timerCycle = (t: number) => {
    const timeStart = new Date().getTime();

    setTimeout(() => {
      if (counter < maxCounter) {
        const fix = new Date().getTime() - timeStart - tick; // make timeout more accurate
        timerCycle(t - fix);
        counter++;

        repeater(currentRealTime);
      } else {
        final();
      }
    }, t);
  };

  return {
    stopTimer,
    starTimer
  };
};


export default Timer;
