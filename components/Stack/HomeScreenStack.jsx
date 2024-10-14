import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "../Screens/Login/Register";
import Login from "../Screens/Login/Login";
import Home from "../Screens/Login/Home";


const HomeScreenStack = () => {
    const HomeScreen = createNativeStackNavigator();
     return (
        <HomeScreen.Navigator>
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
        </HomeScreen.Navigator>
    );
}
export default HomeScreenStack;