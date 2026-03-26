import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "../Screens/MainPage/Profile/Profile";
const ProfileScreenStack = () => {
    const ProfileScreen = createNativeStackNavigator();
     return (
        <ProfileScreen.Navigator screenOptions={{ headerShown: false }}>
          <ProfileScreen.Screen name="Profile Stack" component={Profile} />
        </ProfileScreen.Navigator>
    );
}
export default ProfileScreenStack;