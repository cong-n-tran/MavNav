import React, { useState } from 'react';

import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';

import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator(); 

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Authentication" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
