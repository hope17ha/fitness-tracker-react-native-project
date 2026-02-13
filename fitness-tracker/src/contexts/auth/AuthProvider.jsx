import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, use, useEffect, useState } from "react"
import { authService } from "../../services";

export const AuthContext = createContext();

export function AuthProvider ({children}){

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
          try {
            const storedUser = await AsyncStorage.getItem("@user");
            const storedToken = await AsyncStorage.getItem("@token");
    
            if (storedUser && storedToken) {
              setUser(JSON.parse(storedUser));
              setToken(storedToken);
            }
          } catch (error) {
            console.log("Failed to load user from storage", error);
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

        await AsyncStorage.setItem("@user", JSON.stringify(userData.user));
        await AsyncStorage.setItem("@token", userData.accessToken);
    }

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem("@user");
        await AsyncStorage.removeItem("@token");
      };
    


    const contextValue = {
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}