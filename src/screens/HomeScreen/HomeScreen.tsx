import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Timer from 'utils/timer';
import DigitalTimer from 'components/DigitalTimer';
import styles from './HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const [duration, setDuration] = useState(10000);
  const [formattedTime, setFormattedTime] = useState('00:00');

  const repeater = useCallback(
    (timerStartAt: number) => {
      const currentTime = new Date().getTime();
      const endTime = timerStartAt + duration + 1000;
      const diff = endTime - currentTime;

      console.log(diff);
      setFormattedTime(new Date(diff).toISOString().substr(14, 5));
    },
    [duration],
  );

  const final = () => {
    console.log('stopped');
  };

  const timerRef = useRef(Timer(repeater, final));

  useEffect(() => {
    setFormattedTime(new Date(duration).toISOString().substr(14, 5));
    timerRef.current = Timer(repeater, final);
  }, [duration]);

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
      >
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => setDuration(parseInt(text))}
          value={`${duration}`}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <DigitalTimer time={formattedTime} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => timerRef.current.starTimer()}>
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
