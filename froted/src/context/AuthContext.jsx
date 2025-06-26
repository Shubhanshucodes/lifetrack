import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData)); // 💾 persist
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user"); // ❌ remove on logout
  };

  // Optional: sync across tabs
  useEffect(() => {
    const syncLogout = () => {
      setUser(null);
    };
    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
