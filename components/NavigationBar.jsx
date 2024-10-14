import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPageScreenStack from './Stack/MainPageScreenStack';
import ProfileScreenStack from './Stack/ProfileScreenStack';
import SettingPageStack from './Stack/SettingPageStack';

const NavigationBar = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="MainPageScreen" 
                component={MainPageScreenStack} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreenStack} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Settings" 
                component={SettingPageStack} 
                options={{ headerShown: false }} 
            />
        </Tab.Navigator>
    )
}
export default NavigationBar; 