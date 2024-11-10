import React, {useState} from "react";
import {Pressable, View , Text, Modal} from "react-native";
import { Button } from "react-native";
import GoogleMap from "./Map";
import { Picker } from "@react-native-picker/picker";
import { locations } from "./Locations";
import { StyledText } from "../../../Style/Style";


const FindRoom = ({ navigation }) => {
    const startLabel = "MAC";
    const endLabel = "Geoscience Building";
    const [startLocationLabel, setStartLocationLabel] = useState(startLabel);
    const [endLocationLabel, setEndLocationLabel] = useState(endLabel);
    const [modalVisible, setModalVisible] = useState(false);
  
    
  
    const getLocationByLabel = (label) => locations.find(loc => loc.label === label)?.value;
  
    const handleConfirmLocations = () => {
      const startLocation = getLocationByLabel(startLocationLabel);
      const endLocation = getLocationByLabel(endLocationLabel);
  
      if (startLocation && endLocation) {
        // Open the modal to show GoogleMap
        setModalVisible(true);
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
            <Picker.Item key={index} label={loc.label} value={loc.label} />
          ))}
        </Picker>
  
        <Text className="text-lg font-semibold mt-4 mb-2">Choose End Location</Text>
        <Picker
          selectedValue={endLocationLabel}
          onValueChange={(itemValue) => setEndLocationLabel(itemValue)}
        >
          {locations.map((loc, index) => (
            <Picker.Item key={index} label={loc.label} value={loc.label} />
          ))}
        </Picker>
  
        <Button title="Confirm Locations" onPress={handleConfirmLocations} />
  
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
            <View className="flex-1 justify-center items-center bg-black" >  
                <View className="w-full h-0.75 bg-white rounded-lg overflow-hidden shadow-lg"> 
                <GoogleMap 
                    startLocation={getLocationByLabel(startLocationLabel)} 
                    endLocation={getLocationByLabel(endLocationLabel)} 
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
        </Modal>

      </View>
    );
  };
  
  export default FindRoom;