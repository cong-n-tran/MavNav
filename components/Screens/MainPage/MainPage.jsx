import React, {useState} from "react";
import { Pressable} from "react-native";

import { StyledView, StyledText } from "../../Style/Style";

const MainPage = ({navigation}) => {
    return (
        <StyledView className="flex-1 justify-center items-center bg-blue-50 p-6">
            <StyledText className="text-4xl font-bold text-blue-800 mb-4">
                This is the Main Page!
            </StyledText>
        
            <StyledText className="text-lg text-gray-700 text-center mb-6">
                yap yap yap yap yap yap yap yap yap
                yap yap yap yap yap yap yap yap yap
                yap yap yap yap yap yap yap yap yap
                yap yap yap yap yap yap yap yap yap
                yap yap yap yap yap yap yap yap
            </StyledText>
            <Pressable
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onPress={() => navigation.navigate('Find Room')}
                android_ripple={{ color: '#fff' }}
                style={({ pressed }) => [
                    {
                    backgroundColor: pressed ? 'rgb(37 99 235)' : 'rgb(59 130 246)', // Change color when pressed
                    },
                ]}
            >
                {/*  i need to add options from different starting locations to destination location */}
                <StyledText className="text-white font-bold">
                    Find Room
                </StyledText>
            </Pressable>
        </StyledView>
    )

}
export default MainPage; 