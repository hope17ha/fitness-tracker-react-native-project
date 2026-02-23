import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { workoutService } from "../services";
import { useAuth } from "../contexts/auth/useAuth";
import {
    formatDate,
    formatTimeHHMM,
    minutesBetween,
} from "../helpers/dateHelpers";

export default function MyWorkoutsScreen({ navigation, route }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");

    const { user } = useAuth();

    useEffect(() => {
        const id = route?.params?.openWorkoutId;
        if (!id) return;

        navigation.navigate("WorkoutDetailsScreen", { workoutId: id });
        navigation.setParams({ openWorkoutId: undefined });
    }, [route?.params?.openWorkoutId, navigation]);

    const load = useCallback(async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const data = await workoutService.getAllWorkoutsByUserId(user.id);
            setWorkouts(data);
        } catch (error) {
            Alert.alert("Couldn't load workouts. Try again!");
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load])
    );
    const visibleWorkouts =
        statusFilter === "all"
            ? workouts
            : workouts.filter((w) => w.status === statusFilter);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>My Workouts</Text>
                <Text style={styles.subtitle}>Your sessions and history</Text>
            </View>

            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        statusFilter === "all" && styles.filterChipActive,
                    ]}
                    onPress={() => setStatusFilter("all")}
                >
                    <Text
                        style={[
                            styles.filterChipText,
                            statusFilter === "all" &&
                                styles.filterChipTextActive,
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        statusFilter === "active" && styles.filterChipActive,
                    ]}
                    onPress={() => setStatusFilter("active")}
                >
                    <Text
                        style={[
                            styles.filterChipText,
                            statusFilter === "active" &&
                                styles.filterChipTextActive,
                        ]}
                    >
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        statusFilter === "done" && styles.filterChipActive,
                    ]}
                    onPress={() => setStatusFilter("done")}
                >
                    <Text
                        style={[
                            styles.filterChipText,
                            statusFilter === "done" &&
                                styles.filterChipTextActive,
                        ]}
                    >
                        Done
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Workouts</Text>

            {loading && (
                <View style={styles.loaderBox}>
                    <ActivityIndicator size="large" color="#4caf50" />
                    <Text style={styles.loaderText}>Loading workouts...</Text>
                </View>
            )}

            {!loading && visibleWorkouts.length === 0 && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateTitle}>
                        {statusFilter === "all"
                            ? "No workouts yet"
                            : `No ${statusFilter} workouts`}
                    </Text>
                </View>
            )}

            {!loading &&
                visibleWorkouts.map((workout) => {
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
                                <Text
                                    style={styles.workoutTitle}
                                    numberOfLines={1}
                                >
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
                                    <Text style={styles.miniLabel}>
                                        Started
                                    </Text>
                                    <Text style={styles.miniValue}>
                                        {formatDate(workout.startedAt)}
                                    </Text>
                                </View>
                                <View style={styles.miniStat}>
                                    <Text style={styles.miniLabel}>
                                        Finished
                                    </Text>
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
    emptyState: {
        marginTop: 30,
        marginHorizontal: 24,
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#102235",
        alignItems: "center",
    },

    emptyStateTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
