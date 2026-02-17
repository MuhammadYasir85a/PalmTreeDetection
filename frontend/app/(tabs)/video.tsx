import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { File, Paths } from "expo-file-system"; // Modern 2025 class-based API
import { detectVideo } from "../../services/api";

const { width } = Dimensions.get("window");

export default function VideoScreen() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setVideoUri(result.assets[0].uri);
      setProcessedVideoUrl(null);
      setCount(null);
    }
  };

  const takeVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets?.length) {
      setVideoUri(result.assets[0].uri);
      setProcessedVideoUrl(null);
      setCount(null);
    }
  };

  const startDetection = async () => {
    if (!videoUri) return;
    setLoading(true);
    try {
      const res = await detectVideo(videoUri);
      setProcessedVideoUrl(res.output_url || res.output_path);
      setCount(res.count);
    } catch (error) {
      Alert.alert("Analysis Error", "Failed to process video on the server.");
    } finally {
      setLoading(false);
    }
  };

  const saveToGallery = async () => {
    if (!processedVideoUrl) return;
    
    setSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Gallery access is needed to save videos.");
        setSaving(false);
        return;
      }

      // Modern 2025 SDK 54 logic
      const filename = `processed_palm_${Date.now()}.mp4`;
      const destinationFile = new File(Paths.cache, filename);
      
      // Static method for downloading in modern Expo
      await File.downloadFileAsync(processedVideoUrl, destinationFile);
      
      // Save downloaded file's uri to MediaLibrary
      await MediaLibrary.saveToLibraryAsync(destinationFile.uri);
      
      Alert.alert("Success 🌴", "Video saved to gallery!");
    } catch (err) {
      console.error(err);
      Alert.alert("Save Error", "Could not download or save the video.");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setVideoUri(null);
    setProcessedVideoUrl(null);
    setCount(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#0F3443", "#34E89E"]} style={styles.background} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.glassCard}>
          <Text style={styles.header}>Palm Finder</Text>

          {!videoUri && (
            <View style={styles.fullWidth}>
              <View style={styles.selectionRow}>
                <TouchableOpacity style={styles.actionBox} onPress={takeVideo}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="videocam-outline" size={32} color="#34E89E" />
                  </View>
                  <Text style={styles.actionText}>Record</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBox} onPress={pickVideo}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="film-outline" size={32} color="#34E89E" />
                  </View>
                  <Text style={styles.actionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {videoUri && !processedVideoUrl && !loading && (
            <View style={styles.fullWidth}>
              <View style={styles.readyCard}>
                <Ionicons name="checkmark-circle" size={50} color="#34E89E" />
                <Text style={styles.readyText}>Video Loaded</Text>
              </View>
              
              <TouchableOpacity style={styles.mainButton} onPress={startDetection}>
                <LinearGradient colors={["#34E89E", "#0F3443"]} style={styles.gradient}>
                  <Text style={styles.buttonText}>Start Analysis</Text>
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
              <Text style={styles.loaderText}>AI is analyzing frames...</Text>
            </View>
          )}

          {processedVideoUrl && !loading && (
            <View style={styles.fullWidth}>
               <View style={styles.resultBox}>
                  <Ionicons name="ribbon-outline" size={50} color="#fff" />
                  <View style={styles.floatingBadge}>
                    <Text style={styles.badgeText}>🌴 {count} Palms Detected</Text>
                  </View>
               </View>

              <TouchableOpacity style={styles.mainButton} onPress={saveToGallery} disabled={saving}>
                <LinearGradient colors={["#34E89E", "#0F3443"]} style={styles.gradient}>
                  {saving ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="download-outline" size={20} color="#fff" style={{marginRight: 8}} />
                      <Text style={styles.buttonText}>Save to Gallery</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={reset} style={styles.backBtn}>
                <Text style={styles.backText}>Analyze New Video</Text>
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
  scrollContainer: { padding: 20, paddingVertical: 60, justifyContent: 'center', flexGrow: 1 },
  glassCard: { 
    backgroundColor: "rgba(255, 255, 255, 0.15)", 
    borderRadius: 35, 
    padding: 25, 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "rgba(255, 255, 255, 0.25)" 
  },
  header: { fontSize: 28, fontWeight: "900", color: "#fff", marginBottom: 30 },
  selectionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
  actionBox: { 
    width: '47%', 
    paddingVertical: 30, 
    borderRadius: 25, 
    backgroundColor: "rgba(0,0,0,0.15)", 
    alignItems: "center" 
  },
  iconCircle: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: "rgba(255,255,255,0.1)", 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 10 
  },
  actionText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  fullWidth: { width: "100%", alignItems: "center" },
  readyCard: { alignItems: "center", marginBottom: 30 },
  readyText: { color: "#fff", fontSize: 18, marginTop: 15, fontWeight: "600" },
  mainButton: { width: "100%", height: 60, borderRadius: 18, marginTop: 10 },
  gradient: {
    flex: 1,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backBtn: { marginTop: 20, padding: 10 },
  backText: { color: "rgba(255,255,255,0.7)", fontSize: 16 },
  loaderContainer: { padding: 40, alignItems: "center" },
  loaderText: { color: "#fff", marginTop: 15, fontSize: 16 },
  resultBox: {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  floatingBadge: {
    position: "absolute",
    bottom: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeText: { color: "#34E89E", fontWeight: "bold", fontSize: 14 },
});
