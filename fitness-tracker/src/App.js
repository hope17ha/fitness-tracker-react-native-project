import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./navigation/RootNavigation";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider>
                <StatusBar
                    style="light"
                    backgroundColor="transparent"
                    translucent={true}
                />
                <NavigationContainer>
                    <AuthProvider>
                        <RootNavigation />
                    </AuthProvider>
                </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
