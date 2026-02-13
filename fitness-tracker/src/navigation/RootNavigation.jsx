import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen.jsx";
import SplashScreen from "../screens/SplashScreen.jsx";
import TabNavigation from "./TabNavigation.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import AuthNavigation from "./AuthNavigation.jsx";
import { useAuth } from "../contexts/auth/useAuth.js";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <SplashScreen />;
      }

    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                    name="AuthNavigation"
                    component={AuthNavigation}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
}
