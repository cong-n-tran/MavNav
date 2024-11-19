import React, {useState} from "react";
import {Pressable, View , Text, Modal} from "react-native";
import { Button } from "react-native";
import GoogleMap from "./GoogleMap";
import { Picker } from "@react-native-picker/picker";
import { buildingLocations, getBuildingLocationByName, getBuildingLayoutByName } from "./Locations/BuildingLocations";
import { parkingLocations, getParkingLocationByName, getParkingLayoutByName } from "./Locations/ParkingLocations";

const FindRoom = ({ navigation }) => {
    const startLabel = "MAC"; // defaults
    const endLabel = "Geoscience Building"; //default

    const [startLocationLabel, setStartLocationLabel] = useState(startLabel);
    const [endLocationLabel, setEndLocationLabel] = useState(endLabel);

    const handleConfirmLocations = () => {
      var startLocation = getBuildingLocationByName(startLocationLabel);
      var endLocation = getBuildingLocationByName(endLocationLabel);
      var endLocationLayout = getBuildingLayoutByName(endLocationLabel);
      
      if (!startLocation){
        startLocation = getParkingLocationByName(startLocationLabel);
      } 
      if (!endLocation){
        endLocation = getParkingLocationByName(endLocationLabel);
      } 
      if (!endLocationLayout){
        endLocationLayout = getParkingLayoutByName(endLocationLabel);
      } 

      if (startLocation && endLocation) {
        navigation.navigate('GoogleMap', {
          startLocation: startLocation,
          endLocation: endLocation,
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