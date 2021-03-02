import { Text, View, TouchableOpacity } from 'react-native';
import React, {useRef, useState} from 'react';
import Timer from 'utils/timer';
import styles from './HomeScreenStyles';


const HomeScreen: React.FC = () => {
  const [time, setTime] = useState('00:59');
  const timeInMilliseconds = ( Number(time.split(':')[0])*60 + Number(time.split(':')[1]) ) * 1000;

  const repeater = (currentRealTime: number) => {


    const seconds =  Math.floor(timeInMilliseconds - (new Date().getTime() - currentRealTime));
    console.log(seconds);

    const formattedTime = new Date(seconds).toISOString().substr(14, 5);

    setTime(formattedTime);
  };

  const final = () => {
    console.log('stopped');
  };

  const timerRef = useRef(Timer(
      repeater,
      final,
  ));

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{time}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => timerRef.current.starTimer(timeInMilliseconds / 1000)}>
          <Text>Start Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => timerRef.current.stopTimer()}>
          <Text>Stop Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
