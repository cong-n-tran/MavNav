import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { processFloorPlan } from '../HelperFunctions/PathFinderFunctions';
import { getScienceHallEntryPointCoordiantes } from '../Locations/BuildingLayout/SH/SH_1';


const ScienceHallLayoutScreen = ({ navigation, route }) => {
  const { width } = Dimensions.get('window');
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [processedImagePath, setProcessedImagePath] = useState(null);
  const [loading, setLoading] = useState(false);

  const { entryPoint, desiredRoom } = route.params;

  const entryCoordinates = getScienceHallEntryPointCoordiantes(entryPoint);

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

  
  useEffect(() => {
    if (startPoint && endPoint) {
      setLoading(true);

      processFloorPlan(
        "images/SH/SH_1.png",
        entryCoordinates.x,
        entryCoordinates.y,
        endPoint.x,
        endPoint.y
      )
        .then((path) => setProcessedImagePath(`file://${path}`))
        .catch((error) => Alert.alert('Error', error.message))
        .finally(() => setLoading(false));
    }
  }, [startPoint, endPoint]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImagePress}
        activeOpacity={1}
        style={{ position: 'relative' }}
      >
        {processedImagePath ? (
          <Image
            source={{ uri: processedImagePath }}
            style={[styles.image, { width: width * 0.9, height: width * 0.9 }]}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../../../../../android/app/src/main/assets/images/SH/SH_1.png')}
            style={[styles.image, { width: width * 0.9, height: width * 0.9 }]}
            resizeMode="contain"
          />
        )}
        {startPoint && (
          <View
            style={[
              styles.marker,
              { left: startPoint.x - 10, top: startPoint.y - 10, backgroundColor: 'green' },
            ]}
          />
        )}
        {endPoint && (
          <View
            style={[
              styles.marker,
              { left: endPoint.x - 10, top: endPoint.y - 10, backgroundColor: 'red' },
            ]}
          />
        )}
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
  },
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default ScienceHallLayoutScreen;
