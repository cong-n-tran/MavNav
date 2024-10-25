import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import { getDistance } from 'geolib';
import axios from 'axios';
import { decode } from './Route';
import { StyledView } from '../../Style/Style';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAv00pCzwPTtVst6swwUCQUguGi9brAU9c';

const GoogleMap = () => {

  const [userLocation, setUserLocation] = useState({
    latitude: 32.731841,  // UTA parking lot
    longitude: -97.116840,
  });

  const [destination, setDestination] = useState({
    // latitude: 32.731841,  // Example classroom building
    // longitude: -97.114664,
    latitude: 32.731812, 
    longitude: -97.113861 // geoscience building
  });

  //purely for ploting and drawing the polyline
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // directions from the response.data.routes[0].legs[0].steps
  const [directions, setDirections] = useState([]);
  const [currentStep, setCurrentStep] = useState(null); // Step-by-step directions
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Current step in directions

  const [zoomLevel, setZoomLevel] = useState(0.01); //control the zooming


  

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel / 2); // Zoom in
  };
  
  const handleZoomOut = () => {
    setZoomLevel(zoomLevel * 2); // Zoom out
  };

  
  const fetchDirections = async () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}&mode=walking`;
    try {
      const response = await axios.get(url);
      const points = decode(response.data.routes[0].overview_polyline.points);
      const directions = response.data.routes[0].legs[0].steps;
      const firstStep = directions[0]
      setRouteCoordinates(points);
      setCurrentStep(firstStep);
      setDirections(directions); 
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  useEffect(() => {
    fetchDirections();
  }, [userLocation]);

  const goToNextStep = () => {
    if (currentStepIndex < directions.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setCurrentStep(directions[currentStepIndex + 1]);
    }
  };


  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        region={{
          latitude: userLocation.latitude, 
          longitude: userLocation.longitude, 
          latitudeDelta: zoomLevel, 
          longitudeDelta: zoomLevel,
        }}
        showsUserLocation={true}
      >
        {/* Marker for user's current location */}
        <Marker coordinate={userLocation} title="You are here" />

        {/* Marker for destination */}
        <Marker coordinate={destination} title="Your Destination" />

        {/* Polyline to show the route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
      {currentStep && (
      <View className="absolute bottom-24 left-3 right-3 p-4 bg-white rounded-lg shadow-lg">
        <Text className="text-lg font-bold">Next Step:</Text>
        <Text>{currentStep.html_instructions.replace(/<[^>]+>/g, '')}</Text>
        <Text className="mt-2 text-base">Distance: {currentStep.distance.text}</Text>
        <View className="mt-4">
          <Button title="Next Step" onPress={goToNextStep} />
        </View>
        <View className="mt-2">
          <Button title="Zoom In" onPress={handleZoomIn} />
          <Button title="Zoom Out" onPress={handleZoomOut} />
        </View>
      </View>
    )}
    </View>
  );
};

export default GoogleMap;



// // Get user's location with permission check
// const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             setUserLocation({
//               ...userLocation,
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => {
//             console.error(error);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       }
//     } else {
//       Geolocation.requestAuthorization('whenInUse').then(() => {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             setUserLocation({
//               ...userLocation,
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => {
//             console.error(error);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       });
//     }
//   };

// useEffect(() => {
//     requestLocationPermission();
//   }, []);