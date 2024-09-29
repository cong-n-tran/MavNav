import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { NativeModules } from 'react-native';

const { FirebaseAuthModule } = NativeModules;

const AuthScreen = ({ navigation }) => {
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

  const handleRegister = () => {
    if (email && password){
        FirebaseAuthModule.registerUser(
            email,
            password,
            (userEmail) => {
                Alert.alert('Registration successful', `User registered: ${userEmail}`);
            },
            (error) => {
                Alert.alert('Registration failed', error);
            }
        );
    }
    else{
        Alert.alert('Email or Password is empty!');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go back to Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default AuthScreen;