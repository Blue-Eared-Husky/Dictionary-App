import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import HomeScreen from "./screens/HomeScreen.js"

export default class App extends React.Component {
  render(){
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}