import React, {useState} from "react";
import { Text, View } from "react-native";
import { Button } from "react-native";

const MainPage = ({navigation}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                Main Page - Welcome!
            </Text>
            <Button
                title="Go to Find Room"
                onPress={() => navigation.navigate('Find Room')}
            />
        </View>
    )

}
export default MainPage; 