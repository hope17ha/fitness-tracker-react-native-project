import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { register } from "../services/authService";
import { useAuth } from "../contexts/auth/useAuth";
import { validateRegister } from "../helpers/validations";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [error, setError] = useState(null);

    const { login } = useAuth();

    const registerHandler = async () => {
        const validationError = validateRegister({
            username,
            email,
            password,
            rePassword
          });
          
          if (validationError) 
            return setError(validationError);

        try {
            setError(null);
            await register(username, email, password);

            await login(email, password);
            navigation.replace("TabNavigation");
        } catch (error) {
            setError("Something went wrong. Try again!");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.title}>Create Account</Text>

                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#999"
                            style={styles.input}
                            onChangeText={(text) => {
                                setUsername(text);
                                setError(null);
                            }}
                            value={username}
                        />

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#999"
                            style={styles.input}
                            onChangeText={(text) => {
                                setEmail(text);
                                setError(null);
                            }}
                            value={email}
                            keyboardType="email-address"
                        />

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={(text) => {
                                setPassword(text);
                                setError(null);
                            }}
                            value={password}
                        />

                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={(text) => {
                                setRePassword(text);
                                setError(null);
                            }}
                            value={rePassword}
                        />

                        {error && <Text style={styles.error}>{error}</Text>}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={registerHandler}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login Screen")}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0b1c2d",
    },
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 32,
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
    loginText: {
        color: "#aaa",
        textAlign: "center",
        marginTop: 20,
    },
    error: {
        color: "#ff5252",
        textAlign: "center",
        marginBottom: 12,
        fontWeight: "600",
    },
});
