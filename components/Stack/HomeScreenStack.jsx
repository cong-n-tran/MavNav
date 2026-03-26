import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "../Screens/Login/Register";
import Login from "../Screens/Login/Login";
import Home from "../Screens/Login/Home";
import PasswordReset from "../Screens/Login/PasswordReset";


const HomeScreenStack = () => {
    const HomeScreen = createNativeStackNavigator();
     return (
        <HomeScreen.Navigator screenOptions={{ headerShown: false }}>
          <HomeScreen.Screen 
            name="Home" 
            component={Home} 
          />
          <HomeScreen.Screen 
            name="Login" 
            component={Login}
          />
          <HomeScreen.Screen 
            name="Register" 
            component={Register}
          />
          <HomeScreen.Screen 
            name="Reset" 
            component={PasswordReset}
          />
        </HomeScreen.Navigator>
    );
}
export default HomeScreenStack;