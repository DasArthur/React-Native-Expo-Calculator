import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MainScreen from "./screens/main"
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}