import React, {useState} from "react";
import {Pressable, View , Text, Modal} from "react-native";
import { Button } from "react-native";
import GoogleMap from "./GoogleMap";
import { Picker } from "@react-native-picker/picker";
import { locations } from "./Locations";

const FindRoom = ({ navigation }) => {
    const startLabel = "MAC";
    const endLabel = "Geoscience Building";
    const [startLocationLabel, setStartLocationLabel] = useState(startLabel);
    const [endLocationLabel, setEndLocationLabel] = useState(endLabel);
    const [modalVisible, setModalVisible] = useState(false);


    // return location coordinates - default for now
    const getLocationByName = (name) => locations.find(loc => loc.name === name)?.coordinates.default;

    // return location layout
    const getLocationLayoutByName = (name) => locations.find(loc => loc.name == name)?.layout;
  
    const handleConfirmLocations = () => {
      const startLocation = getLocationByName(startLocationLabel);
      const endLocation = getLocationByName(endLocationLabel);
      const endLocationLayout = getLocationLayoutByName(endLocationLabel);
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
          {locations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
        </Picker>
  
        <Text className="text-lg font-semibold mt-4 mb-2">Choose End Location</Text>
        <Picker
          selectedValue={endLocationLabel}
          onValueChange={(itemValue) => setEndLocationLabel(itemValue)}
        >
          {locations.map((loc, index) => (
            <Picker.Item key={index} label={loc.name} value={loc.name} />
          ))}
        </Picker>
  
        <Button title="Confirm Locations" onPress={handleConfirmLocations} />
      </View>
    );
  };
  
  export default FindRoom;