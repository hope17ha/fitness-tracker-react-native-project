import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

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

import { catalogService } from "../services";
import { useAuth } from "../contexts/auth/useAuth";

export default function ExerciseListScreen({ navigation, route }) {
    const { muscleGroupId, title } = route.params || {};
    
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    async function load() {
        setLoading(true);
        try {
            const data = await catalogService.getExercisesByMuscleGroup(
                muscleGroupId
            );
            setExercises(data);
        } catch (error) {
            Alert.alert("Error fetching exercises. Try again!");
        } finally {
            setLoading(false);
        }
        };
    
        useFocusEffect(
            useCallback(() => {
              load();
            }, [muscleGroupId])
          );
          
        
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>Pick an exercise</Text>
                </View>
            </View>

            {/* Search */}
            <View style={styles.searchWrapper}>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#777"
                    style={styles.searchInput}
                />
            </View>

            {/* Filters row (UI only) */}
            <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterChipActive}>
                    <Text style={styles.filterChipTextActive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterChipText}>Barbell</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterChipText}>Dumbbell</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterChipText}>Machine</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterChipText}>Cable</Text>
                </TouchableOpacity>
            </View>
            {loading && (
  <View style={styles.loaderBox}>
    <ActivityIndicator size="large" color="#4caf50" />
    <Text style={styles.loaderText}>Loading exercises...</Text>
  </View>
)}

            {/* List */}
            <Text style={styles.sectionTitle}>Results</Text>
            {!loading &&
                exercises.map((exercise) => (
                    <TouchableOpacity
                        style={styles.exerciseCard}
                        key={exercise.id}
                        onPress={() => navigation.navigate('ExerciseDetailsScreen',
                    {
                        name: exercise.name,
                        equipment: exercise.equipment,
                        muscleGroupId: exercise.muscleGroupId,
                        image: exercise.imageUrl,
                        userId: user.id,
                    })}
                    >
                        <View style={styles.exerciseLeft}>
                            <View style={styles.thumb} />
                            <View>
                                <Text style={styles.exerciseName}>
                                    {exercise.name}
                                </Text>
                                <Text style={styles.exerciseMeta}>
                                    {exercise.muscleGroupId} •{" "}
                                    {exercise.equipment}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.exerciseRight}>
                            <Text style={styles.chev}>›</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>Can’t find it?</Text>
                <Text style={styles.emptyText}>
                    Add your own exercise later (UI placeholder).
                </Text>
                <TouchableOpacity
                    style={styles.emptyBtn}
                    onPress={() => navigation.navigate("AddExerciseScreen")}
                >
                    <Text style={styles.emptyBtnText}>+ Create exercise</Text>
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
    headerText: {
        paddingLeft: 52, // 40 (бутон) + ~12 spacing
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

    title: { fontSize: 28, fontWeight: "bold", color: "#fff" },

    subtitle: { color: "#aaa", marginTop: 4 },

    searchWrapper: { paddingHorizontal: 24, marginTop: 20 },

    searchInput: {
        backgroundColor: "#13263a",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: "#fff",
    },

    filterRow: {
        paddingHorizontal: 24,
        marginTop: 14,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    filterChipActive: {
        backgroundColor: "#4caf50",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
    },

    filterChipTextActive: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },

    filterChip: {
        backgroundColor: "#13263a",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#1c2f44",
    },

    filterChipText: {
        color: "#aaa",
        fontWeight: "600",
        fontSize: 12,
    },

    sectionTitle: {
        color: "#aaa",
        marginTop: 26,
        marginBottom: 12,
        paddingHorizontal: 24,
    },

    exerciseCard: {
        backgroundColor: "#13263a",
        marginHorizontal: 24,
        marginBottom: 12,
        padding: 14,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    exerciseLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    thumb: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#1c2f44",
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

    exerciseRight: {
        width: 28,
        alignItems: "flex-end",
    },

    chev: {
        color: "#777",
        fontSize: 22,
        fontWeight: "bold",
    },

    emptyBox: {
        marginTop: 18,
        marginHorizontal: 24,
        padding: 18,
        borderRadius: 14,
        backgroundColor: "#102235",
    },

    emptyTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },

    emptyText: { color: "#aaa", marginTop: 6, lineHeight: 18 },

    emptyBtn: {
        marginTop: 12,
        backgroundColor: "#1c2f44",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    emptyBtnText: { color: "#fff", fontWeight: "bold" },
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
