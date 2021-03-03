import { Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Timer from 'utils/timer';
import DigitalTimer from 'components/DigitalTimer';
import styles from './HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const [time, setTime] = useState(60000);
  const [formattedTime, setFormattedTime] = useState('00:00');

  const repeater = (currentSeconds: number) => {
    console.log(currentSeconds);
    setTime(currentSeconds);
  };

  const final = () => {
    console.log('stopped');
  };

  const timerRef = useRef(Timer(repeater, final));

  useEffect(() => {
    setFormattedTime(new Date(time).toISOString().substr(14, 5));
  }, [time]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <DigitalTimer time={formattedTime} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => timerRef.current.starTimer(time)}>
          <Text>Start Timer </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => timerRef.current.stopTimer()}>
          <Text>Stop Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
