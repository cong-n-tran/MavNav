import React, {useState} from "react";
import {Pressable, View , Text, Modal, Alert} from "react-native";
import { Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { 
  buildingLocations, 
  getBuildingDataByInitals, 
  getBuildingInitalsByName,
  getBuildingLocationByName, 
  getBuildingLayoutByName 
} from "./Locations/BuildingLocations";
import { parkingLocations, getParkingLocationByName, getParkingLayoutByName } from "./Locations/ParkingLocations";
import { closestEntry } from "./HelperFunctions/MapHelperFunctions";

const FindRoom = ({ navigation }) => {
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
      <View className="p-4">
        <Text className="text-lg font-semibold mb-2">Choose Start Location</Text>
        <Picker
          selectedValue={startLocationLabel || ''}
          onValueChange={(itemValue) => setStartLocationLabel(itemValue)}
        >
          <Picker.Item label="Select Start Location" value="" enabled={startLocationLabel === ''} />
          {buildingLocations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
          {parkingLocations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
        </Picker>
  
        <Text className="text-lg font-semibold mt-4 mb-2">Choose End Location</Text>
        <Picker
          selectedValue={endLocationLabel}
          onValueChange={(itemValue) => handleEndLocationConfirmation(itemValue)// Properly call the function with the parameter
        }
        >
          <Picker.Item label="Select End Location" value="" enabled={endLocationLabel === ''} />
          {buildingLocations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
          {parkingLocations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
          {/*  conditional showing of room selection picker*/}
        </Picker>
        {showRoomSelection && (
          <View>
            <Text className="text-lg font-semibold mt-4 mb-2">Choose Room Option</Text>
            <Picker
              selectedValue={roomLocationLabel || ''}
              onValueChange={(itemValue) => setRoomLocationLabel(itemValue)}
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
  
        <Button title="Confirm Locations" onPress={handleConfirmLocations} />
      </View>
    );
  };
  
  export default FindRoom;