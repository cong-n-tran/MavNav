import React, {useState} from "react";
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { NativeModules } from 'react-native'
import { StyledText, StyledView } from "../../Style/Style";

const { FirebaseAuthModule } = NativeModules;

const Register = ({navigation}) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleRegister = () => {
        if (registerEmail && registerPassword){
            FirebaseAuthModule.registerUser(
                registerEmail,
                registerPassword,
                (userEmail) => {
                    Alert.alert('Registration successful', `User registered: ${userEmail}`);
                    navigation.goBack();
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
        <StyledView className="flex-1 justify-center items-center bg-blue-50 p-5">
            <StyledText className="text-2xl font-bold text-blue-600 mb-6">Register</StyledText>
            
            <TextInput
                placeholder="Email"
                value={registerEmail}
                onChangeText={setRegisterEmail}
                className="border-b-2 border-blue-300 mb-4 py-2 px-2 w-full"
                keyboardType="email-address"
            />
            
            <TextInput
                placeholder="Password"
                value={registerPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
                className="border-b-2 border-blue-300 mb-4 py-2 px-2 w-full"
            />
            
            <Pressable
                className="bg-blue-500 py-2 rounded-lg w-full mb-2"
                onPress={handleRegister}
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
    )


}
export default Register; 
