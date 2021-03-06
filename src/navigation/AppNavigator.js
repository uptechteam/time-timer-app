import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsButton from '../components/SettingsButton'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Home"  component={HomeScreen}
            options={({ navigation }) => ({
                title: 'Timer',
                headerRight: () => (
                    <SettingsButton navigation={navigation} />
                ),
            })}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
