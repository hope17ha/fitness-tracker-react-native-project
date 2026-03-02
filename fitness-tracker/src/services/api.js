import axios from "axios";

const API_URL =
    process.env.EXPO_PUBLIC_API_URL ||
    "https://fitness-tracker-react-native-project-api.onrender.com";

export const api = axios.create({
    baseURL: API_URL,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
});
