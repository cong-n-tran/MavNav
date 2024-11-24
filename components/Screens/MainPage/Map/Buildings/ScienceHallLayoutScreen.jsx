import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import { processFloorPlan } from '../HelperFunctions/PathFinderFunctions';
import { getScienceHallEntryPointCoordinates, getScienceHallRoomPointCoordinates } from '../Locations/BuildingLayout/SH';


const ScienceHallLayoutScreen = ({ navigation, route }) => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [processedImagePath, setProcessedImagePath] = useState(null);
  const [loading, setLoading] = useState(false);

  const { entryPoint, desiredRoom } = route.params;

  const entryCoordinates = getScienceHallEntryPointCoordinates(entryPoint); // start point of the entry of the building
  const endCoordinates = getScienceHallRoomPointCoordinates(desiredRoom); // endpoint of a specific room

  const handleImagePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    if (!startPoint) {
      setStartPoint({ x: Math.round(locationX), y: Math.round(locationY) });
    } else if (!endPoint) {
      setEndPoint({ x: Math.round(locationX), y: Math.round(locationY) });
    } else {
      setStartPoint(null);
      setEndPoint(null);
      setProcessedImagePath(null);
    }
  };

  const handleGeneratePath = () => {
    if (!entryCoordinates || !endCoordinates) {
      Alert.alert('Error', 'Entry point or desired room coordinates are missing.');
      return;
    }
  
    setLoading(true);
  
    processFloorPlan(
      "images/SH/SH_1.png",
      entryCoordinates.x,
      entryCoordinates.y,
      endCoordinates.x,
      endCoordinates.y
    )
      .then((path) => setProcessedImagePath(`file://${path}`))
      .catch((error) => Alert.alert('Error', error.message))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (processedImagePath) {
      console.log('Path generated and rendered.');
    }
  }, [processedImagePath]);

  return (
    <View className="relative flex-1 justify-center items-center bg-white">
      <TouchableOpacity
        onPress={handleImagePress}
        activeOpacity={1}
        className="relative"
      >
        {processedImagePath ? (
          <Image
            source={{ uri: processedImagePath }}
            className="w-[140vw] h-[80vh] rounded-lg ml-6"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../../../../../android/app/src/main/assets/images/SH/SH_1.png')}
            className="w-[140vw] h-[80vh] rounded-lg ml-6"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="my-4" />
      )}

      <TouchableOpacity
        onPress={() => handleGeneratePath()}
        disabled={!entryCoordinates || !endCoordinates || loading}
        className={`absolute bottom-10 w-[80vw] py-3 rounded-lg ${
          loading ? 'bg-gray-400' : 'bg-blue-500'
        }`}
      >
        <Text
          className="text-center text-white font-semibold text-lg"
          style={{
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Processing...' : 'Generate Path'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ScienceHallLayoutScreen;
