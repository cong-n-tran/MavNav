import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert } from 'react-native';
import { NativeModules } from 'react-native';
import { StyledView, StyledText } from '../../Style/Style';

const { FirebaseAuthModule } = NativeModules;

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleReset = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
    }, 5000)


  };

  return (
    <StyledView className="flex-1 justify-start items-center bg-[#e37226] p-5">
      <StyledView className='flex items-start justify-end w-full mt-4 ml-4'>
        <Text onPress={() => navigation.goBack()}>Back</Text>
      </StyledView>
      <StyledText className="text-2xl font-bold text-blue-800 mb-4 mt-24">Reset Password</StyledText>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Student Id"
        value={studentId}
        onChangeText={setStudentId}
        className="bg-[#F4F6FF] w-full rounded-lg font-semibold pl-4 py-4 mb-4"
      />

      <Pressable
        className="bg-blue-800 py-4 rounded-lg w-1/2 mb-4"
        onPress={handleReset}
      >
        <StyledText className="text-white text-center font-bold">Reset Password</StyledText>
      </Pressable>
      {showConfirmation && <StyledText className="text-green-300 text-center font-bold">Password reset sent to email to login.</StyledText>}
    </StyledView>
  );
};

export default PasswordReset;