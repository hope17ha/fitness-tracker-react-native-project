import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function SplashScreen({ navigation }){

    useEffect(() => {
        const timer = setTimeout(() => {
            // navigation.replace("Login Screen")
            // navigation.replace("TabNavigation")
            navigation.replace("Register Screen")
            
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fitness Tracker App</Text>
            <ActivityIndicator size="large" color="#4caf50" style={{ marginTop: 20 }} />
        </View>
    );
};

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
  