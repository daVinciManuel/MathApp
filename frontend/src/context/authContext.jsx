import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // <- shared user state
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', {
      withCredentials: true,
      validateStatus: () => true,
    }).then((res) => {
      if (res.request.status === 200) {
        setUser(res.data);
      }
    })
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

