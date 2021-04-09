import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import Timer from 'utils/timer';
import DigitalTimer from 'components/DigitalTimer';
import AnalogTimer from 'components/AnalogTimer';
import { timerStart, timerPause, timerReset, timerContinue } from 'store/timerSlice';
import styles from './HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const timerIsRunning = useAppSelector((state) => state.timer.isRunning);
  const timerStartAt = useAppSelector((state) => state.timer.startTime);
  const timerDuration = useAppSelector((state) => state.timer.duration);
  const timerPausedAt = useAppSelector((state) => state.timer.pausedAt);
  const timerEndTime = useAppSelector((state) => state.timer.endTime);

  const [duration, setDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00');

  const timerRepeater = useCallback(() => {
    const currentTime = new Date().getTime();
    // rounding time diff to fix milliseconds calculation for visual representation
    const timeDiff = Math.round((timerEndTime - currentTime) / 1000) * 1000;

    if (timeDiff < 3600000) {
      setFormattedTime(new Date(timeDiff).toISOString().substr(14, 5));
    }

    if (timeDiff < 1000) {
      // timeDiff less than 1 second - timer finished
      dispatch(timerReset());
    }
  }, [duration, timerIsRunning]);

  const timerRef = useRef(Timer(timerRepeater));

  useEffect(() => {
    if (timerIsRunning) {
      timerRef.current = Timer(timerRepeater);
      if (timerPausedAt) {
        timerRef.current.continueTimer();
      } else {
        timerRef.current.starTimer();
      }
    } else {
      timerRef.current.stopTimer();
    }
  }, [timerIsRunning]);

  const startTimer = () => {
    const currentTime = new Date().getTime();
    dispatch(timerStart({ startTime: currentTime, duration }));
  };

  const pauseTimer = () => {
    const currentTime = new Date().getTime();
    dispatch(timerPause({ pausedAt: currentTime }));
  };

  const continueTimer = () => {
    const currentTime = new Date().getTime();
    dispatch(timerContinue({ startTime: currentTime }));
  };

  const resetTimer = () => {
    dispatch(timerReset());
    setDuration(0);
  };

  useEffect(() => {
    if (duration === 3600000) {
      setFormattedTime('60:00');
    } else {
      setFormattedTime(new Date(duration).toISOString().substr(14, 5));
    }
  }, [duration]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <DigitalTimer time={formattedTime} />
      </View>
      <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
        <AnalogTimer
          timerPausedAt={timerPausedAt}
          timerIsRunning={timerIsRunning}
          timerEndTime={timerEndTime}
          timerStartAt={timerStartAt}
          timerDuration={timerDuration}
          setDuration={setDuration}
        />
      </View>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => startTimer()}>
          <Text>Start </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pauseTimer()}>
          <Text>Pause </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => continueTimer()}>
          <Text>Continue </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetTimer()}>
          <Text>Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
