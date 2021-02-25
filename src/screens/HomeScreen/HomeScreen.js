import {Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import styles from './HomeScreenStyles';
import Timer from '../../utils/timer'

const HomeScreen = () => {
    const [time, setTime] = useState(60);

    const repeater = (origin) => {

        const sec = 60 - Math.floor((new Date().getTime() - origin) / 1000);
        console.log(sec);

        setTime(sec)
    }

    const runTimer = (timer) => {
        const origin = new Date().getTime();
        Timer(1000, 60,() => repeater(origin),() => repeater(origin))
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{time}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => runTimer()}>
                    <Text>Start Timer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;
