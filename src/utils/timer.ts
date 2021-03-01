// timer - time in ms for each tick
// maxCounter - how many times to run tick
// For example: timer = 1000, maxCounter = 60 - a minute timer that will tick every second

const Timer = (timer: number, maxCounter: number, repeater: () => void, final: () => void) => {
  let counter = 1;

  const init = (t: number) => {
    const timeStart = new Date().getTime();
    setTimeout(function () {
      if (counter < maxCounter) {
        const fix = new Date().getTime() - timeStart - timer; // make timeout more accurate
        init(t - fix);
        counter++;

        // event to be repeated max times
        repeater();
      } else {
        // event to be executed at the end
        final();
      }
    }, t);
  };
  init(timer);
};

export default Timer;
