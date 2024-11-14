import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const GeoscienceLayoutScreen = ({navigation}) => {
  const { width } = Dimensions.get('window');
  return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={require('../../../../Images/GS147.png')}
      style={[styles.image, { width: width * 0.9, height: width * 0.9 }]} // Adjust as needed
        resizeMode="contain" // Makes the image fit within the screen
      />
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
    aspectRatio: 1, // Maintains the aspect ratio based on width
  },
});

export default GeoscienceLayoutScreen;
