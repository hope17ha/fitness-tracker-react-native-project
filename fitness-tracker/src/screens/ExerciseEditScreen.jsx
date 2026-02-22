import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/auth/useAuth";
import { exercisesService } from "../services";

export default function ExerciseEditScreen({ navigation, route }) {
  const { user } = useAuth();
  const exerciseId = route?.params?.exerciseId;

  const MUSCLE_GROUPS = useMemo(
    () => [
      { id: "chest", label: "Chest" },
      { id: "back", label: "Back" },
      { id: "legs", label: "Legs" },
      { id: "shoulders", label: "Shoulders" },
      { id: "arms", label: "Arms" },
      { id: "core", label: "Core" },
    ],
    []
  );

  const EQUIPMENT = useMemo(
    () => ["barbell", "dumbbell", "machine", "cable", "bodyweight"],
    []
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [exercise, setExercise] = useState(null);

  // form state
  const [name, setName] = useState("");
  const [muscleGroupId, setMuscleGroupId] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const canEdit = useMemo(() => {
    if (!exercise) return false;
    return exercise.createdByUserId === user?.id; // само собствени упражнения
  }, [exercise, user?.id]);

  useEffect(() => {
    if (!exerciseId) {
      Alert.alert("Missing exercise id", "No exerciseId was provided.");
      navigation.goBack();
      return;
    }

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await exercisesService.getExerciseById(exerciseId);

        if (!mounted) return;

        setExercise(data);
        setName(data.name || "");
        setMuscleGroupId(data.muscleGroupId || null);
        setEquipment(data.equipment || null);
        setImageUrl(data.imageUrl || "");
      } catch (e) {
        console.log(e);
        Alert.alert("Error", "Could not load exercise.");
        navigation.goBack();
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [exerciseId, navigation]);

  const handleSave = async () => {
    if (!canEdit) return Alert.alert("Not allowed", "You can edit only your exercises.");

    if (!name.trim()) return Alert.alert("Missing name", "Please enter exercise name.");
    if (!muscleGroupId) return Alert.alert("Missing group", "Please select muscle group.");
    if (!equipment) return Alert.alert("Missing equipment", "Please select equipment.");

    try {
      setSaving(true);

      const updated = await exercisesService.updateExercise(exerciseId, {
        name: name.trim(),
        muscleGroupId,
        equipment,
        imageUrl: imageUrl.trim() || null,
      });

      Alert.alert("Saved", "Exercise updated.");
      navigation.goBack();
      
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!canEdit) return Alert.alert("Not allowed", "You can delete only your exercises.");

    Alert.alert(
      "Delete exercise?",
      "This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);
              await exercisesService.deleteExercise(exerciseId);
              Alert.alert("Deleted", "Exercise deleted.");
              navigation.pop(2);
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Could not delete exercise.");
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={{ color: "#777", marginTop: 10 }}>Loading exercise...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Edit Exercise</Text>
          <Text style={styles.subtitle}>
            {canEdit ? "Update your exercise" : "Read-only (not yours)"}
          </Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Exercise name..."
          placeholderTextColor="#777"
          style={[styles.input, !canEdit && styles.inputDisabled]}
          value={name}
          onChangeText={setName}
          editable={canEdit}
        />

        {/* Muscle group */}
        <Text style={styles.label}>Muscle group</Text>
        <View style={{ gap: 10 }}>
          {MUSCLE_GROUPS.map((group) => {
            const selected = muscleGroupId === group.id;
            return (
              <TouchableOpacity
                key={group.id}
                onPress={() => canEdit && setMuscleGroupId(group.id)}
                activeOpacity={canEdit ? 0.7 : 1}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: selected ? "#4caf50" : "#13263a",
                  opacity: canEdit ? 1 : 0.6,
                }}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : "#aaa",
                    fontWeight: "bold",
                  }}
                >
                  {group.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Equipment */}
        <Text style={styles.label}>Equipment</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, opacity: canEdit ? 1 : 0.6 }}>
          {EQUIPMENT.map((item) => {
            const selected = equipment === item;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => canEdit && setEquipment(item)}
                activeOpacity={canEdit ? 0.7 : 1}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  backgroundColor: selected ? "#4caf50" : "#13263a",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Image URL */}
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          placeholder="https://..."
          placeholderTextColor="#777"
          style={[styles.input, !canEdit && styles.inputDisabled]}
          value={imageUrl}
          onChangeText={setImageUrl}
          editable={canEdit}
        />
        <Text style={styles.helper}>Optional.</Text>

        {/* Actions */}
        <TouchableOpacity
          style={[styles.primaryBtn, (!canEdit || saving) && styles.btnDisabled]}
          onPress={handleSave}
          disabled={!canEdit || saving || deleting}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryBtnText}>Save changes</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dangerBtn, (!canEdit || deleting) && styles.btnDisabled]}
          onPress={handleDelete}
          disabled={!canEdit || deleting || saving}
        >
          {deleting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.dangerBtnText}>Delete exercise</Text>
          )}
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

  inputDisabled: {
    opacity: 0.6,
  },

  helper: { color: "#777", marginTop: 8, fontSize: 12, lineHeight: 16 },

  primaryBtn: {
    marginTop: 22,
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  secondaryBtn: {
    marginTop: 12,
    backgroundColor: "#1c2f44",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  dangerBtn: {
    marginTop: 12,
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  dangerBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  btnDisabled: {
    opacity: 0.6,
  },
});
