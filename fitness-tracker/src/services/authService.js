import { api } from "./api";

export async function login(email, password) {
    const result = await api.post("/login", { email, password });

    return result.data;
}

export async function register(username, email, password) {
    const result = await api.post('/register', { username, email, password });

    return result.data;
}
