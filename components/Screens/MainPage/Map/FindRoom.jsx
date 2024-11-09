import React, {useState} from "react";
import {Pressable, View } from "react-native";
import { StyledText, StyledView } from "../Style/Style";
import { Button } from "react-native";
import GoogleMap from "./Map";


const FindRoom = ({navigation}) => {
    return (
        // <StyledView className="flex-1 justify-center items-center bg-blue-50 p-6">
        <View>
            <GoogleMap />
            {/* <StyledText className="text-4xl font-bold text-blue-800 mb-4"> 
                Hi
            </StyledText> */}

            
        </View>
    )
}
export default FindRoom; 