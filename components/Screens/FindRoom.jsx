import React, {useState} from "react";
import { Text, View } from "react-native";
import { Button } from "react-native";

const FindRoom = ({navigation}) => {
    return (
        <View>
            <Text>
                this is the FindRoom
            </Text>
            <Button
                title="Go back"
                // onPress={() => navigation.goBack()}
            />
            
        </View>
    )
}
export default FindRoom; 