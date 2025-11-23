import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Fetch user profile from the protected endpoint
    const refetchUser = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/profile', {
                withCredentials: true,
                validateStatus: () => true,
            });
            if (res.status === 200) {
                setUser(res.data);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error('Error fetching user profile:', err);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        refetchUser();
    }, [refetchUser]);

    return (
        <AuthContext.Provider value={{ user, setUser, refetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
