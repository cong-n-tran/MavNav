import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPageScreenStack from '../Stack/MainPageScreenStack';
import ProfileScreenStack from '../Stack/ProfileScreenStack';
import SettingPageStack from '../Stack/SettingPageStack';
import { Pressable, View, Text, ScrollView, Image, Button } from "react-native";

const NavigationBar = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#0064B1', // UTA Blue for active icons
                tabBarInactiveTintColor: 'gray', // Gray for inactive icons
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 0.5,
                    borderTopColor: '#ddd',
                },
                headerShown: false, // Hide the header globally
            }}
        >
            <Tab.Screen
                name="Main"
                component={MainPageScreenStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require("../../assets/images/005-home.png")} // Replace with your start icon path
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreenStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require("../../assets/images/001-user.png")} // Replace with your start icon path
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    ),
                    tabBarLabel: 'Profile',
                }}
            />
            <Tab.Screen
                name="Events"
                component={SettingPageStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require("../../assets/images/002-election-event-on-a-calendar-with-star-symbol.png")} // Replace with your start icon path
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    ),
                    tabBarLabel: 'Events',
                }}
            />
        </Tab.Navigator>
    )
}
export default NavigationBar; 