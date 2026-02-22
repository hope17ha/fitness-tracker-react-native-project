import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function WorkoutDetailsScreen({ navigation, route }) {
  const workoutId = route?.params?.workoutId || 1;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            Leg day
          </Text>
          <Text style={styles.subtitle}>Completed • workoutId: {workoutId}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Created</Text>
          <Text style={styles.summaryValue}>2026-02-15</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Status</Text>
          <Text style={styles.summaryValue}>done</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Started</Text>
          <Text style={styles.summaryValue}>2026-02-15</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Finished</Text>
          <Text style={styles.summaryValue}>2026-02-15</Text>
        </View>
      </View>

      {/* Actions (UI only) */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Workout done</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>+ Add exercise</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Exercises</Text>

      {/* Exercise 1 (wex1) */}
      <View style={styles.exerciseBlock}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseTitle} numberOfLines={1}>
            1. Exercise #21
          </Text>
          <Text style={styles.exerciseMeta}>barbell • 3 sets</Text>
        </View>

        <View style={styles.setsCard}>
          <View style={styles.setRow}>
            <Text style={styles.setLeft}>Set 1</Text>
            <Text style={styles.setRight}>8 reps • 80 kg</Text>
          </View>
          <View style={styles.setRow}>
            <Text style={styles.setLeft}>Set 2</Text>
            <Text style={styles.setRight}>8 reps • 80 kg</Text>
          </View>
          <View style={[styles.setRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.setLeft}>Set 3</Text>
            <Text style={styles.setRight}>6 reps • 85 kg</Text>
          </View>
        </View>
      </View>

      {/* Exercise 2 (wex2) */}
      <View style={styles.exerciseBlock}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseTitle} numberOfLines={1}>
            2. Exercise #27
          </Text>
          <Text style={styles.exerciseMeta}>machine • 2 sets</Text>
        </View>

        <View style={styles.setsCard}>
          <View style={styles.setRow}>
            <Text style={styles.setLeft}>Set 1</Text>
            <Text style={styles.setRight}>12 reps • 40 kg</Text>
          </View>
          <View style={[styles.setRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.setLeft}>Set 2</Text>
            <Text style={styles.setRight}>12 reps • 40 kg</Text>
          </View>
        </View>
      </View>

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
  backText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: -2 },
  headerText: { paddingLeft: 52 },

  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#aaa", marginTop: 4 },

  summaryRow: { marginTop: 18, marginHorizontal: 24, flexDirection: "row", gap: 12 },
  summaryCard: { flex: 1, backgroundColor: "#13263a", borderRadius: 14, padding: 16 },
  summaryLabel: { color: "#777", fontSize: 12 },
  summaryValue: { color: "#fff", fontWeight: "bold", marginTop: 6, fontSize: 16 },

  actionsRow: { marginTop: 16, marginHorizontal: 24, gap: 12 },
  primaryBtn: { backgroundColor: "#4caf50", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  primaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  secondaryBtn: { backgroundColor: "#1c2f44", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  secondaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  sectionTitle: { color: "#aaa", marginTop: 22, marginBottom: 12, paddingHorizontal: 24 },

  exerciseBlock: { marginHorizontal: 24, marginBottom: 14, backgroundColor: "#102235", borderRadius: 16, padding: 14 },
  exerciseHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: 10 },
  exerciseTitle: { color: "#fff", fontWeight: "bold", fontSize: 16, flex: 1 },
  exerciseMeta: { color: "#777", fontSize: 12 },

  setsCard: { marginTop: 12, backgroundColor: "#13263a", borderRadius: 14, padding: 12 },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1c2f44",
  },
  setLeft: { color: "#aaa", fontWeight: "600" },
  setRight: { color: "#fff", fontWeight: "bold" },
});