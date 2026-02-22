import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/auth/useAuth";
import { catalogService } from "../services";

export default function ExerciseDetailsScreen({ navigation, route }) {
  const { user } = useAuth();


  const exerciseId = route?.params?.exerciseId;


  const [exercise, setExercise] = useState(route?.params || null);
  const [loading, setLoading] = useState(false);

  function capitalize(value) {
    if (!value) return "-";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const fetchExercise = useCallback(async () => {
    if (!exerciseId) return;

    setLoading(true);
    try {
      const data = await catalogService.getExerciseById(exerciseId);
      setExercise(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [exerciseId]);


  useEffect(() => {
    const updated = route?.params?.updatedExercise;
    if (updated) {
      setExercise(updated);
      // чистим param-а, за да не се apply-ва пак
      navigation.setParams({ updatedExercise: undefined });
    }
  }, [route?.params?.updatedExercise, navigation]);


  useFocusEffect(
    useCallback(() => {
      fetchExercise();
    }, [fetchExercise])
  );

  const name = exercise?.name;
  const equipment = exercise?.equipment;
  const muscleGroupId = exercise?.muscleGroupId;
  const imageUrl = exercise?.imageUrl; // ползвай imageUrl, не image
  const createdByUserId = exercise?.createdByUserId;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {name || "Exercise"}
          </Text>
          <Text style={styles.subtitle}>
            {capitalize(muscleGroupId)} • {capitalize(equipment)}
          </Text>
        </View>
      </View>

      {/* Loader card (само докато refetch-ва) */}
      {loading && (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={styles.loaderText}>Refreshing...</Text>
        </View>
      )}

      {/* Image */}
      <View style={styles.imageCard}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.imagePlaceholder} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        <Text style={styles.imageHint}>{imageUrl || "Exercise image placeholder"}</Text>
      </View>

      {/* Quick info */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Muscle group</Text>
          <Text style={styles.infoValue}>{capitalize(muscleGroupId)}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Equipment</Text>
          <Text style={styles.infoValue}>{capitalize(equipment)}</Text>
        </View>
      </View>

      {/* Primary action */}
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Add to workout</Text>
      </TouchableOpacity>

      {/* Edit button само ако е негово */}
      {createdByUserId === user?.id ? (
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate("ExerciseEditScreen", { exerciseId })}
        >
          <Text style={styles.secondaryBtnText}>Edit exercise</Text>
        </TouchableOpacity>
      ) : null}

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

  loaderBox: {
    marginTop: 18,
    marginHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: "#102235",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: { color: "#777", marginTop: 10, fontSize: 12 },

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

  imageHint: { color: "#777", fontSize: 12, marginTop: 10 },

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

  infoLabel: { color: "#777", fontSize: 12 },
  infoValue: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 6 },

  primaryBtn: {
    marginTop: 22,
    marginHorizontal: 24,
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  secondaryBtn: {
    marginTop: 12,
    marginHorizontal: 24,
    backgroundColor: "#1c2f44",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
