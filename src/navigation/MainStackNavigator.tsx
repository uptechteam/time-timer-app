import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import SettingsButton from 'components/SettingsButton';
import HomeScreen from 'screens/HomeScreen';
import SettingsScreen from 'screens/SettingsScreen';
import { RootStackParamList } from 'models/types';
import BackIcon from 'assets/svg/back-icon.svg';

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
        },
        headerTitleStyle: { fontFamily: 'Poppins-SemiBold', fontSize: 17 },
      })}
    >
      <MainStack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Timer',
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <MainStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={() => ({
          headerBackImage: () => <BackIcon />,
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerBackTitleVisible: false,
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
