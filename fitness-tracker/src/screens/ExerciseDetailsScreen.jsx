import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function ExerciseDetailsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            Barbell Bench Press
          </Text>
          <Text style={styles.subtitle}>Chest • Barbell</Text>
        </View>
      </View>

      {/* Image */}
      <View style={styles.imageCard}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.imageHint}>Exercise image placeholder</Text>
      </View>

      {/* Quick info */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Muscle group</Text>
          <Text style={styles.infoValue}>Chest</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Equipment</Text>
          <Text style={styles.infoValue}>Barbell</Text>
        </View>
      </View>

      {/* Primary action */}
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Add to workout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
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

  backBtn: {
    position: "absolute",
    left: 24,
    top: 60,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#13263a",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -2,
  },

  headerText: {
    paddingLeft: 52,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },

  imageCard: {
    marginTop: 18,
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#102235",
    alignItems: "center",
  },

  imagePlaceholder: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    backgroundColor: "#1c2f44",
  },

  imageHint: {
    color: "#777",
    fontSize: 12,
    marginTop: 10,
  },

  infoRow: {
    marginTop: 18,
    marginHorizontal: 24,
    flexDirection: "row",
    gap: 12,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#13263a",
    padding: 16,
    borderRadius: 14,
  },

  infoLabel: {
    color: "#777",
    fontSize: 12,
  },

  infoValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
  },

  primaryBtn: {
    marginTop: 22,
    marginHorizontal: 24,
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
