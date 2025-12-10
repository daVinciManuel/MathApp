import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from the protected endpoint
  const refetchUser = useCallback(async () => {
    setLoading(true);
    getProfile()
      .then((res) => {
        if (res.status === 200) setUser(res.data);
        else setUser(null);
      })
      .catch((err) => {
        console.log("Error fetching user profile: " + err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, refetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
