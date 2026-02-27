import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    TextInput
} from "react-native";
import { useAuth } from "../contexts/auth/useAuth";
import { workoutService } from "../services";
import { formatDate, minutesBetween } from "../helpers/dateHelpers";

export default function HomeScreen({ navigation }) {
    const { user, logout } = useAuth();

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeWorkout, setActiveWorkout] = useState(null);
    const [showNameModal, setShowNameModal] = useState(false);
    const [workoutTitle, setWorkoutTitle] = useState("Workout");
    const [starting, setStarting] = useState(false);

    const logoutHandler = () => {
        logout();
    };

    useFocusEffect(
        useCallback(() => {
            let mounted = true;
            async function load() {
                if (!user?.id) return;
                const data = await workoutService.getActiveWorkoutByUserId(
                    user.id
                );
                if (mounted) setActiveWorkout(data);
                setLoading(true);
                try {
                    const data = await workoutService.getLastWorkoutByUserId(
                        user.id
                    );
                    if (mounted) setWorkout(data);
                } catch (error) {
                    Alert.alert("Couldn't load workouts. Try again!");
                } finally {
                    if (mounted) setLoading(false);
                }
                return () => {
                    mounted = false;
                };
            }
            load();
        }, [user?.id])
    );

    const mins = workout
        ? minutesBetween(workout.startedAt, workout.finishedAt)
        : null;

    const startOrContinue = async (titleToUse) => {
        if (!user?.id) return;

        try {
            setStarting(true);

            const freshActive = await workoutService.getActiveWorkoutByUserId(
                user.id
            );

            let workoutId;

            if (freshActive?.id) {
                workoutId = freshActive.id;
            } else {
                const created = await workoutService.createWorkout({
                    userId: user.id,
                    title: titleToUse?.trim() || "Workout",
                    startedAt: new Date().toISOString(),
                    finishedAt: null,
                });
                workoutId = created.id;
            }

            navigation.navigate("My Workouts", {
                screen: "MyWorkoutsScreen",
                params: { openWorkoutId: workoutId },
            });
        } finally {
            setStarting(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
              <ActivityIndicator size="large" color="#4caf50" />
                <Text style={{ color: "#777", marginTop: 10 }}>
                    Loading...
                </Text>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Hello, {user?.username || user?.email}!
                </Text>
                <Text style={styles.subtitle}>Ready to train today?</Text>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={logoutHandler}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.heroCard} />

                <TouchableOpacity
                    style={styles.startCard}
                    onPress={async () => {
                        if (!user?.id) return;

                        const freshActive =
                            await workoutService.getActiveWorkoutByUserId(
                                user.id
                            );

                        if (freshActive?.id) {
                            return startOrContinue();
                        }

                        setWorkoutTitle("Workout");
                        setShowNameModal(true);
                    }}
                    disabled={starting}
                >
                    <Text style={styles.startTitle}>
                        {activeWorkout?.id
                            ? "Continue Workout"
                            : "Start Workout"}
                    </Text>
                    <Text style={styles.startSub}>
                        {activeWorkout?.id
                            ? "Resume your active session"
                            : "Create a new session"}
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={showNameModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowNameModal(false)}
                >
                    <Pressable
                        style={styles.modalBackdrop}
                        onPress={() => setShowNameModal(false)}
                    />

                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Workout name</Text>

                        <TextInput
                            value={workoutTitle}
                            onChangeText={setWorkoutTitle}
                            placeholder="e.g. Push Day"
                            placeholderTextColor="#777"
                            style={styles.modalInput}
                            autoFocus
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                marginTop: 12,
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.modalBtnGhost]}
                                onPress={() => setShowNameModal(false)}
                            >
                                <Text style={styles.modalBtnGhostText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.modalBtn,
                                    styles.modalBtnPrimary,
                                ]}
                                onPress={async () => {
                                    setShowNameModal(false);
                                    await startOrContinue(workoutTitle);
                                }}
                            >
                                <Text style={styles.modalBtnPrimaryText}>
                                    Start
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Quick actions */}
                <Text style={styles.sectionTitle}>Quick actions</Text>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.smallCard}
                        onPress={() => {
                            navigation.navigate("Catalog");
                        }}
                    >
                        <Text style={styles.emoji}>📚</Text>
                        <Text style={styles.cardTitle}>Catalog</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.smallCard}
                        onPress={() => {
                            navigation.navigate("My Workouts");
                        }}
                    >
                        <Text style={styles.emoji}>💪</Text>
                        <Text style={styles.cardTitle}>My Workouts</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.createCard}
                    onPress={() =>
                        navigation.navigate("My Workouts", {
                            screen: "AddWorkoutScreen",
                        })
                    }
                >
                    <Text style={styles.emoji}>➕</Text>
                    <Text style={styles.cardTitle}>Create Workout</Text>
                </TouchableOpacity>

                {/* Last workout */}
                {!loading && !workout ? (
                    <View style={styles.lastWorkout}>
                        <Text style={styles.lastName}>No workouts yet</Text>
                        <Text style={styles.lastMeta}>
                            Create your first workout to see it here.
                        </Text>
                    </View>
                ) : (
                    !!workout && (
                        <View style={styles.lastWorkout}>
                            <Text style={styles.lastName}>
                                {workout.title ?? "Workout"}
                            </Text>
                            <Text style={styles.lastMeta}>
                                {workout.startedAt
                                    ? formatDate(workout.startedAt)
                                    : "—"}{" "}
                                • {mins ?? "—"} min
                            </Text>
                        </View>
                    )
                )}

                {/* Motivation */}
                <View style={styles.motivation}>
                    <Text style={styles.motivationText}>
                        Consistency beats motivation.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0b1c2d" },
    body: { paddingHorizontal: 24, paddingTop: 18, gap: 14 },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        backgroundColor: "#1c2f44",
    },
    title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
    subtitle: {
        color: "#aaa",
        marginTop: 4,
    },
    logoutButton: {
        position: "absolute",
        right: 24,
        top: 60,
        backgroundColor: "#e53935",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    logoutText: { color: "#fff", fontWeight: "bold" },
    startCard: {
        backgroundColor: "#4caf50",
        borderRadius: 20,
        padding: 22,
    },

    startTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },

    startSub: {
        color: "#eaffea",
        marginTop: 6,
    },

    sectionTitle: {
        color: "#aaa",
        marginTop: 10,
        marginBottom: 8,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    smallCard: {
        flex: 1,
        backgroundColor: "#1c2f44",
        padding: 18,
        borderRadius: 16,
    },

    createCard: {
        backgroundColor: "#1c2f44",
        padding: 20,
        borderRadius: 16,
        marginTop: 14,
    },

    emoji: {
        fontSize: 28,
        marginBottom: 10,
    },

    cardTitle: {
        color: "#fff",
        fontWeight: "bold",
    },

    lastWorkout: {
        backgroundColor: "#13263a",
        borderRadius: 16,
        padding: 18,
    },

    lastName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    lastMeta: {
        color: "#777",
        marginTop: 4,
    },

    motivation: {
        borderRadius: 16,
        backgroundColor: "#102235",
        padding: 18,
        marginTop: 6,
    },

    motivationText: {
        color: "#aaa",
        textAlign: "center",
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
    modalBackdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
      },
      modalCard: {
        position: "absolute",
        left: 20,
        right: 20,
        top: "35%",
        backgroundColor: "#0f2337",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#1c2f44",
      },
      modalTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
      },
      modalInput: {
        marginTop: 12,
        backgroundColor: "#13263a",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#1c2f44",
      },
      modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
      },
      modalBtnGhost: {
        backgroundColor: "#13263a",
        borderWidth: 1,
        borderColor: "#1c2f44",
      },
      modalBtnGhostText: {
        color: "#aaa",
        fontWeight: "bold",
      },
      modalBtnPrimary: {
        backgroundColor: "#4caf50",
      },
      modalBtnPrimaryText: {
        color: "#fff",
        fontWeight: "bold",
      },
});
