import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { workoutService, exercisesService } from "../services";
import {
    formatDate,
    formatTimeHHMM,
    minutesBetween,
} from "../helpers/mathFunctions";

export default function WorkoutDetailsScreen({ navigation, route }) {
    const workoutId = route?.params?.workoutId;

    const [loading, setLoading] = useState(true);
    const [workout, setWorkout] = useState(null);
    const [exerciseMap, setExerciseMap] = useState({}); // { [exerciseId]: exerciseObj }

    useEffect(() => {
        if (!workoutId) return;

        let mounted = true;

        async function load() {
            try {
                setLoading(true);

                const w = await workoutService.getWorkoutById(workoutId);
                if (!mounted) return;

                setWorkout(w);

                const ids = (w.exercises || []).map((x) => x.exerciseId);
                const uniqueIds = [...new Set(ids)];

                const results = await Promise.all(
                    uniqueIds.map(async (id) => {
                        try {
                            const ex = await exercisesService.getExerciseById(
                                id
                            );
                            return [id, ex];
                        } catch {
                            return [id, null];
                        }
                    })
                );

                if (!mounted) return;

                const map = {};
                for (const [id, ex] of results) map[id] = ex;
                setExerciseMap(map);
            } catch (e) {
                console.log(e);
                Alert.alert("Error", "Could not load workout.");
                navigation.goBack();
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [workoutId, navigation]);

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    { justifyContent: "center", alignItems: "center" },
                ]}
            >
                <ActivityIndicator size="large" color="#4caf50" />
                <Text style={{ color: "#777", marginTop: 10 }}>
                    Loading workout...
                </Text>
            </View>
        );
    }

    if (!workout) return null;

    const mins = minutesBetween(workout.startedAt, workout.finishedAt);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <View style={styles.headerText}>
                    <Text style={styles.title} numberOfLines={1}>
                        {workout.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {workout.status} • {formatTimeHHMM(workout.startedAt)} •{" "}
                        {mins ?? "—"} min
                    </Text>
                </View>
            </View>

            {/* Summary */}
            <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Created</Text>
                    <Text style={styles.summaryValue}>
                        {formatDate(workout.createdAt)}
                    </Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Status</Text>
                    <Text style={styles.summaryValue}>{workout.status}</Text>
                </View>
            </View>

            <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Started</Text>
                    <Text style={styles.summaryValue}>
                        {formatDate(workout.startedAt)}
                    </Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Finished</Text>
                    <Text style={styles.summaryValue}>
                        {formatDate(workout.finishedAt)}
                    </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Exercises</Text>

            {(workout.exercises || [])
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((wex, idx) => {
                    const ex = exerciseMap[wex.exerciseId];
                    const exName = ex?.name ?? `Exercise #${wex.exerciseId}`;
                    const equipment = ex?.equipment ?? "—";
                    const setsCount = wex.sets?.length ?? 0;

                    return (
                        <View
                            style={styles.exerciseBlock}
                            key={wex.id ?? `${wex.exerciseId}-${idx}`}
                        >
                            <View style={styles.exerciseHeader}>
                                <Text
                                    style={styles.exerciseTitle}
                                    numberOfLines={1}
                                >
                                    {idx + 1}. {exName}
                                </Text>
                                <Text style={styles.exerciseMeta}>
                                    {equipment} • {setsCount} sets
                                </Text>
                            </View>

                            <View style={styles.setsCard}>
                                {(wex.sets || []).map((s, i) => (
                                    <View
                                        key={`${wex.exerciseId}-set-${i}`}
                                        style={[
                                            styles.setRow,
                                            i === wex.sets.length - 1 && {
                                                borderBottomWidth: 0,
                                            },
                                        ]}
                                    >
                                        <Text style={styles.setLeft}>
                                            Set {s.set ?? i + 1}
                                        </Text>
                                        <Text style={styles.setRight}>
                                            {s.reps} reps • {s.weight} kg
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                })}

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
    headerText: { paddingLeft: 52 },

    title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
    subtitle: { color: "#aaa", marginTop: 4 },

    summaryRow: {
        marginTop: 18,
        marginHorizontal: 24,
        flexDirection: "row",
        gap: 12,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: "#13263a",
        borderRadius: 14,
        padding: 16,
    },
    summaryLabel: { color: "#777", fontSize: 12 },
    summaryValue: {
        color: "#fff",
        fontWeight: "bold",
        marginTop: 6,
        fontSize: 16,
    },

    sectionTitle: {
        color: "#aaa",
        marginTop: 22,
        marginBottom: 12,
        paddingHorizontal: 24,
    },

    exerciseBlock: {
        marginHorizontal: 24,
        marginBottom: 14,
        backgroundColor: "#102235",
        borderRadius: 16,
        padding: 14,
    },
    exerciseHeader: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 10,
    },
    exerciseTitle: { color: "#fff", fontWeight: "bold", fontSize: 16, flex: 1 },
    exerciseMeta: { color: "#777", fontSize: 12 },

    setsCard: {
        marginTop: 12,
        backgroundColor: "#13263a",
        borderRadius: 14,
        padding: 12,
    },
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
