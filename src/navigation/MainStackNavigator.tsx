import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import SettingsButton from 'components/SettingsButton';
import HomeScreen from 'screens/HomeScreen';
import SettingsScreen from 'screens/SettingsScreen';
import { RootStackParamList } from 'models/types';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerStyle: { shadowColor: 'transparent' },
          headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 17 },
          title: 'Timer',
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <MainStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={() => ({
          headerStyle: { shadowColor: 'transparent' },
          headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 17 },
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
