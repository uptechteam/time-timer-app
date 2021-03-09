import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Extrapolate,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerGestureEventNativeEvent,
  PanGestureHandlerEventExtra,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const size = width - 120;
const halfSize = size / 2;
const strokeWidth = 120;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const circumference = 2 * PI * r;

const oneHourInMs = 3600000;
// const oneHourInMs = 36000;
const tenSecondsInMs = 3600000;

interface CircularProgressProps {
  timerIsRunning: boolean;
  timerPausedAt: number;
  timerEndTime: number;
  timerStartAt: number;
  timerDuration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const AnalogTimer = ({
  setDuration,
  timerIsRunning,
  timerPausedAt,
  timerEndTime,
  timerStartAt,
  timerDuration,
}: CircularProgressProps) => {
  const duration = useSharedValue(timerDuration);

  const animatedProps = useAnimatedProps(() => {
    const progress = interpolate(
      timerIsRunning ? 0 : duration.value,
      [0, oneHourInMs],
      [2 * PI * r, 0],
      Extrapolate.CLAMP,
    );

    const strokeDashoffset = withTiming(-progress, {
      duration: timerIsRunning ? duration.value + tenSecondsInMs : 100,
      easing: Easing.linear,
    });

    return {
      strokeDashoffset,
    };
  }, [duration.value, timerIsRunning]);

  /*
   *
   * Gesture Handlers
   *
   * */
  type gestureEvent = GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra;

  const prevAngle = useSharedValue(0);

  function setTimer(event: gestureEvent) {
    'worklet';

    const { x, y } = event;

    const cartesianCoordSystem = { x: x - halfSize, y: y - halfSize }; // move to Cartesian coordinate system

    let angleInPolarCoordSystem = Math.atan2(cartesianCoordSystem.y, cartesianCoordSystem.x); // getting the angle in the Polar coordinate system

    if (angleInPolarCoordSystem > 0.0) {
      angleInPolarCoordSystem -= 2 * PI; // setting the period
    }

    const angleInDegrees = Math.floor(-((180 / PI) * angleInPolarCoordSystem)); // radians to degrees conversion
    let milliseconds = angleInDegrees * 10000;

    if (prevAngle.value > 358 && angleInDegrees > -1 && angleInDegrees < 315) {
      milliseconds = oneHourInMs;
    } else if (prevAngle.value < 1 && angleInDegrees > 45 && angleInDegrees < 360) {
      milliseconds = 0;
    } else {
      prevAngle.value = angleInDegrees;
    }

    if (milliseconds % 60000 === 0) {
      duration.value = milliseconds;
      runOnJS(setDuration)(milliseconds);
    }
  }

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      !timerIsRunning && !timerPausedAt && setTimer(event);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={styles.container}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id='grad' x1='0%' y1='50%' x2='50%' y2='0'>
              <Stop offset='0' stopColor='#FDCB18' />
              <Stop offset='1' stopColor='#FD5918' />
            </LinearGradient>
          </Defs>

          <Circle
            stroke='none'
            fill='#2E3138'
            {...{
              strokeWidth,
              cx,
              cy,
              r: r / 2,
            }}
          />

          <AnimatedCircle
            stroke='rgba(253, 89, 24, 0.85)'
            fill='none'
            strokeDasharray={`${circumference}, ${circumference}`}
            {...{
              animatedProps,
              strokeWidth,
              cx,
              cy,
              r,
            }}
          />

          <Circle
            stroke='none'
            fill='rgba(253, 89, 24, 0.85)'
            {...{
              strokeWidth,
              cx,
              cy,
              r: r / 4,
            }}
          />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    transform: [{ rotateZ: '270deg' }],
  },
});

export default AnalogTimer;
