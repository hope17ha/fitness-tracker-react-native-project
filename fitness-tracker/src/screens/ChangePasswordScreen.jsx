import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { changePassword } from "../services/authService";
import { useAuth } from "../contexts/auth/useAuth";

export default function ChangePasswordScreen({ navigation }) {

    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [error, setError] = useState(null);

    const { user } = useAuth();


    const changePasswordHandler = async () => {

        try {

            if (newPassword === reNewPassword){

                await changePassword(user.id, newPassword);
                navigation.replace('Profile Screen');
            } else {
                setError('Passwords need to match!')
            }
        } catch (error) {
            console.log(error);
        }


    };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Change Password</Text>

        <TextInput
          placeholder="Current Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="New Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => {
            setNewPassword(text)
          }}
          value={newPassword}
        />

        <TextInput
          placeholder="Confirm New Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => {
            setReNewPassword(text)
          }}
          value={reNewPassword}
        />

        <TouchableOpacity style={styles.button} onPress={changePasswordHandler}>
          <Text style={styles.buttonText}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1c2d",
  },

  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    backgroundColor: "#1c2f44",
    padding: 14,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
