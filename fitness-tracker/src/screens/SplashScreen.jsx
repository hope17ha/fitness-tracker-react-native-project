import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../contexts/auth/useAuth";

export default function SplashScreen({ navigation }) {
    const { user } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                navigation.replace("TabNavigation");
            } else {
                navigation.replace("Register Screen");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fitness Tracker App</Text>
            <ActivityIndicator
                size="large"
                color="#4caf50"
                style={{ marginTop: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0b1c2d",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
    },
});
