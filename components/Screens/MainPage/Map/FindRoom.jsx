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

  
    const getLocationByName = (name) => locations.find(loc => loc.name === name)?.coordinates.default;
  
    const handleConfirmLocations = () => {
      const startLocation = getLocationByName(startLocationLabel);
      const endLocation = getLocationByName(endLocationLabel);
      if (startLocation && endLocation) {
        // Navigate to the GoogleMap screen and pass the start and end locations
        navigation.navigate('GoogleMap', {
          startLocation: startLocation,
          endLocation: endLocation,
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
  
        {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
            <View className="flex-1 justify-center items-center bg-black" >  
                <View className="w-full h-0.75 bg-white rounded-lg overflow-hidden shadow-lg"> 
                <GoogleMap 
                    startLocation={getLocationByName(startLocationLabel)} 
                    endLocation={getLocationByName(endLocationLabel)} 
                />
                <View className="absolute top-4 left-4 z-10 p-4">
                    <Pressable 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onPress={() => setModalVisible(false)}
                    >
                    <Text>
                        Close
                    </Text>
                    </Pressable> 
                </View>
                </View>
            </View>
        </Modal> */}

      </View>
    );
  };
  
  export default FindRoom;