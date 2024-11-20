import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from "../Screens/MainPage/MainPage";
import FindRoom from "../Screens/MainPage/Map/FindRoom";
import GoogleMap from "../Screens/MainPage/Map/GoogleMap";
import MACLayoutScreen from "../Screens/MainPage/Map/Buildings/MACLayoutScreen";
import GeoscienceLayoutScreen from "../Screens/MainPage/Map/Buildings/GeoscienceLayoutScreen";
import SEIRLayoutScreen from "../Screens/MainPage/Map/Buildings/SEIRLayoutScreen";
import ScienceHallLayoutScreen from "../Screens/MainPage/Map/Buildings/ScienceHallLayoutScreen";

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
          <MainPageScreen.Screen 
            name="GoogleMap" 
            component={GoogleMap} 
          />
          <MainPageScreen.Screen 
            name="MACLayoutScreen" 
            component={MACLayoutScreen} 
          />
          <MainPageScreen.Screen 
            name="GeoscienceLayoutScreen" 
            component={GeoscienceLayoutScreen} 
          />
          <MainPageScreen.Screen 
            name="SEIRLayoutScreen" 
            component={SEIRLayoutScreen} 
          />
          <MainPageScreen.Screen 
            name="ScienceHallLayoutScreen" 
            component={ScienceHallLayoutScreen} 
          />

        </MainPageScreen.Navigator>
    );
}
export default MainPageScreenStack;