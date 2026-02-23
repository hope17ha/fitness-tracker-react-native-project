import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import { useAuth } from "../contexts/auth/useAuth";
import { workoutService } from "../services";

export default function AddWorkoutScreen({ navigation }) {
    const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const canSubmit = useMemo(() => !!user?.id && !saving, [user?.id, saving]);

  const handleStart = async () => {
    if (!user?.id) return Alert.alert("Error", "Missing user.");

if (!title.trim()) return Alert.alert("Missing title", "Enter a title.");

    try {
      setSaving(true);

      const active = await workoutService.getActiveWorkoutByUserId(user.id);

      if (active) {
        setSaving(false);

        Alert.alert(
          "You have an active workout",
          `"${active.title}" is still active. What do you want to do?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Resume",
              onPress: () => {
                navigation.getParent()?.navigate("My Workouts", {
                    screen: "WorkoutDetailsScreen",
                    params: { workoutId: created.id },
                  });
              },
            },
            {
              text: "Start new",
              style: "destructive",
              onPress: async () => {
                try {
                  setSaving(true);

                
                  await workoutService.finishWorkout(active.id);

                  const created = await workoutService.createWorkout({
                    userId: user.id,
                    title,
                  });

                  navigation.getParent()?.navigate("My Workouts", {
                    screen: "WorkoutDetailsScreen",
                    params: { workoutId: created.id },
                  });
                } catch (e) {
                  console.log(e);
                  Alert.alert("Error", "Could not start new workout.");
                } finally {
                  setSaving(false);
                }
              },
            },
          ]
        );

        return;
      }


      const created = await workoutService.createWorkout({
        userId: user.id,
        title,
      });

      navigation.getParent()?.navigate("My Workouts", {
        screen: "WorkoutDetailsScreen",
        params: { workoutId: created.id },
      });
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not create workout.");
      setSaving(false);
    }
  };

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
          value={title}
          onChangeText={setTitle}
        />

<TouchableOpacity
          style={[styles.primaryBtn, !canSubmit && styles.btnDisabled]}
          onPress={handleStart}
          disabled={!canSubmit}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryBtnText}>Start workout</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          disabled={saving}
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

  primaryBtn: {
    marginTop: 18,
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

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

  btnDisabled: { opacity: 0.6 },
});