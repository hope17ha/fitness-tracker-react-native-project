import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from "react-native";

import {
    pickExerciseImageFromLibrary,
    takeExerciseImageWithCamera,
} from "../helpers/imagePicker";
import { exercisesService } from "../services";
import { useAuth } from "../contexts/auth/useAuth";

export default function AddExerciseScreen({ navigation }) {
    const { user } = useAuth();

    const [name, setName] = useState("");
    const [muscleGroupId, setMuscleGroupId] = useState(null);
    const [equipment, setEquipment] = useState(null);
    const [imageUrl, setImageUrl] = useState("");


    const isFormValid =
    name.trim().length >= 3 &&
    muscleGroupId && equipment;

    const MUSCLE_GROUPS = [
        { id: "chest", label: "Chest" },
        { id: "back", label: "Back" },
        { id: "legs", label: "Legs" },
        { id: "shoulders", label: "Shoulders" },
        { id: "arms", label: "Arms" },
        { id: "core", label: "Core" },
    ];

    const EQUIPMENT = ["barbell", "dumbbell", "machine", "cable", "bodyweight"];

    const handleSave = async () => {
        const trimmedName = name.trim();

        if (!trimmedName)
            return Alert.alert("Missing name", "Please enter exercise name.");
        if (trimmedName.length < 3) {
            return Alert.alert(
                "Invalid name",
                "Exercise name must be at least 3 characters."
            );
        }
        if (!muscleGroupId)
            return Alert.alert("Missing group", "Please select muscle group.");
        if (!equipment)
            return Alert.alert("Missing equipment", "Please select equipment.");

        try {
            await exercisesService.createExercise({
                name: trimmedName,
                muscleGroupId,
                equipment,
                imageUrl: imageUrl.trim(),
                userId: user.id,
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Could not create exercise.");
            console.log(error);
        }
    };

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
                    <Text style={styles.title}>Add Exercise</Text>
                    <Text style={styles.subtitle}>
                        Create your own exercise
                    </Text>
                </View>
            </View>

            {/* Form */}
            <View style={styles.form}>
                {/* Name */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                    placeholder="e.g. Cable Fly Low-to-High"
                    placeholderTextColor="#777"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                {/* Muscle group (UI picker placeholder) */}
                <View style={{ gap: 10 }}>
                    {MUSCLE_GROUPS.map((group) => (
                        <TouchableOpacity
                            key={group.id}
                            onPress={() => setMuscleGroupId(group.id)}
                            style={{
                                padding: 14,
                                borderRadius: 12,
                                backgroundColor:
                                    muscleGroupId === group.id
                                        ? "#4caf50"
                                        : "#13263a",
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        muscleGroupId === group.id
                                            ? "#fff"
                                            : "#aaa",
                                    fontWeight: "bold",
                                }}
                            >
                                {group.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Equipment (UI picker placeholder) */}
                <Text style={styles.label}>Equipment</Text>
                <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}
                >
                    {EQUIPMENT.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setEquipment(item)}
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderRadius: 999,
                                backgroundColor:
                                    equipment === item ? "#4caf50" : "#13263a",
                            }}
                        >
                            <Text style={{ color: "#fff" }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Image URL */}
                <Text style={styles.label}>Image URL</Text>
                <TextInput
                    placeholder="https://..."
                    placeholderTextColor="#777"
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={setImageUrl}
                />
                <Text style={styles.helper}>
                    Optional. You can add a real image later.
                </Text>

                {/* Preview block (UI only) */}
                <Text style={styles.label}>Image</Text>

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                        style={[styles.secondaryBtn, { flex: 1, marginTop: 0 }]}
                        onPress={async () => {
                            try {
                                const dataUrl =
                                    await pickExerciseImageFromLibrary();
                                if (dataUrl) setImageUrl(dataUrl);
                            } catch (e) {
                                Alert.alert(
                                    "Permission needed",
                                    "Please allow photo library access."
                                );
                            }
                        }}
                    >
                        <Text style={styles.secondaryBtnText}>
                            Pick from gallery
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.secondaryBtn, { flex: 1, marginTop: 0 }]}
                        onPress={async () => {
                            try {
                                const dataUrl =
                                    await takeExerciseImageWithCamera();
                                if (dataUrl) setImageUrl(dataUrl);
                            } catch (e) {
                                Alert.alert(
                                    "Permission needed",
                                    "Please allow camera access."
                                );
                            }
                        }}
                    >
                        <Text style={styles.secondaryBtnText}>Take photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.preview}>
                    <Text style={styles.previewTitle}>Preview</Text>

                    {imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.previewImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.previewImage} />
                    )}

                    <Text style={styles.previewHint}>
                        {imageUrl ? "Image selected" : "No image selected"}
                    </Text>

                    {imageUrl ? (
                        <TouchableOpacity
                            style={[styles.dangerBtn, { marginTop: 12 }]}
                            onPress={() => setImageUrl("")}
                        >
                            <Text style={styles.dangerBtnText}>
                                Remove image
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

                {/* Actions */}
                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    !isFormValid && { opacity: 0.5 }
                  ]}
                    onPress={handleSave}
                >
                    <Text style={styles.primaryBtnText}>Save Exercise</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.secondaryBtnText}>Cancel</Text>
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
        paddingLeft: 52, // 40 (бутон) + 12 spacing
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

    form: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    label: {
        color: "#aaa",
        marginTop: 16,
        marginBottom: 8,
        fontSize: 13,
    },

    input: {
        backgroundColor: "#13263a",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: "#fff",
    },

    helper: {
        color: "#777",
        marginTop: 8,
        fontSize: 12,
        lineHeight: 16,
    },

    picker: {
        backgroundColor: "#13263a",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#1c2f44",
    },

    pickerText: {
        color: "#777",
        fontWeight: "600",
    },

    pickerArrow: {
        color: "#777",
        fontSize: 20,
        fontWeight: "bold",
    },

    chipsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    chipActive: {
        backgroundColor: "#4caf50",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
    },

    chipTextActive: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },

    chip: {
        backgroundColor: "#13263a",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#1c2f44",
    },

    chipText: {
        color: "#aaa",
        fontWeight: "600",
        fontSize: 12,
    },

    preview: {
        marginTop: 22,
        padding: 16,
        borderRadius: 14,
        backgroundColor: "#102235",
    },

    previewTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 12,
    },

    previewImage: {
        height: 160,
        borderRadius: 14,
        backgroundColor: "#1c2f44",
    },

    previewHint: {
        color: "#777",
        marginTop: 10,
        fontSize: 12,
        textAlign: "center",
    },

    primaryBtn: {
        marginTop: 22,
        backgroundColor: "#4caf50",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    primaryBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },

    secondaryBtn: {
        marginTop: 12,
        backgroundColor: "#1c2f44",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    secondaryBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
    dangerBtn: {
        backgroundColor: "#e53935",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    dangerBtnText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
