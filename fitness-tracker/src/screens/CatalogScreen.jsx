import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { exercisesService } from "../services";

export default function CatalogScreen({ navigation, route }) {
    const selectForWorkoutId = route?.params?.selectForWorkoutId;
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    //TODO: pagination
    const load = useCallback(async () => {

        try {
            const data = await exercisesService.getAllExercises();
            setExercises(data);
        } catch (error) {
            Alert.alert("Couldn't load exercises. Try again!");
        } finally {
            setLoading(false);
        }
    }, [])
    
    useFocusEffect(
        useCallback(() => {
          load();
        }, [load])
      );

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Exercise Catalog</Text>
                <Text style={styles.subtitle}>
                    Browse exercises by muscle group
                </Text>
            </View>

            {/* Muscle groups */}
            <Text style={styles.sectionTitle}>Muscle groups</Text>

            <View style={styles.grid}>
                <TouchableOpacity
                    style={styles.groupCard}
                    onPress={() =>
                        navigation.navigate("ExerciseListScreen", {
                            muscleGroupId: "chest",
                            title: "Chest",
                        })
                    }
                >
                    <Text style={styles.groupEmoji}>🏋️</Text>
                    <Text style={styles.groupTitle}>Chest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.groupCard}
                    onPress={() =>
                        navigation.navigate("ExerciseListScreen", {
                            muscleGroupId: "back",
                            title: "Back",
                            selectForWorkoutId,
                        })
                    }
                >
                    <Text style={styles.groupEmoji}>🦍</Text>
                    <Text style={styles.groupTitle}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.groupCard}
                    onPress={() =>
                        navigation.navigate("ExerciseListScreen", {
                            muscleGroupId: "legs",
                            title: "Legs",
                            selectForWorkoutId,
                        })
                    }
                >
                    <Text style={styles.groupEmoji}>🦵</Text>
                    <Text style={styles.groupTitle}>Legs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.groupCard}
                    onPress={() =>
                        navigation.navigate("ExerciseListScreen", {
                            muscleGroupId: "shoulders",
                            title: "Shoulders",
                            selectForWorkoutId,
                        })
                    }
                >
                    <Text style={styles.groupEmoji}>🏹</Text>
                    <Text style={styles.groupTitle}>Shoulders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.groupCard}
                    onPress={() =>
                        navigation.navigate("ExerciseListScreen", {
                            muscleGroupId: "arms",
                            title: "Arms",
                            selectForWorkoutId,
                        })
                    }
                >
                    <Text style={styles.groupEmoji}>💪</Text>
                    <Text style={styles.groupTitle}>Arms</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.groupCard}
                    onPress={() =>
                        navigation.navigate("ExerciseListScreen", {
                            muscleGroupId: "core",
                            title: "Core",
                            selectForWorkoutId,
                        })
                    }
                >
                    <Text style={styles.groupEmoji}>🔥</Text>
                    <Text style={styles.groupTitle}>Core</Text>
                </TouchableOpacity>
            </View>

            {/* All exercises (static preview UI) */}
            <Text style={styles.sectionTitle}>All exercises</Text>
            
            {loading && (
                <View style={styles.loaderBox}>
                    <ActivityIndicator size="large" color="#4caf50" />
                    <Text style={styles.loaderText}>Loading exercises...</Text>
                </View>
            )}

            {!loading &&
                exercises?.map((exercise) => (
                    <TouchableOpacity
                        style={styles.exerciseCard}
                        key={exercise.id}
                        onPress={() =>
                            navigation.navigate("ExerciseDetailsScreen", {
                              exerciseId: exercise.id,
                              selectForWorkoutId, 
                            })
                          }
                    >
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseMeta}>
                            {exercise.muscleGroupId} • {exercise.equipment}
                        </Text>
                    </TouchableOpacity>
                ))}

    

            {/* Bottom spacing */}
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0b1c2d",
    },

    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        backgroundColor: "#1c2f44",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },

    subtitle: {
        color: "#aaa",
        marginTop: 4,
    },

    searchWrapper: {
        paddingHorizontal: 24,
        marginTop: 20,
    },

    searchInput: {
        backgroundColor: "#13263a",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: "#fff",
    },

    sectionTitle: {
        color: "#aaa",
        marginTop: 30,
        marginBottom: 12,
        paddingHorizontal: 24,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },

    groupCard: {
        backgroundColor: "#1c2f44",
        width: "48%",
        padding: 20,
        borderRadius: 16,
        marginBottom: 14,
        alignItems: "center",
    },

    groupEmoji: {
        fontSize: 28,
        marginBottom: 10,
    },

    groupTitle: {
        color: "#fff",
        fontWeight: "bold",
    },

    exerciseCard: {
        backgroundColor: "#13263a",
        marginHorizontal: 24,
        marginBottom: 12,
        padding: 16,
        borderRadius: 14,
    },

    exerciseName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    exerciseMeta: {
        color: "#777",
        marginTop: 4,
        fontSize: 13,
    },
    loaderBox: {
        marginTop: 18,
        marginHorizontal: 24,
        paddingVertical: 22,
        borderRadius: 14,
        backgroundColor: "#102235",
        alignItems: "center",
        justifyContent: "center",
      },
      
      loaderText: {
        marginTop: 10,
        color: "#777",
        fontSize: 12,
      },
});
