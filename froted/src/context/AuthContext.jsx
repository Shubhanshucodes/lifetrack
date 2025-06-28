import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/me", {
        withCredentials: true,
      });
      setUser(res.data);
      localStorage.setItem("auth_user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Error logging out:", err);
    }

    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("challenge_start");
    localStorage.removeItem("last_completed");
    localStorage.removeItem("current_day");

    // ⬅️ Trigger logout sync across tabs
    localStorage.setItem("logout", Date.now());

  
  };

  // ⬅️ Sync logout across browser tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "logout") {
        setUser(null);
        localStorage.removeItem("auth_user");
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    fetchUser(); // 🔁 Auto-fetch on app load
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser: fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
