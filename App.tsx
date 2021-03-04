import React from 'react';
import store from 'store';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from 'hooks/useCachedResources';
import Navigation from 'navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
