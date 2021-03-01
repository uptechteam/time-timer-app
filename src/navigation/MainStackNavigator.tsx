import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import SettingsButton from 'components/SettingsButton';
import HomeScreen from 'screens/HomeScreen';
import SettingsScreen from 'screens/SettingsScreen';
import { RootStackParamList } from 'models/types';

const MainStack = createStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Timer',
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <MainStack.Screen name='Settings' component={SettingsScreen} />
    </MainStack.Navigator>
  );
}
