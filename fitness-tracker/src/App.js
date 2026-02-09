import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./navigation/RootNavigation";

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigation />

            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
