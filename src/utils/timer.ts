// tick - time in ms for each tick
// maxCounter - how many times to run tick
// For example: timer = 1000, maxCounter = 60 - a minute timer that will tick every second

const Timer = (repeater: (currentSeconds: number) => void, final: () => void) => {
  const tick = 1000;
  let counter = 0;
  let maxCounter = 0;
  let currentSeconds = 0;

  const stopTimer = () => {
    maxCounter = 0;
  };

  const starTimer = ( timerInitNum: number) => {
    maxCounter = timerInitNum / tick;
    currentSeconds = timerInitNum;

    timerCycle(tick);
  };

  const timerCycle = (t: number) => {
    const timerStart = new Date().getTime();

    setTimeout(() => {

      if (counter < maxCounter) {
        const fix = new Date().getTime() - timerStart - tick; // make timeout more accurate
        timerCycle(t - fix);
        counter++;
        currentSeconds = currentSeconds - tick;

        repeater(currentSeconds);
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
