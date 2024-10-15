import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert } from 'react-native';
import { NativeModules } from 'react-native';
import { styled } from 'nativewind';

import { StyledView, StyledText } from '../../Style/Style';

const { FirebaseAuthModule } = NativeModules;






const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password){
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
    else{
        Alert.alert('Email or Password is empty!');
    }
  };

  return (
    <StyledView className="flex-1 justify-center items-center bg-blue-50 p-5">
      <StyledText className="text-2xl font-bold text-blue-600 mb-6">Login</StyledText>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border-b-2 border-blue-300 mb-4 py-2 px-2 w-full"
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border-b-2 border-blue-300 mb-4 py-2 px-2 w-full"
      />
      
      <Pressable
        className="bg-blue-500 py-2 rounded-lg w-full mb-2"
        onPress={handleLogin}
      >
        <StyledText className="text-white text-center font-bold">Login</StyledText>
      </Pressable>

      <Pressable
        className="bg-blue-500 py-2 rounded-lg w-full mb-2"
        onPress={() => navigation.navigate('Register')}
      >
        <StyledText className="text-white text-center font-bold">Register</StyledText>
      </Pressable>

      <Pressable
        className="bg-gray-300 py-2 rounded-lg w-full"
        onPress={() => navigation.goBack()}
      >
        <StyledText className="text-black text-center font-bold">Go back</StyledText>
      </Pressable>
    </StyledView>
  );
};

export default Login;