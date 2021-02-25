import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './src/navigation/AppNavigator';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{ animationEnabled: false, gestureEnabled: false, headerShown: false }}
            mode='modal'
        >
          <Stack.Screen name='App' component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
