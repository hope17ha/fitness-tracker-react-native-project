import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileNavigation from "./ProfileNavigation";
import CatalogStackNavigation from "./CatalogStackNavigation";
import WorkoutsStackNavigation from "./WorkoutsNavigation";

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Catalog"
                component={CatalogStackNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="My Workouts"
                component={WorkoutsStackNavigation}
                options={{
                    title: "My Workouts",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="barbell" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
                listeners={({ navigation }) => ({
                    tabPress: () => {
                      navigation.navigate("My Workouts", { screen: "MyWorkoutsScreen" });
                    },
                  })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNavigation}
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}
