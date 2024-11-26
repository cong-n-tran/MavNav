import React, { useState } from "react";
import { Pressable, View, Text, ScrollView, Image, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyledView, StyledText } from "../../Style/Style";
import { buildingLocations, 
    getBuildingDataByInitals, 
    getBuildingInitalsByName,
    getBuildingLocationByName, 
    getBuildingLayoutByName
 } from "../MainPage/Map/Locations/BuildingLocations";
import { parkingLocations, getParkingLocationByName, getParkingLayoutByName } from "./Map/Locations/ParkingLocations";
import { closestEntry } from "./Map/HelperFunctions/MapHelperFunctions";


import LinearGradient from "react-native-linear-gradient";

const MainPage = ({ navigation }) => {
    // const startLabel = "MAC";
    // const endLabel = "Geoscience Building";
    // const [startLocationLabel, setStartLocationLabel] = useState(startLabel);
    // const [endLocationLabel, setEndLocationLabel] = useState(endLabel);

    // const getLocationByName = (name) => buildingLocations.find(loc => loc.name === name)?.coordinates.default;

    // const handleConfirmLocations = () => {
    //     const startLocation = getLocationByName(startLocationLabel);
    //     const endLocation = getLocationByName(endLocationLabel);
    //     if (startLocation && endLocation) {
    //         navigation.navigate('GoogleMap', {
    //             startLocation: startLocation,
    //             endLocation: endLocation,
    //         });
    //     }
    // };
    const startLabel = "MAC"; // defaults
    const endLabel = "Science Hall"; //default
    const  roomlabel = "SH_109"; // default

    const [startLocationLabel, setStartLocationLabel] = useState('');
    const [endLocationLabel, setEndLocationLabel] = useState('');
    const [roomLocationLabel, setRoomLocationLabel] = useState('');

    // boolean to show this picker
    const [showRoomSelection, setShowRoomSelection] = useState(false);
    const [roomOptions, setRoomOptions] = useState([]); // display rooms
    const [currentFloor, setCurrentFloor] = useState(1);

    const handleConfirmLocations = () => {
      //return an hashmap
      var startCoordinates = getBuildingLocationByName(startLocationLabel);
      var endCoordinates = getBuildingLocationByName(endLocationLabel);

      //no need to change
      var endLocationLayout = getBuildingLayoutByName(endLocationLabel);
      
      if (!startCoordinates){
        startCoordinates = getParkingLocationByName(startLocationLabel);
      } 
      if (!endCoordinates){
        endCoordinates = getParkingLocationByName(endLocationLabel);
      } 
      if (!endLocationLayout){
        endLocationLayout = getParkingLayoutByName(endLocationLabel);
      } 

      // if cannot find anything
      if (!startCoordinates || !endCoordinates) {
        Alert.alert("Selection Required", "Please select valid start and end locations.");
        return; // Exit early if the start or end location is invalid
      }

      var endLocation = endCoordinates.default
      
      // Check if the end location is a building (requires room selection)
      let isEndLocationBuilding = Object.keys(endCoordinates.entries).length > 0;
      let endLocationObject = null;
      if (isEndLocationBuilding) {
        endLocationObject = closestEntry(startCoordinates.default, endCoordinates.entries);
      }
      else{
        endLocationObject = { name: endLocationLabel, coordinates: endLocation };
      }

      if (startCoordinates && endLocation) {
        if (isEndLocationBuilding && roomLocationLabel.length === 0) {
          Alert.alert("Room Selection Required", "Please select a room for the end location.");
        } else {
          navigation.navigate('GoogleMap', {
            startLocation: startCoordinates.default,
            endLocationObject: endLocationObject,
            roomLabel: roomLocationLabel,
            endLocationLayout: endLocationLayout,
          });
    }
      } else {
        Alert.alert("Selection Required", "Please select both start and end locations.");
      }
    };

    const handleEndLocationConfirmation = (itemValue) => {
      setEndLocationLabel(itemValue);

      // Reset room options if end location is empty
      if (!itemValue) {
        setShowRoomSelection(false);
        setRoomOptions([]);
      } else if (getBuildingLocationByName(itemValue)) {
        setShowRoomSelection(true);
        try {
          const buildingInitals = getBuildingInitalsByName(itemValue);
          const buildingData = getBuildingDataByInitals(buildingInitals);
          const buildRoomInformation = buildingData[0].rooms[currentFloor];
          setRoomOptions(buildRoomInformation ? Object.keys(buildRoomInformation) : []); // Assuming the mock data has the rooms as keys
        } catch (error) {
          console.error("Error loading building data:", error);
          setRoomOptions([]); // fallback to an empty array if loading fails
        }
      } else {
        setShowRoomSelection(false);
        setRoomOptions([]);
      }
    }

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
                            selectedValue={startLocationLabel || ''}
                            onValueChange={(itemValue) => setStartLocationLabel(itemValue)}
                            style={{ flex: 1 }} // Allows the picker to take the remaining space
                        >
                            <Picker.Item label="Select Start Location" value="" enabled={startLocationLabel === ''} />
                            {buildingLocations.map((loc, index) => (
                                <Picker.Item key={index} label={loc.name} value={loc.name} />
                            ))}
                            {parkingLocations.map((loc, index) => (
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
                            onValueChange={(itemValue) => handleEndLocationConfirmation(itemValue)}
                            style={{ flex: 1 }} // Allows the picker to take the remaining space
                        >
                            <Picker.Item label="Select End Location" value="" enabled={endLocationLabel === ''} />
                            {buildingLocations.map((loc, index) => (
                                <Picker.Item key={index} label={loc.name} value={loc.name} />
                            ))}
                            {parkingLocations.map((loc, index) => (
                                <Picker.Item key={index} label={loc.name} value={loc.name} />
                            ))}
                        </Picker>
                    </View>

                    {showRoomSelection && (
                    <View className="flex-row items-center space-x-4 border-b border-gray-200 pb-4 mb-6"> 
                        {/* <Text className="text-lg font-semibold mt-4 mb-2">Choose Room Option</Text> */}
                        <Image
                            source={require("../../../assets/images/003-placeholder.png")} // Replace with your end icon path
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                        <Picker
                            selectedValue={roomLocationLabel || ''}
                            onValueChange={(itemValue) => setRoomLocationLabel(itemValue)}
                            style={{ flex: 1 }}
                        >
                        <Picker.Item label="Select Room Option" value="" enabled={roomLocationLabel === ''} />

                        {roomOptions && roomOptions.length > 0 ? (
                            roomOptions.map((roomName, index) => (
                            <Picker.Item key={index} label={roomName} value={roomName} />
                            ))
                        ) : (
                            <Picker.Item label="No rooms available" value={null} />
                        )}
                        </Picker>
                    </View>
                    )}

                    {/* Confirm Button */}
                    <Pressable
                        onPress={handleConfirmLocations}
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-3 rounded-lg shadow-sm"
                    >
                        <Text className="text-center text-white font-bold text-lg">Let's Go</Text>
                    </Pressable>
                </StyledView>

                {/*  conditional showing of room selection picker*/}
                

                {/* You May Like Section */}
                {/* <StyledView className="px-6 mt-6">
                    <StyledText className="text-lg font-bold text-gray-800 mb-4">You may like</StyledText>
                    <View className="flex-row space-x-6">
                        <Pressable className="items-center space-y-2"  onPress={handleConfirmLocations}>
                            <View className="w-16 h-16 bg-orange-200 rounded-full items-center justify-center">
                                <Image
                                    source={require("../../../assets/images/001-office-building.png")} // Replace with your end icon path
                                    style={{ width: 24, height: 24 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="text-gray-700">Towkay Club</Text>
                        </Pressable>
                        <Pressable className="items-center space-y-2"  onPress={handleConfirmLocations}>
                            <View className="w-16 h-16 bg-orange-200 rounded-full items-center justify-center">
                                <Image
                                    source={require("../../../assets/images/003-restaurant.png")} // Replace with your end icon path
                                    style={{ width: 24, height: 24 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="text-gray-700">Delivery form</Text>
                        </Pressable>
                    </View>
                </StyledView> */}
            </StyledView>

        </ScrollView>

    );
};

export default MainPage;
