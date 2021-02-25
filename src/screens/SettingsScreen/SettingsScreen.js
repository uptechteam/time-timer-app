import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import React from "react";
import styles from './SettingsScreenStyles';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
            </View>
            <StatusBar style="auto" />
        </View>

    );
}

export default SettingsScreen;
