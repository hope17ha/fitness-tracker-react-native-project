import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./navigation/RootNavigation";
import { AuthProvider } from "./contexts/auth/AuthProvider";

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <AuthProvider>
                <RootNavigation />
            </AuthProvider>
        </NavigationContainer>
    );
}
