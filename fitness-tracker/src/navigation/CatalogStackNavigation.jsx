import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CatalogScreen from "../screens/CatalogScreen.jsx";
import ExerciseListScreen from "../screens/ExerciseListScreen.jsx";

const Stack = createNativeStackNavigator();

export default function CatalogStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CatalogScreen" component={CatalogScreen} />
      <Stack.Screen name="ExerciseListScreen" component={ExerciseListScreen} />
    </Stack.Navigator>
  );
}
