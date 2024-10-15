import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from "../Screens/MainPage";
import FindRoom from "../Screens/FindRoom";

const MainPageScreenStack = () => {
    const MainPageScreen = createNativeStackNavigator();
     return (
        <MainPageScreen.Navigator>
          <MainPageScreen.Screen 
            name="Main Page Stack" 
            component={MainPage} 
          />
          <MainPageScreen.Screen 
            name="Find Room" 
            component={FindRoom}
          />
        </MainPageScreen.Navigator>
    );
}
export default MainPageScreenStack;