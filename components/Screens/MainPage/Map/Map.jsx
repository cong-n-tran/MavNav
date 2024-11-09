import React, { useEffect, useState, useRef } from 'react';
import { View, Text, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { 
  decode, 
  haversine, 
  calculateZoomLevel, 
  calculateHeading 
} from './MapHelperFunctions';
import { GOOGLE_MAPS_APIKEY } from '../../../API';

const GoogleMap = () => {

  const [userLocation, setUserLocation] = useState({
    latitude: 32.731841,  // UTA parking lot
    longitude: -97.116840,
  });

  const [destination, setDestination] = useState({
    latitude: 32.731812, 
    longitude: -97.113861 // geoscience building
  });

  //purely for ploting and drawing the polyline
  const [routeCoordinates, setRouteCoordinates] = useState([]); //stores the decoded overview_polyview coordiantes

  
  const [directions, setDirections] = useState([]); // directions from the response.data.routes[0].legs[0].steps
  const [currentStep, setCurrentStep] = useState(null); // Step-by-step directions
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Current step in directions

  const [zoomLevel, setZoomLevel] = useState(0.0025); //control the zooming

  const [mapHeading, setMapHeading] = useState(0); // Controls the direction the map faces
  let mapViewRef = React.createRef(); // path direction

  const fetchDirections = async () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}&mode=walking`;
    try {
      const response = await axios.get(url);
      const points = decode(response.data.routes[0].overview_polyline.points);
      const directions = response.data.routes[0].legs[0].steps;
      const firstStep = directions[0];
      // const firstStepDirection = calculateHeading(firstStep.start_location, firstStep.end_location)
      const distance = haversine(userLocation.latitude, userLocation.longitude, destination.latitude, destination.longitude);

      const zoomLevel = calculateZoomLevel(distance);
      // Set the camera to show the full route initially
      const camera = {
        center: { latitude: (userLocation.latitude + destination.latitude) / 2, longitude: (userLocation.longitude + destination.longitude) / 2 },
        zoom: zoomLevel, // Set zoom to show the full route
        pitch: 0, // Set pitch for a tilted view (sky view)
      };
      mapViewRef.current.animateCamera(camera, { duration: 1000 });

      setRouteCoordinates(points);
      setDirections(directions); 
      setCurrentStep(firstStep);
      // setMapHeading(firstStepDirection);
    } catch (error) {
        console.error('Error fetching directions:', error);
    }
  };

  useEffect(() => {
    fetchDirections();
  }, [destination]);

  useEffect(() => {
    if (mapHeading !== null) {
      rotateCamera(mapHeading);
    }
  }, [mapHeading]);


  const goToNextStep = () => {
    if (currentStepIndex < directions.length-1) { // Ensures we don't go out of bounds
      const newIndex = currentStepIndex + 1;
      const nextStep = directions[newIndex]; // Calculate the next step index
      const newHeaderDirection = calculateHeading(nextStep.start_location, nextStep.end_location)

      setCurrentStepIndex(newIndex); // Update index
      setCurrentStep(nextStep); // Set the new current step
      setUserLocation({
        latitude: nextStep.start_location.lat,
        longitude: nextStep.start_location.lng,
      });
      setMapHeading(newHeaderDirection);
      rotateCamera(newHeaderDirection);
      
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      const prevStep = directions[prevIndex];
      const prevHeaderDirection = calculateHeading(prevStep.start_location, prevStep.end_location)

      setCurrentStepIndex(prevIndex);
      setCurrentStep(prevStep);
      setUserLocation({
        latitude: prevStep.start_location.lat,
        longitude: prevStep.start_location.lng,
      });
      setMapHeading(prevHeaderDirection);
      rotateCamera(prevHeaderDirection);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel / 2); // Zoom in
  };
  
  const handleZoomOut = () => {
    setZoomLevel(zoomLevel * 2); // Zoom out
  };

  

  const rotateCamera = (heading) => {
    const camera = {
      center: { latitude: userLocation.latitude, longitude: userLocation.longitude },
      heading: heading, // Apply the calculated heading to the camera
      pitch: 60, // Optional: Set pitch to 0 for a flat view
      zoom: 20, // Optional: Set zoom level (you can adjust this based on your preference)
    };
    // Animate the camera to the new heading
    mapViewRef.current.animateCamera(camera, { duration: 1000 }); // Optional: Adjust duration for smoothness
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
        ref={mapViewRef}
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
        <View className="absolute bottom-12 left-4 right-4 p-5 bg-white rounded-2xl shadow-lg">
          {/* Step Details */}
          <Text className="text-lg font-bold text-gray-800">Next Step:</Text>
          <Text className="text-base text-gray-700 mt-2">{currentStep.html_instructions.replace(/<[^>]+>/g, '')}</Text>
          <Text className="mt-3 text-sm text-gray-500">Distance: {currentStep.distance.text}</Text>

          <View className="mt-6 flex flex-row justify-between space-x-4">
            {/* Navigation Buttons */}
            <TouchableOpacity onPress={goToPreviousStep} className="flex-1 bg-blue-500 p-3 rounded-full shadow-lg flex justify-center items-center">
              <Text className="text-white text-lg font-medium">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextStep} className="flex-1 bg-green-500 p-3 rounded-full shadow-lg flex justify-center items-center">
              <Text className="text-white text-lg font-medium">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View className="absolute top-1/2 right-4 flex flex-col space-y-2">
        <TouchableOpacity onPress={handleZoomIn} className="bg-transparent border-2 border-gray-800 p-3 rounded-full shadow-md flex justify-center items-center">
          <Text className="text-3xl text-gray-800">+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} className="bg-transparent border-2 border-gray-800 p-3 rounded-full shadow-md flex justify-center items-center">
          <Text className="text-3xl text-gray-800">-</Text>
        </TouchableOpacity>
      </View>
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