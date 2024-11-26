import React from 'react';
import { View, Text, Pressable, Button, Image, ImageBackground } from 'react-native';
import { styled } from 'nativewind';

import { StyledView, StyledText } from '../../Style/Style';


const Home = ({ navigation }) => {
  return (
    <StyledView className="flex-1 justify-center items-center bg-white">
      <ImageBackground
        source={require("../../../assets/images/bg_landing_page.png")}
        resizeMode="cover"
        className='flex w-full h-full justify-between items-center'
      >

        <StyledView className='flex justify-center items-center mt-72'>
          <Image
            source={require("../../../assets/images/logo2.png")}
            className="w-20 h-20 rounded-full border-4 border-blue-800 mb-10"
          />
          <StyledText className=" italic text-xl font-mono text-blue-600 mb-4">
            Start your path with MavNav
          </StyledText>
          
        </StyledView>
        <StyledView className='flex w-full flex-row justify-center'>
          <Pressable
            className="bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-4"
            onPress={() => navigation.navigate('Login')}
            android_ripple={{ color: '#fff' }} // Adds a ripple effect on Android
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(37 99 235)' : 'rgb(59 130 246)', // Change color when pressed
              },
            ]}
          >
            <StyledText className="text-black font-bold">
              Login
            </StyledText>
          </Pressable>
          <Pressable
            className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onPress={() => navigation.navigate('Register')}
            android_ripple={{ color: '#fff' }} // Adds a ripple effect on Android
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(37 99 235)' : 'rgb(59 130 246)', // Change color when pressed
              },
            ]}
          >
            <StyledText className="text-black font-bold">
              Register
            </StyledText>
          </Pressable>
        </StyledView>
      </ImageBackground>
      {/* <Image
        source={require("../../../assets/images/bg_landing_page.png")}
        className = " bg- w-full h-[250px] bg-center-bottom bg-no-repeat bg-cover mb-8 md:bg-cover md:h-[350px]"
      /> */}





    </StyledView>
  );
};

export default Home;