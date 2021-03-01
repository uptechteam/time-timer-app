import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Timer from 'utils/timer';
import styles from './HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const [time, setTime] = useState(60);

  const repeater = (origin: number) => {
    const sec = 60 - Math.floor((new Date().getTime() - origin) / 1000);
    console.log(sec);

    setTime(sec);
  };

  const runTimer = (timer: number) => {
    const origin = new Date().getTime();
    Timer(
      timer,
      60,
      () => repeater(origin),
      () => repeater(origin),
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{time}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => runTimer(1000)}>
          <Text>Start Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
