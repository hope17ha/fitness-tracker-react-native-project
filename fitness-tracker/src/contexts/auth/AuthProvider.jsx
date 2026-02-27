import * as SecureStore from "expo-secure-store";

import { createContext, use, useEffect, useMemo, useState } from "react"
import { authService } from "../../services";

export const AuthContext = createContext();
const KEYS = {
    user: "auth_user",
    token: "auth_token",
  };
  

export function AuthProvider ({children}){

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
          try {
            const storedUser = await SecureStore.getItemAsync(KEYS.user);
            const storedToken = await SecureStore.getItemAsync(KEYS.token);
    
            if (storedUser && storedToken) {
              setUser(JSON.parse(storedUser));
              setToken(storedToken);
            }
          } catch (error) {
            console.log("Failed to load user from storage", error);
            await SecureStore.deleteItemAsync(KEYS.user);
            await SecureStore.deleteItemAsync(KEYS.token);
          } finally {
            setLoading(false);
          }
        };
    
        loadUser();
      }, []);

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(userData.user);
        setToken(userData.accessToken);

        await SecureStore.setItemAsync(KEYS.user, JSON.stringify(userData.user));
        await SecureStore.setItemAsync(KEYS.token, userData.accessToken);
    }

    const logout = async () => {
        setUser(null);
        setToken(null);
        await SecureStore.deleteItemAsync(KEYS.user);
        await SecureStore.deleteItemAsync(KEYS.token);
      };
    


    const contextValue = useMemo(() => (
        {
            user,
            token,
            isAuthenticated: !!user && !!token,
            login,
            logout,
            loading
        }
    ), [user, token, loading]) ;

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}