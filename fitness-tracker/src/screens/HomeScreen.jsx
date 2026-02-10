import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../contexts/auth/useAuth";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
    navigation.replace("Login Screen");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {user?.username || user?.email}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
});