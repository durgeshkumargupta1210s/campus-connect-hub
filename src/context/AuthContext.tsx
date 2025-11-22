import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userType: "user" | "admin" | null;
  userName: string | null;
  userEmail: string | null;
  login: (type: "user" | "admin", name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"user" | "admin" | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (type: "user" | "admin", name: string, email: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserName(name);
    setUserEmail(email);
    // Store in localStorage for persistence
    localStorage.setItem("authData", JSON.stringify({ type, name, email }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserName(null);
    setUserEmail(null);
    localStorage.removeItem("authData");
  };

  // Load auth data from localStorage on mount
  React.useEffect(() => {
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      try {
        const { type, name, email } = JSON.parse(storedAuth);
        setIsLoggedIn(true);
        setUserType(type);
        setUserName(name);
        setUserEmail(email);
      } catch (error) {
        console.error("Failed to restore auth data:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
