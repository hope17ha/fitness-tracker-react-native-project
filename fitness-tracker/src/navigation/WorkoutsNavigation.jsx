import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyWorkoutsScreen from "../screens/MyWorkoutsScreen";


const Stack = createNativeStackNavigator();

export default function WorkoutsStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyWorkoutsScreen" component={MyWorkoutsScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
