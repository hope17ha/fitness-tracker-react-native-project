import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function TabNavigation(){


    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"
                        component={HomeScreen}
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                            headerShown: false
                        }} />
            <Tab.Screen name="Add workout"
                        component={AddWorkoutScreen}
                        options={{
                            title: "Add workout",
                            tabBarIcon: ({ color, size }) => <Ionicons name="barbell" size={size} color={color} />,
                            headerShown: false
                        }} />
            <Tab.Screen name="Profile" 
                        component={ProfileScreen}
                        options={{
                            title: "Profile",
                            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                            headerShown: false
                        }} />
        </Tab.Navigator>
    );
}