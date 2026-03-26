import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Events from "../Screens/MainPage/Events/Events";
const SettingPageStack = () => {
    const SettingPage = createNativeStackNavigator();
     return (
        <SettingPage.Navigator screenOptions={{headerShown:false}}>
          <SettingPage.Screen name="Setting Stack" component={Events} />
        </SettingPage.Navigator>
    );
}
export default SettingPageStack;