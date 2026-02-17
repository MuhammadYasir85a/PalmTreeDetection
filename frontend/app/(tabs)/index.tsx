import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Deep Tropical Gradient Background */}
      <LinearGradient
        colors={["#0F3443", "#34E89E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      <View style={styles.content}>
        {/* Abstract Background Decoration */}
        <View style={styles.decorationCircle} />

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>🌴</Text>
          </View>
          
          <Text style={styles.title}>Palm Finder</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.subtitle}>
            Upload an image or video to detect and count palm trees automatically.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  decorationCircle: {
    position: "absolute",
    top: "15%",
    right: "-10%",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 40,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  divider: {
    width: 50,
    height: 4,
    backgroundColor: "#34E89E",
    borderRadius: 2,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 28,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
});
