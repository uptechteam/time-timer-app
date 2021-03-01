import { TouchableOpacity } from 'react-native';
import React from 'react';
import SettingsIcon from 'assets/svg/settings-icon.svg';
import { NavigationProps } from 'models/types';
import styles from './SettingsButtonStyles';



const SettingsButton: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.settingsButtonContainer}
      onPress={() => navigation.push('Settings')}
    >
      <SettingsIcon />
    </TouchableOpacity>
  );
};

export default SettingsButton;
