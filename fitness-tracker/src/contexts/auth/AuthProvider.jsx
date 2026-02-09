import { createContext, useState } from "react"

export const AuthContext = createContext();

export function AuthProvider ({children}){

    const [user, setUser] = useState(null);

    const contextValue = {
        user,
        login: (userData) => setUser(userData),
        logout: () => setUser(null)
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}