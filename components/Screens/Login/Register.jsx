import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { NativeModules } from 'react-native'
import { StyledText, StyledView } from "../../Style/Style";

const { FirebaseAuthModule } = NativeModules;

const Register = ({ navigation }) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentId, setStudetId] = useState('')

    const handleRegister = () => {
        if (registerEmail && registerPassword) {
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
        else {
            Alert.alert('Email or Password is empty!');
        }
    };
    return (
        <StyledView className="flex-1 justify-start items-center bg-[#e37226] p-5">
            <StyledView className='flex items-start justify-end w-full mt-4 ml-4'>
                <Text onPress={() => navigation.goBack()}>Back</Text>
            </StyledView>
            <StyledText className="text-2xl font-bold text-blue-900 mb-4 mt-14">Create An Account</StyledText>
            <StyledText className="text-lg font-regular text-[#ffffff] mb-12">Get signed up!</StyledText>
            <StyledView className="flex w-full flex-row">
                <TextInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    className="mr-2 flex-1 bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
                />

                <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    className="flex-1 bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
                />

            </StyledView>
            <TextInput
                placeholder="Student Id"
                value={studentId}
                onChangeText={setStudetId}
                className="bg-[#F4F6FF] px-8 w-full rounded-lg font-semibold pl-4 py-4 mb-4"
            />
            <TextInput
                placeholder="Email"
                value={registerEmail}
                onChangeText={setRegisterEmail}
                className="bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Password"
                value={registerPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
                className="bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
            />


            <Pressable
                className="bg-blue-800 py-4 rounded-lg w-1/2 mb-2"
                onPress={handleRegister}
            >
                <StyledText className="text-white text-center font-bold">Register</StyledText>
            </Pressable>
        </StyledView>
    )
}
export default Register; 
