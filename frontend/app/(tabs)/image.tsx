import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { File, Paths } from "expo-file-system"; // Modern 2025 API
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { detectImage } from "../../services/api";

const { width } = Dimensions.get("window");

export default function ImageScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setSelectedImage(result.assets[0].uri);
      setProcessedImage(null);
      setCount(null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setSelectedImage(result.assets[0].uri);
      setProcessedImage(null);
      setCount(null);
    }
  };

  const startDetection = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const res = await detectImage(selectedImage);
      setProcessedImage(res.output_url);
      setCount(res.count);
    } catch (err) {
      Alert.alert("Error", "Could not connect to AI server.");
    } finally {
      setLoading(false);
    }
  };

  const saveToGallery = async () => {
    if (!processedImage) return;
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Gallery access is needed.");
        return;
      }

      // Modern 2025 SDK 54 Download Logic
      const filename = `palm_${Date.now()}.jpg`;
      const destinationFile = new File(Paths.cache, filename); // Uses Paths.cache
      
      // Static method for downloading in modern Expo
      await File.downloadFileAsync(processedImage, destinationFile);

      await MediaLibrary.saveToLibraryAsync(destinationFile.uri);
      Alert.alert("Success 🌴", "Processed image saved to gallery!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save image.");
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setCount(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#0F3443", "#34E89E"]} style={styles.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.glassCard}>
          <Text style={styles.header}>Palm Finder</Text>

          {!selectedImage && (
            <View style={styles.fullWidth}>
              <View style={styles.selectionRow}>
                <TouchableOpacity style={styles.actionBox} onPress={takePhoto}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="camera-outline" size={32} color="#34E89E" />
                  </View>
                  <Text style={styles.actionText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBox} onPress={pickImage}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="images-outline" size={32} color="#34E89E" />
                  </View>
                  <Text style={styles.actionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {selectedImage && !processedImage && !loading && (
            <View style={styles.fullWidth}>
              <View style={styles.readyCard}>
                <Ionicons name="checkmark-circle" size={50} color="#34E89E" />
                <Text style={styles.readyText}>Image Ready</Text>
              </View>
              <TouchableOpacity style={styles.mainButton} onPress={startDetection}>
                <LinearGradient colors={["#34E89E", "#0F3443"]} style={styles.gradient}>
                  <Text style={styles.buttonText}>Scan for Palms</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={reset} style={styles.backBtn}>
                <Text style={styles.backText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loaderText}>AI Analyzing Density...</Text>
            </View>
          )}

          {processedImage && !loading && (
            <View style={styles.fullWidth}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: processedImage }} style={styles.resultImage} />
                <View style={styles.floatingBadge}>
                  <Text style={styles.badgeText}>🌴 {count} Palms Found</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.mainButton} onPress={saveToGallery}>
                <LinearGradient colors={["#34E89E", "#0F3443"]} style={styles.gradient}>
                  <Ionicons name="download-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Save to Gallery</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={reset} style={styles.backBtn}>
                <Text style={styles.backText}>Pick New Image</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: "absolute", width: "100%", height: "100%" },
  scrollContainer: { padding: 20, paddingVertical: 60, justifyContent: "center", flexGrow: 1 },
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 35,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  header: { fontSize: 28, fontWeight: "900", color: "#fff", marginBottom: 30 },
  selectionRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 15 },
  actionBox: { width: "47%", paddingVertical: 30, borderRadius: 25, backgroundColor: "rgba(0,0,0,0.15)", alignItems: "center" },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.1)", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  actionText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  fullWidth: { width: "100%", alignItems: "center" },
  readyCard: { alignItems: "center", marginBottom: 30 },
  readyText: { color: "#fff", fontSize: 18, marginTop: 15, fontWeight: "600" },
  mainButton: { width: "100%", height: 60, borderRadius: 18 },
  gradient: { flex: 1, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backBtn: { marginTop: 20, padding: 10 },
  backText: { color: "rgba(255,255,255,0.7)", fontSize: 16 },
  loaderContainer: { padding: 40, alignItems: "center" },
  loaderText: { color: "#fff", marginTop: 15, fontSize: 16 },
  imageContainer: { width: "100%", height: width * 0.8, borderRadius: 20, overflow: "hidden", marginBottom: 25, backgroundColor: "rgba(0,0,0,0.2)" },
  resultImage: { width: "100%", height: "100%", resizeMode: "cover" },
  floatingBadge: { position: "absolute", bottom: 15, right: 15, backgroundColor: "rgba(0,0,0,0.7)", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  badgeText: { color: "#34E89E", fontWeight: "bold", fontSize: 14 },
});
