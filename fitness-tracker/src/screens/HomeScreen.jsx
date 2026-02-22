import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../contexts/auth/useAuth";
import CatalogScreen from "./CatalogScreen";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello, {user?.username || user?.email}!</Text>
        <Text style={styles.subtitle}>Ready to train today?</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.heroCard}>
      </TouchableOpacity>

         {/* Start Workout */}
         <TouchableOpacity style={styles.startCard}>
        <Text style={styles.startTitle}>Start Workout</Text>
        <Text style={styles.startSub}>Begin your session</Text>
      </TouchableOpacity>

      {/* Quick actions */}
      <Text style={styles.sectionTitle}>Quick actions</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.smallCard} onPress={() => {
           navigation.navigate('Catalog')
        }}>
          <Text style={styles.emoji}>📚</Text>
          <Text style={styles.cardTitle}>Catalog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard}>
          <Text style={styles.emoji}>💪</Text>
          <Text style={styles.cardTitle}>My Workouts</Text>
        </TouchableOpacity>cdf
      </View>

      <TouchableOpacity style={styles.createCard}>
        <Text style={styles.emoji}>➕</Text>
        <Text style={styles.cardTitle}>Create Workout</Text>
      </TouchableOpacity>

      {/* Last workout */}
      <Text style={styles.sectionTitle}>Last workout</Text>

      <View style={styles.lastWorkout}>
        <Text style={styles.lastName}>Leg day</Text>
        <Text style={styles.lastMeta}>Yesterday • 50 min</Text>
      </View>

      {/* Motivation */}
      <View style={styles.motivation}>
        <Text style={styles.motivationText}>
          Consistency beats motivation.
        </Text>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1c2d" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "#1c2f44",
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },
  logoutButton: {
    position: "absolute",
    right: 24,
    top: 60,
    backgroundColor: "#e53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  startCard: {
    backgroundColor: "#4caf50",
    borderRadius: 20,
    padding: 30,
    marginTop: 30,
  },

  startTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  startSub: {
    color: "#eaffea",
    marginTop: 6,
  },

  sectionTitle: {
    color: "#aaa",
    marginTop: 30,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallCard: {
    backgroundColor: "#1c2f44",
    width: "48%",
    padding: 20,
    borderRadius: 16,
  },

  createCard: {
    backgroundColor: "#1c2f44",
    padding: 20,
    borderRadius: 16,
    marginTop: 14,
  },

  emoji: {
    fontSize: 28,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
  },

  lastWorkout: {
    backgroundColor: "#13263a",
    padding: 16,
    borderRadius: 14,
    padding: 40
  },

  lastName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  lastMeta: {
    color: "#777",
    marginTop: 4,
  },

  motivation: {
    marginTop: 30,
    padding: 30,
    borderRadius: 14,
    backgroundColor: "#102235",
  },

  motivationText: {
    color: "#aaa",
    textAlign: "center",
  },
});