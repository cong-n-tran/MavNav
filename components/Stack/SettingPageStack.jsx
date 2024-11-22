import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Setting from "../Screens/MainPage/Settings/Setting";
const SettingPageStack = () => {
    const SettingPage = createNativeStackNavigator();
     return (
        <SettingPage.Navigator screenOptions={{headerShown:false}}>
          <SettingPage.Screen name="Setting Stack" component={Setting} />
        </SettingPage.Navigator>
    );
}
export default SettingPageStack;