import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FindRoom from "../Screens/MainPage/Map/FindRoom";
const FindRoomScreenStack = () => {
    ProfileScreen = createNativeStackNavigator();
     return (
        <ProfileScreen.Navigator>
          <ProfileScreen.Screen name="Find Room" component={FindRoom} />
        </ProfileScreen.Navigator>
    );
}
export default FindRoomScreenStack;