import { api } from "./api";

export async function login(email, password) {
    const result = await api.post("/login", { email, password });

    return result.data;
}

export async function register(fullname, email, password) {
    const result = await api.post('/register', { fullname, email, password });

    return result.data;
}
