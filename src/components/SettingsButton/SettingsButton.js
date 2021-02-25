import {Text, TouchableOpacity} from "react-native";
import React from "react";
import styles from './SettingsButtonStyles';

const SettingsButton = ({navigation}) => {
    return (
        <TouchableOpacity style={styles.settingsButtonContainer} onPress={() => navigation.push('Settings')}>
            <Text>Settings</Text>
        </TouchableOpacity>
    );
}

export default SettingsButton;
