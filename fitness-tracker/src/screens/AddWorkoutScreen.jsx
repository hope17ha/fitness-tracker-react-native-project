import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function AddWorkoutScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack?.()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>New Workout</Text>
          <Text style={styles.subtitle}>Create a workout session</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="e.g. Push Day / Leg Day"
          placeholderTextColor="#777"
          style={styles.input}
        />

        {/* Status (UI only) */}
        <Text style={styles.label}>Status</Text>
        <View style={styles.chipsRow}>
          <TouchableOpacity style={styles.chipActive}>
            <Text style={styles.chipTextActive}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Dates (UI only placeholders) */}
        <Text style={styles.label}>Timestamps</Text>

        <View style={styles.twoColRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Created</Text>
            <Text style={styles.smallValue}>Auto</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Updated</Text>
            <Text style={styles.smallValue}>Auto</Text>
          </View>
        </View>

        <View style={styles.twoColRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Started</Text>
            <Text style={styles.smallValue}>—</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Finished</Text>
            <Text style={styles.smallValue}>—</Text>
          </View>
        </View>

        {/* Exercises preview (UI only) */}
        <View style={styles.exercisesCard}>
          <View style={styles.exercisesTopRow}>
            <Text style={styles.exercisesTitle}>Exercises</Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>0</Text>
            </View>
          </View>

          <Text style={styles.exercisesHint}>
            Add exercises after creating the workout.
          </Text>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>+ Add exercise (later)</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Create workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack?.()}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
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

  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#aaa", marginTop: 4 },

  form: { paddingHorizontal: 24, paddingTop: 20 },

  label: { color: "#aaa", marginTop: 16, marginBottom: 8, fontSize: 13 },

  input: {
    backgroundColor: "#13263a",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
  },

  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  chipActive: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  chipTextActive: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  chip: {
    backgroundColor: "#13263a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1c2f44",
  },
  chipText: { color: "#aaa", fontWeight: "600", fontSize: 12 },

  twoColRow: { flexDirection: "row", gap: 12, marginTop: 12 },

  smallCard: {
    flex: 1,
    backgroundColor: "#13263a",
    borderRadius: 14,
    padding: 14,
  },
  smallLabel: { color: "#777", fontSize: 12 },
  smallValue: { color: "#fff", fontWeight: "bold", marginTop: 6, fontSize: 14 },

  exercisesCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#102235",
  },
  exercisesTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  exercisesTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  countPill: {
    backgroundColor: "#1c2f44",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  countText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  exercisesHint: { color: "#aaa", marginTop: 8, lineHeight: 18 },

  primaryBtn: {
    marginTop: 18,
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  secondaryBtn: {
    marginTop: 12,
    backgroundColor: "#1c2f44",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#fff", fontWeight: "bold" },

  cancelBtn: {
    marginTop: 12,
    backgroundColor: "#13263a",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1c2f44",
  },
  cancelBtnText: { color: "#aaa", fontWeight: "bold", fontSize: 15 },
});