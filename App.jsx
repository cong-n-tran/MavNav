import React, { useState, useEffect } from 'react';

import NavigationBar from './components/NavigationBar';
import HomeScreenStack from './components/Stack/HomeScreenStack';

import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';




enableScreens();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  return (
    <NavigationContainer>
        {user ? (
          <>
            <NavigationBar/>
          </>
        ) : (
          <>
            <HomeScreenStack/>
          </>
        )}
      
    </NavigationContainer>
  );
};
export default App;
