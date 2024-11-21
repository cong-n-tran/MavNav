import React, {useState} from "react";
import {Pressable, View , Text, Modal, Alert} from "react-native";
import { Button } from "react-native";
import GoogleMap from "./GoogleMap";
import { Picker } from "@react-native-picker/picker";
import { buildingLocations, getBuildingLocationByName, getBuildingLayoutByName } from "./Locations/BuildingLocations";
import { parkingLocations, getParkingLocationByName, getParkingLayoutByName } from "./Locations/ParkingLocations";
import { closestEntry } from "./HelperFunctions/MapHelperFunctions";

const FindRoom = ({ navigation }) => {
    const startLabel = "MAC"; // defaults
    const endLabel = "Science Hall"; //default

    const [startLocationLabel, setStartLocationLabel] = useState(startLabel);
    const [endLocationLabel, setEndLocationLabel] = useState(endLabel);

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
      var endLocation = endCoordinates.default
      
      // building map then entries > 0 else it is parking then entries == 0 
      if ((Object.keys(endCoordinates.entries).length > 0)){
        endLocationObject = closestEntry(startCoordinates.default, endCoordinates.entries);
      }

      if (startCoordinates && endLocation) {
        navigation.navigate('GoogleMap', {
          startLocation: startCoordinates.default, // the start positon will always be static 
          endLocationObject: endLocationObject,
          endLocationLayout: endLocationLayout,
        });
      } else {
        Alert.alert("Selection Required", "Please select both start and end locations.");
      }
    };
  
    return (
      <View className="p-4">
        <Text className="text-lg font-semibold mb-2">Choose Start Location</Text>
        <Picker
          selectedValue={startLocationLabel}
          onValueChange={(itemValue) => setStartLocationLabel(itemValue)}
        >
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
          onValueChange={(itemValue) => setEndLocationLabel(itemValue)}
        >
          {buildingLocations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
          {parkingLocations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
        </Picker>
  
        <Button title="Confirm Locations" onPress={handleConfirmLocations} />
      </View>
    );
  };
  
  export default FindRoom;