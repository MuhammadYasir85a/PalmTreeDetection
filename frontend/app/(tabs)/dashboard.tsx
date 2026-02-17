import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#0F3443", "#34E89E"]} style={styles.background} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Dashboard</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.smallCard}>
            <Ionicons name="leaf" size={24} color="#34E89E" />
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Total Palms</Text>
          </View>
          <View style={styles.smallCard}>
            <Ionicons name="analytics" size={24} color="#34E89E" />
            <Text style={styles.statNumber}>94%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Analytics Card */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="bar-chart" size={20} color="#fff" />
            <Text style={styles.cardTitle}>Detection Insights</Text>
          </View>
          
          <View style={styles.placeholderGraph}>
             {/* Mock Graph Bars */}
             <View style={[styles.bar, {height: 40}]} />
             <View style={[styles.bar, {height: 80}]} />
             <View style={[styles.bar, {height: 60}]} />
             <View style={[styles.bar, {height: 100}]} />
             <View style={[styles.bar, {height: 70}]} />
          </View>
          
          <Text style={styles.infoText}>
            Historical trends and detailed AI analytics will appear here as you process more data.
          </Text>
        </View>

        {/* Recent Activity Section */}
        <View style={[styles.glassCard, { marginTop: 20 }]}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="image" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.activityText}>Image Analysis completed</Text>
              <Text style={styles.activityDate}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="videocam" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.activityText}>Video processing finished</Text>
              <Text style={styles.activityDate}>Yesterday</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  background: { 
    position: "absolute", 
    left: 0, 
    right: 0, 
    top: 0, 
    height: "100%" 
  },
  scrollContainer: { 
    padding: 20, 
    paddingTop: 60 
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 25,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  smallCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 10,
  },
  placeholderGraph: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    padding: 10
  },
  bar: {
    width: 20,
    backgroundColor: '#34E89E',
    borderRadius: 5,
    opacity: 0.8
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  activityText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  activityDate: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    marginTop: 2,
  },
});
