import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { changePassword, login } from "../services/authService";
import { useAuth } from "../contexts/auth/useAuth";

export default function ChangePasswordScreen({ navigation }) {
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const { user } = useAuth();

    const changePasswordHandler = async () => {
        setError(null);

        if (newPassword !== reNewPassword) {
            return setError("Passwords need to match!");
        }


        try {
                await login(user.email, password);
                await changePassword(user.id, newPassword);
                navigation.goBack();
            } catch (error) {
            setError('Current password is incorrect!' || error );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Change Password</Text>

                <TextInput
                    placeholder="Current Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text => {
                        setPassword(text)
                        setError(null)
                    } 
                    )}
                    value={password}
                />

                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => {
                        setNewPassword(text);
                        setError(null);
                    }}
                    value={newPassword}
                />

                <TextInput
                    placeholder="Confirm New Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => {
                        setReNewPassword(text);
                        setError(null);
                    }}
                    value={reNewPassword}
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={changePasswordHandler}
                >
                    <Text style={styles.buttonText}>Save Password</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0b1c2d",
    },

    inner: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 40,
    },

    input: {
        backgroundColor: "#1c2f44",
        padding: 14,
        borderRadius: 10,
        color: "#fff",
        marginBottom: 16,
    },

    button: {
        backgroundColor: "#4caf50",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    error: {
        color: "#ff5252",
        textAlign: "center",
        marginBottom: 12,
        fontWeight: "600",
    },
});
