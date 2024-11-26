import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert } from 'react-native';
import { NativeModules } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/EvilIcons';

import { StyledView, StyledText } from '../../Style/Style';

const { FirebaseAuthModule } = NativeModules;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      FirebaseAuthModule.loginUser(
        email,
        password,
        (userEmail) => {
          Alert.alert('Login successful', `Welcome ${userEmail}`);
        },
        (error) => {
          Alert.alert('Login failed', error);
        }
      );
    }
    else {
      Alert.alert('Email or Password is empty!');
    }
  };

  return (
    <StyledView className="flex-1 justify-start items-center bg-[#e37226] p-5">
      <StyledView className='flex items-start justify-end w-full mt-4 ml-4'>
        <Text onPress={() => navigation.goBack()}>Back</Text>
      </StyledView>
      <StyledText className="text-2xl font-bold text-blue-900 mb-4 mt-24">Login</StyledText>
      <StyledText className="text-lg font-regular text-[#ffffff] mb-12">Welcome Back!</StyledText>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
      />
      <Pressable
        className="bg-blue-800 py-4 rounded-lg w-1/2 mb-4"
        onPress={handleLogin}
      >
        <StyledText className="text-white text-center font-bold">Login</StyledText>
      </Pressable>
      <Pressable
        className="bg-gray-300 border-blue-800 border-2 py-4 rounded-lg w-1/2 mb-2"
        onPress={() => { navigation.navigate("Reset") }}
      >
        <StyledText className="text-blue-800 text-center font-bold">Forgot Password</StyledText>
      </Pressable>
    </StyledView>
  );
};

export default Login;