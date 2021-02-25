import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsButton from '../components/SettingsButton'
import {StatusBar} from "expo-status-bar";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <>
          <StatusBar style="auto" />
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
      </>
  );
};

export default AppNavigator;
