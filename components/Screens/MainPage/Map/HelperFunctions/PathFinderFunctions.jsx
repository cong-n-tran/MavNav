import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';

const { ImageProcessor } = NativeModules;
export async function processFloorPlan(imagePath, startX, startY, endX, endY) {
    try {
      const processedImagePath = await ImageProcessor.processImage(imagePath, startX, startY, endX, endY);
      return processedImagePath;
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
  }

export default function FloorPlanDirections({ imagePath, startX, startY, endX, endY }) {
  const [processedImagePath, setProcessedImagePath] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function processImage() {
      try {
        setLoading(true);
        const path = await processFloorPlan(imagePath, startX, startY, endX, endY);
        setProcessedImagePath(`file://${path}`);
      } catch (err) {
        setError(err.message || "Image processing failed.");
      } finally {
        setLoading(false);
      }
    }
    processImage();
  }, [imagePath, startX, startY, endX, endY]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Processing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {processedImagePath ? (
        <Image source={{ uri: processedImagePath }} style={styles.image} />
      ) : (
        <Text>No image to display</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
  },
});
