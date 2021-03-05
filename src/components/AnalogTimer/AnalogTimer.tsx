import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, ClipPath, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Extrapolate,
  useDerivedValue,
  useAnimatedGestureHandler,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const size = width - 120;
const strokeWidth = 120;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

interface CircularProgressProps {
  // progress: Animated.SharedValue<number>;
  timerIsRunning: boolean;
  timerEndTime: number;
  timerStartAt: number;
  timerDuration: number;
}

const AnalogTimer = ({
  timerIsRunning,
  timerEndTime,
  timerStartAt,
  timerDuration,
}: CircularProgressProps) => {
  const circumference = r * 2 * PI;

  // const duration = useSharedValue(0);

  const duration = useDerivedValue(() => {
    return timerDuration;
  }, [timerDuration]);

  const interpolatedProgress = interpolate(
    duration.value,
    [0, 3600000],
    // [0, 5000],
    [2 * PI * r, 0],
    Extrapolate.CLAMP,
  );

  const progress = useSharedValue(interpolatedProgress);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = withTiming(-progress.value, {
      duration: duration.value - 1000,
      easing: Easing.linear,
    });

    return {
      strokeDashoffset,
    };
  });

  // const derivedDuration = useDerivedValue(() => {
  //   return timerDuration;
  // }, [timerDuration]);

  // useEffect(() => {
  //   duration.value = timerDuration;
  // }, [timerDuration]);

  /*
   *
   * Gesture Handlers
   *
   * */

  /*  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent
  >({
    onStart: (_, ctx) => {
      ctx.startX = translation.x.value;
      ctx.startY = translation.y.value;
    },
    onActive: (event, ctx) => {
      translation.x.value = ctx.startX + event.translationX;
      translation.y.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      translation.x.value = withSpring(0);
      translation.y.value = withSpring(0);
    },
  }); */

  return (
    // <PanGestureHandler onGestureEvent={gestureHandler}>
    <Svg width={size} height={size} style={styles.container}>
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
          // strokeDashoffset,
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
    // </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
});

export default AnalogTimer;
