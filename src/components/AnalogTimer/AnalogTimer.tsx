import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Stop } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Extrapolate,
  useAnimatedGestureHandler,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerGestureEventNativeEvent,
  PanGestureHandlerEventExtra,
} from 'react-native-gesture-handler';
import polarToCartesian from 'utils/polarToCertesian';
import CenterTimerIcon from 'assets/svg/centerTimerIcon.svg';

const { width } = Dimensions.get('window');
const size = width - width / 3;
const halfSize = size / 2;
const halfWidth = width / 2;
const strokeWidth = width / 3;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const circumference = 2 * PI * r;
const timerCenter = halfWidth;
const oneHourInMs = 3600000;
const fifteenMinutesInMs = 900000;
const tenSecondsInMs = 10000;

const blackCircleRadius = width / 4.6875 / 2;
const orangeCircleRadius = width / 9.375 / 2;

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
  const velocity = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    // console.log(`duration: ${duration.value}`);
    // console.log(`timerIsRunning: ${timerIsRunning}`);
    // console.log(`timerPausedAt: ${timerPausedAt}`);

    const isRunning = timerIsRunning && timerPausedAt === 0;

    const progress = interpolate(
      isRunning ? 0 : duration.value,
      [0, oneHourInMs],
      [2 * PI * r, 0],
      Extrapolate.CLAMP,
    );

    const durationWithVelocity =
      (Math.floor(progress - duration.value) / -tenSecondsInMs / velocity.value) * 100;
    console.log(durationWithVelocity);
    let strokeDashoffset;
    if (isRunning) {
      strokeDashoffset = -progress + tenSecondsInMs;
    } else {
      strokeDashoffset = withTiming(-progress, {
        // duration: isRunning ? duration.value + tenSecondsInMs : 150,
        duration: 150,
        easing: Easing.linear,
      });
    }

    return {
      strokeDashoffset,
    };
  }, [duration.value, timerIsRunning, timerPausedAt]);

  /*
   *
   * Gesture Handlers
   *
   * */
  type gestureEvent = GestureHandlerGestureEventNativeEvent & PanGestureHandlerEventExtra;

  const prevAngle = useSharedValue(0);

  function setTimer(event: gestureEvent) {
    'worklet';

    const { x, y, velocityX, velocityY } = event;
    const velocityXY = Math.floor(Math.sqrt(velocityX ** 2 + velocityY ** 2));
    // console.log(velocityXY);

    // moving to Cartesian coordinate system
    const cartesianCoordSystem = { x: x - halfWidth, y: y - halfWidth };

    // rotating X and Y axis by 90 degrees counterclockwise
    const rotatedX =
      cartesianCoordSystem.x * Math.cos((90 * PI) / 180) -
      cartesianCoordSystem.y * Math.sin((90 * PI) / 180);
    const rotatedY =
      cartesianCoordSystem.x * Math.sin((90 * PI) / 180) +
      cartesianCoordSystem.y * Math.cos((90 * PI) / 180);

    // getting the angle in the Polar coordinate system
    let angleInPolarCoordSystem = Math.atan2(rotatedY, rotatedX);

    // setting the period
    if (angleInPolarCoordSystem > 0.0) {
      angleInPolarCoordSystem -= 2 * PI;
    }

    // radians to degrees conversion
    const angleInDegrees = Math.floor(-((180 / PI) * angleInPolarCoordSystem));

    let milliseconds = angleInDegrees * tenSecondsInMs;

    if (prevAngle.value > 330 && angleInDegrees > -1 && angleInDegrees < 270) {
      milliseconds = oneHourInMs;
    } else if (prevAngle.value < 30 && angleInDegrees > 90 && angleInDegrees < 360) {
      milliseconds = 0;
    } else {
      prevAngle.value = angleInDegrees;
    }

    if (milliseconds % 60000 === 0) {
      duration.value = milliseconds;
      velocity.value = velocityXY;
      // runOnJS(setDuration)(milliseconds);
    }
  }

  const minutesArray = new Array(12 * 6).fill(1);
  const hoursArray = new Array(12).fill(1);
  const radius = halfWidth - 48;

  const minuteSticks = minutesArray.map((minute, index) => {
    const start = polarToCartesian(halfSize, halfSize, radius - 11, index * 6);
    const end = polarToCartesian(halfSize, halfSize, radius - 5.34, index * 6);
    return (
      <Line
        stroke='gray'
        strokeWidth={1.5}
        strokeLinecap='square'
        key={index}
        x1={start.x}
        x2={end.x}
        y1={start.y}
        y2={end.y}
      />
    );
  });

  const HourSticks = () => {
    return (
      <>
        {hoursArray.map((hour, index) => {
          const start = polarToCartesian(halfSize, halfSize, radius - 11, index * 30);
          const end = polarToCartesian(halfSize, halfSize, radius, index * 30);
          return (
            <G key={index}>
              <Line
                stroke='black'
                strokeWidth={3.65}
                strokeLinecap='square'
                x1={start.x}
                x2={end.x}
                y1={start.y}
                y2={end.y}
              />
            </G>
          );
        })}
      </>
    );
  };

  const HoursNumbers = () => {
    return (
      <>
        {hoursArray.map((hour, index) => {
          const time = polarToCartesian(halfWidth - 10, halfWidth - 10, radius + 20, index * 30);
          return (
            <Text
              key={index}
              style={[
                styles.clockFaceNumbers,
                {
                  top: time.y,
                  left: time.x,
                },
              ]}
            >
              {index === 0 ? ' 0' : index === 11 ? ' 5' : (index * 5 - 60) / -1}
            </Text>
          );
        })}
      </>
    );
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      !timerIsRunning && !timerPausedAt && setTimer(event);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.clockFace}>
        <Svg width={width} height={width}>
          <G x={halfSize - r} y={halfSize - r}>
            {minuteSticks}
            <HourSticks />
          </G>
        </Svg>
        <HoursNumbers />
      </View>
      <CenterTimerIcon style={styles.centerTimerIcon} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <Svg width={width} height={width}>
            <Defs>
              <LinearGradient id='grad' x1='0%' y1='50%' x2='50%' y2='0'>
                <Stop offset='0' stopColor='#FDCB18' />
                <Stop offset='1' stopColor='#FD5918' />
              </LinearGradient>
            </Defs>
            <G x={halfSize - r} y={halfSize - r}>
              <Circle
                stroke='none'
                fill='#2E3138'
                {...{
                  strokeWidth,
                  cx,
                  cy,
                  r: blackCircleRadius,
                }}
              />

              <AnimatedCircle
                stroke='rgba(253, 89, 24, 0.85)'
                fill='none'
                strokeDasharray={`${circumference}`}
                x={0}
                y={size}
                rotation={-90}
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
                fill='rgba(253, 89, 24)'
                {...{
                  strokeWidth,
                  cx,
                  cy,
                  r: orangeCircleRadius,
                }}
              />
            </G>
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // borderWidth: 1,
  },
  clockFace: {
    position: 'absolute',
    // zIndex: 2,
  },
  clockFaceNumbers: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    position: 'absolute',
    right: 0,
    bottom: 0,
    // width: 32,
    // height: 32,
  },
  centerTimerIcon: {
    zIndex: 2,
    position: 'absolute',
    top: halfWidth - 17,
    left: halfWidth - 17,
    right: 0,
    bottom: 0,
  },
});

export default AnalogTimer;
