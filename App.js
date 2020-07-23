import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
//     'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
//     'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
//   });
// };

export default function App() {
  return <HomeScreen />;
}
