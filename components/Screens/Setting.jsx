import React from 'react';
import { View, Text } from 'react-native';
import { StyledText, StyledView } from '../Style/Style';

const Setting = ({ navigation }) => {
  return (
    <StyledView className='flex-1 justify-center items-center bg-blue-50 p-6'>
      <StyledText className='text-4xl font-bold text-blue-800 mb-4'>
          setting!
      </StyledText>
    </StyledView>
  );
};

export default Setting;