import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import styles from './HomeScreenStyles';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default HomeScreen;
