import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import client from './src/apollo/client';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
