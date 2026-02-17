import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Alert,
  Image
} from "react-native";
import { Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to open the Camera
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow camera access to use this feature.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Camera Image URI:", result.assets[0].uri);
    }
  };

  // Function to open the Gallery
  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow gallery access to select photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Gallery Image URI:", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Display captured image or default icon */}
        <View style={styles.imagePreviewContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          ) : (
            <Text style={styles.iconEmoji}>🌴</Text>
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Palm Finder</Text>
          <Text style={styles.descriptionText}>
            Capture or select a photo of a palm tree to begin identification.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={openCamera}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={openGallery}
        >
          <Text style={styles.secondaryButtonText}>View Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  imagePreviewContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    overflow: 'hidden',
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  iconEmoji: {
    fontSize: 60,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#064E3B",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#065F46",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.8,
  },
  primaryButton: {
    backgroundColor: "#059669",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: "#059669",
    fontSize: 16,
    fontWeight: "600",
  },
});
