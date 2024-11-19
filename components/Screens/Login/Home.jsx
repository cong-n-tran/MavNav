import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { styled } from 'nativewind';

import { StyledView, StyledText } from '../../Style/Style';


const Home = ({ navigation }) => {
  return (
    <StyledView className="flex-1 justify-center items-center bg-blue-50 p-6">

      <StyledText className="text-4xl font-bold text-blue-800 mb-4">
        MavNav
      </StyledText>

      <StyledText className="text-lg text-gray-700 text-center mb-6">
        Welcome to our app! We created this platform to help users easily navigate
        through their daily tasks. It's designed to simplify your routine and make
        life more efficient. Log in to get started!
      </StyledText>

      <StyledView className='flex w-full flex-row justify-center'>
        <Pressable
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          onPress={() => navigation.navigate('Login')}
          android_ripple={{ color: '#fff' }} // Adds a ripple effect on Android
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(37 99 235)' : 'rgb(59 130 246)', // Change color when pressed
            },
          ]}
        >
          <StyledText className="text-white font-bold">
            Login
          </StyledText>
        </Pressable>
        <Pressable
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onPress={() => navigation.navigate('Register')}
          android_ripple={{ color: '#fff' }} // Adds a ripple effect on Android
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(37 99 235)' : 'rgb(59 130 246)', // Change color when pressed
            },
          ]}
        >
          <StyledText className="text-white font-bold">
            Register
          </StyledText>
        </Pressable>
      </StyledView>
    </StyledView>
  );
};

export default Home;