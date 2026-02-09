import { createContext, useState } from "react"
import { authService } from "../../services";

export const AuthContext = createContext();

export function AuthProvider ({children}){

    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(userData);
    }

    const contextValue = {
        user,
        login,
        logout: () => setUser(null)
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}