import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { workoutService } from "../services";
import { useAuth } from "../contexts/auth/useAuth";
import {
    formatDate,
    formatTimeHHMM,
    minutesBetween,
} from "../helpers/mathFunctions";

export default function MyWorkoutsScreen({ navigation }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        if (!user?.id) return;
        let mounted = true;
        setLoading(true);
        async function load() {
            try {
                const data = await workoutService.getAllWorkoutsByUserId(
                    user.id
                );
                if (mounted) setWorkouts(data);
            } catch (error) {
                Alert.alert("Couldn't load workouts. Try again!");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [user?.id]);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>My Workouts</Text>
                <Text style={styles.subtitle}>Your sessions and history</Text>
            </View>

            {/* Filters (UI only) */}
            <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterChipActive}>
                    <Text style={styles.filterChipTextActive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterChipText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterChipText}>Done</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Workouts</Text>

            {workouts.map((workout) => {
                const mins = minutesBetween(
                    workout.startedAt,
                    workout.finishedAt
                );
                return (
                    <TouchableOpacity
                        style={styles.workoutCard}
                        onPress={() =>
                            navigation.navigate("WorkoutDetailsScreen", {
                                workoutId: workout.id,
                            })
                        }
                        key={workout.id}
                    >
                        <View style={styles.workoutTopRow}>
                            <Text style={styles.workoutTitle} numberOfLines={1}>
                                {workout.title}
                            </Text>
                            <View
                                style={[
                                    styles.statusPill,
                                    { backgroundColor: "#1c2f44" },
                                ]}
                            >
                                <Text style={styles.statusText}>
                                    {workout.status}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.workoutMeta}>
                            {formatTimeHHMM(workout.startedAt)}h •{" "}
                            {workout.exercises?.length} exercises •{" "}
                            {mins ?? "—"} min
                        </Text>
                        <View style={styles.workoutBottomRow}>
                            <View style={styles.miniStat}>
                                <Text style={styles.miniLabel}>Started</Text>
                                <Text style={styles.miniValue}>
                                    {formatDate(workout.startedAt)}
                                </Text>
                            </View>
                            <View style={styles.miniStat}>
                                <Text style={styles.miniLabel}>Finished</Text>
                                <Text style={styles.miniValue}>
                                    {formatDate(workout.finishedAt)}
                                </Text>
                            </View>
                            <Text style={styles.chev}>›</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}

            {/* CTA box */}
            <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>New workout</Text>
                <Text style={styles.emptyText}>
                    Create a new workout and add exercises.
                </Text>
                <TouchableOpacity
                    style={styles.emptyBtn}
                    onPress={() => navigation.navigate("AddWorkoutScreen")}
                >
                    <Text style={styles.emptyBtnText}>+ New workout</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 90 }} />

            {/* Floating button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("AddWorkoutScreen")}
            >
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
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
    title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
    subtitle: { color: "#aaa", marginTop: 4 },

    sectionTitle: {
        color: "#aaa",
        marginTop: 22,
        marginBottom: 12,
        paddingHorizontal: 24,
    },

    filterRow: {
        paddingHorizontal: 24,
        marginTop: 16,
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
    filterChipTextActive: { color: "#fff", fontWeight: "bold", fontSize: 12 },
    filterChip: {
        backgroundColor: "#13263a",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#1c2f44",
    },
    filterChipText: { color: "#aaa", fontWeight: "600", fontSize: 12 },

    workoutCard: {
        backgroundColor: "#13263a",
        marginHorizontal: 24,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
    },

    workoutTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    workoutTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", flex: 1 },

    statusPill: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 999,
    },
    statusText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

    workoutMeta: { color: "#777", marginTop: 8, fontSize: 13 },

    workoutBottomRow: {
        marginTop: 14,
        backgroundColor: "#102235",
        borderRadius: 14,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    miniStat: { flex: 1 },
    miniLabel: { color: "#777", fontSize: 12 },
    miniValue: { color: "#fff", fontWeight: "bold", marginTop: 4 },

    chev: { color: "#777", fontSize: 22, fontWeight: "bold" },

    emptyBox: {
        marginTop: 18,
        marginHorizontal: 24,
        padding: 18,
        borderRadius: 16,
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

    fab: {
        position: "absolute",
        right: 18,
        bottom: 18,
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: "#4caf50",
        alignItems: "center",
        justifyContent: "center",
    },
    fabText: { color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: -1 },
});
