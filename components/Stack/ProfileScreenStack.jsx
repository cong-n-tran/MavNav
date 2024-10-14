import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "../Screens/Profile";

const ProfileScreenStack = () => {
    const ProfileScreen = createNativeStackNavigator();
     return (
        <ProfileScreen.Navigator>
          <ProfileScreen.Screen name="Profile Stack" component={Profile} />
        </ProfileScreen.Navigator>
    );
}
export default ProfileScreenStack;