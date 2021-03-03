import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import theme from 'theme/globalTheme';

import { RootStackParamList } from 'models/types';
import MainStackNavigator from 'navigation/MainStackNavigator';

export default function Navigation() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={MainStackNavigator} />
    </Stack.Navigator>
  );
}
