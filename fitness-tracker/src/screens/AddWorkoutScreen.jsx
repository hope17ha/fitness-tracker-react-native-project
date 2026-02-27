import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuth } from "../contexts/auth/useAuth";
import { workoutService } from "../services";

export default function AddWorkoutScreen({ navigation }) {
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);
    const [isManual, setIsManual] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const canSubmit = useMemo(() => !!user?.id && !saving, [user?.id, saving]);

    const handleStart = async () => {
        if (!user?.id) return Alert.alert("Error", "Missing user.");

        if (!title.trim())
            return Alert.alert("Missing title", "Enter a title.");

        try {
            setSaving(true);

            const active = await workoutService.getActiveWorkoutByUserId(
                user.id
            );

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
                                navigation
                                    .getParent()
                                    ?.navigate("My Workouts", {
                                        screen: "WorkoutDetailsScreen",
                                        params: { workoutId: active.id },
                                    });
                            },
                        },
                        {
                            text: "Start new",
                            style: "destructive",
                            onPress: async () => {
                                try {
                                    setSaving(true);

                                    await workoutService.finishWorkout(
                                        active.id
                                    );

                                    if (isManual && startedAt > new Date()) {
                                        return Alert.alert("Invalid time", "Started time can't be in the future.");
                                      }
                                    const payload = {
                                        userId: user.id,
                                        title,
                                        ...(isManual ? { startedAt: startedAt.toISOString() } : {}),
                                      };
                                      
                                      const created = await workoutService.createWorkout(payload);

                                    navigation
                                        .getParent()
                                        ?.navigate("My Workouts", {
                                            screen: "WorkoutDetailsScreen",
                                            params: { workoutId: created.id },
                                        });
                                } catch (e) {
                                    console.log(e);
                                    Alert.alert(
                                        "Error",
                                        "Could not start new workout."
                                    );
                                } finally {
                                    setSaving(false);
                                }
                            },
                        },
                    ]
                );

                return;
            }
            
            if (isManual && startedAt > new Date()) {
                return Alert.alert("Invalid time", "Started time can't be in the future.");
              }
            const payload = {
                userId: user.id,
                title,
                ...(isManual ? { startedAt: startedAt.toISOString() } : {}),
              };
              
              const created = await workoutService.createWorkout(payload);

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
                    <Text style={styles.subtitle}>
                        Create a workout session
                    </Text>
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
                    style={[styles.secondaryBtn, { marginTop: 14 }]}
                    onPress={() => setIsManual((p) => !p)}
                    disabled={saving}
                >
                    <Text style={styles.secondaryBtnText}>
                        {isManual
                            ? "Manual workout: ON"
                            : "Manual workout: OFF"}
                    </Text>
                </TouchableOpacity>

                {isManual ? (
                    <View style={{ marginTop: 14 }}>
                        <Text style={styles.label}>Started at</Text>

                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity
                                style={[
                                    styles.secondaryBtn,
                                    { flex: 1, marginTop: 0 },
                                ]}
                                onPress={() => setShowDatePicker(true)}
                                disabled={saving}
                            >
                                <Text style={styles.secondaryBtnText}>
                                    {startedAt.toLocaleDateString()}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.secondaryBtn,
                                    { flex: 1, marginTop: 0 },
                                ]}
                                onPress={() => setShowTimePicker(true)}
                                disabled={saving}
                            >
                                <Text style={styles.secondaryBtnText}>
                                    {startedAt.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.secondaryBtn, { marginTop: 10 }]}
                            onPress={() => setStartedAt(new Date())}
                            disabled={saving}
                        >
                            <Text style={styles.secondaryBtnText}>
                                Set to now
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker ? (
                            <DateTimePicker
                                value={startedAt}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (event.type === "dismissed") return;
                                    if (!selectedDate) return;
                                    const d = new Date(startedAt);
                                    d.setFullYear(
                                        selectedDate.getFullYear(),
                                        selectedDate.getMonth(),
                                        selectedDate.getDate()
                                    );
                                    setStartedAt(d);
                                }}
                            />
                        ) : null}

                        {showTimePicker ? (
                            <DateTimePicker
                                value={startedAt}
                                mode="time"
                                display="default"
                                onChange={(event, selectedTime) => {
                                    setShowTimePicker(false);
                                    if (event.type === "dismissed") return;
                                    if (!selectedTime) return;

                
                                    const d = new Date(startedAt);
                                    d.setHours(
                                        selectedTime.getHours(),
                                        selectedTime.getMinutes(),
                                        0,
                                        0
                                    );
                                    setStartedAt(d);
                                }}
                            />
                        ) : null}
                    </View>
                ) : null}

                <TouchableOpacity
                    style={[
                        styles.primaryBtn,
                        !canSubmit && styles.btnDisabled,
                    ]}
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
    backText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: -2,
    },

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
    secondaryBtn: {
        backgroundColor: "#13263a",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1c2f44",
      },
      secondaryBtnText: {
        color: "#aaa",
        fontWeight: "bold",
        fontSize: 14,
      },
});
