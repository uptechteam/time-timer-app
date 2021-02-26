import {Text, TouchableOpacity} from "react-native";
import React from "react";
import styles from './SettingsButtonStyles';
import SettingsIcon from "../../../assets/svg/settings-icon.svg";

const SettingsButton = ({navigation}) => {
    return (
        <TouchableOpacity style={styles.settingsButtonContainer} onPress={() => navigation.push('Settings')}>
           <SettingsIcon/>
        </TouchableOpacity>
    );
}

export default SettingsButton;
