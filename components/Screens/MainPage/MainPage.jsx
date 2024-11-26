import React, { useState } from "react";
import { Pressable, View, Text, ScrollView, Image, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyledView, StyledText } from "../../Style/Style";
import { buildingLocations } from "../MainPage/Map/Locations/BuildingLocations";
import LinearGradient from "react-native-linear-gradient";

const MainPage = ({ navigation }) => {
    const startLabel = "MAC";
    const endLabel = "Geoscience Building";
    const [startLocationLabel, setStartLocationLabel] = useState(startLabel);
    const [endLocationLabel, setEndLocationLabel] = useState(endLabel);

    const getLocationByName = (name) => buildingLocations.find(loc => loc.name === name);

    const handleConfirmLocations = () => {
        const startLocation = getLocationByName(startLocationLabel);
        const endLocation = getLocationByName(endLocationLabel);

        if (startLocation && endLocation) {
            navigation.navigate('GoogleMap', {
                startLocation: startLocation,
                endLocationObject: endLocation,
                // roomLabel:"", 
                // endLocationLayout :""
            });
        }
    };

    return (
        <ScrollView>
            <StyledView className="flex-1 bg-gray-50">
                {/* Header */}
                <LinearGradient
                    colors={["#0064B1", "#003B73"]} // UTA Blue blending into a darker shade of blue
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="rounded-b-3xl shadow-md"
                    style={{ paddingHorizontal: 24, paddingVertical: 80 }}
                >
                    <StyledText className="text-white text-2xl font-bold mb-2">Welcome To <Text className="text-orange-400">Mav Nav</Text></StyledText>
                    <StyledText className="text-white text-lg">
                        Go where ever, when ever
                    </StyledText>
                </LinearGradient>

                {/* Delivery Card */}
                <StyledView className="bg-white shadow-lg mx-6 mt-[-30px] rounded-2xl p-6">
                    {/* Start Location Picker */}
                    <View className="flex-row items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                        <Image
                            source={require("../../../assets/images/004-placeholder-1.png")} // Replace with your start icon path
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                        <Picker
                            selectedValue={startLocationLabel}
                            onValueChange={(itemValue) => setStartLocationLabel(itemValue)}
                            style={{ flex: 1 }} // Allows the picker to take the remaining space
                        >
                            {buildingLocations.map((loc, index) => (
                                <Picker.Item key={index} label={loc.name} value={loc.name} />
                            ))}
                        </Picker>
                    </View>

                    {/* End Location Picker */}
                    <View className="flex-row items-center space-x-4 border-b border-gray-200 pb-4 mb-6">
                        <Image
                            source={require("../../../assets/images/002-location.png")} // Replace with your end icon path
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                        <Picker
                            selectedValue={endLocationLabel}
                            onValueChange={(itemValue) => setEndLocationLabel(itemValue)}
                            style={{ flex: 1 }} // Allows the picker to take the remaining space
                        >
                            {buildingLocations.map((loc, index) => (
                                <Picker.Item key={index} label={loc.name} value={loc.name} />
                            ))}
                        </Picker>
                    </View>

                    {/* Confirm Button */}
                    <Pressable
                        onPress={handleConfirmLocations}
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-3 rounded-lg shadow-sm"
                    >
                        <Text className="text-center text-white font-bold text-lg">Let's Go</Text>
                    </Pressable>
                </StyledView>

                
            </StyledView>

        </ScrollView>

    );
};

export default MainPage;
