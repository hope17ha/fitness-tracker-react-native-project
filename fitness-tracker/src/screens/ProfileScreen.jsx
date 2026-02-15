import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/auth/useAuth";

export default function ProfileScreen() {

    const { user, logout } = useAuth();

    useEffect(() => {
        console.log(user);
    }, []);

    const logoutHandler = () => {
        logout();
    }

  return (



    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.username[0]}</Text>
        </View>

        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Info cards */}
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security</Text>

          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionText}>Change password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1c2d",
  },

  header: {
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#1c2f44",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  email: {
    color: "#aaa",
    marginTop: 4,
  },

  section: {
    padding: 20,
  },

  card: {
    backgroundColor: "#1c2f44",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#aaa",
  },

  value: {
    color: "#fff",
  },

  actionRow: {
    paddingVertical: 10,
  },

  actionText: {
    color: "#4caf50",
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
