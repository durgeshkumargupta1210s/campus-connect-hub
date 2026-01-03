import React, { createContext, useContext, useState, useEffect } from "react";
import { APIClient, API_ENDPOINTS } from "../config/api";
const AuthContext = /*#__PURE__*/createContext(undefined);
export const AuthProvider = ({
  children
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load auth data from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedAuth = localStorage.getItem("authData");
    if (storedToken && storedAuth) {
      try {
        const {
          userId,
          name,
          email,
          role
        } = JSON.parse(storedAuth);
        setToken(storedToken);
        setUserId(userId);
        setUserName(name);
        setUserEmail(email);
        setUserType(role);
        setIsLoggedIn(true);
        APIClient.setToken(storedToken);
      } catch (err) {
        console.error("Failed to restore auth data:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authData");
      }
    }
  }, []);
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await APIClient.post(API_ENDPOINTS.AUTH_LOGIN, {
        email,
        password
      });
      const {
        token: newToken,
        user
      } = response;

      // Set token
      APIClient.setToken(newToken);
      setToken(newToken);

      // Set user data
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);
      setUserType(user.role);
      setIsLoggedIn(true);

      // Store in localStorage
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("authData", JSON.stringify({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (name, email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await APIClient.post(API_ENDPOINTS.AUTH_REGISTER, {
        name,
        email,
        password,
        role
      });
      const {
        token: newToken,
        user
      } = response;

      // Set token
      APIClient.setToken(newToken);
      setToken(newToken);

      // Set user data
      setUserId(user.id);
      setUserName(user.name);
      setUserEmail(user.email);
      setUserType(user.role);
      setIsLoggedIn(true);

      // Store in localStorage
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("authData", JSON.stringify({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      await APIClient.post(API_ENDPOINTS.AUTH_LOGOUT, {});
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      APIClient.clearToken();
      setIsLoggedIn(false);
      setUserType(null);
      setUserName(null);
      setUserEmail(null);
      setUserId(null);
      setToken(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("authData");
    }
  };
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: {
      isLoggedIn,
      userType,
      userName,
      userEmail,
      userId,
      token,
      login,
      register,
      logout,
      isLoading,
      error
    }
  }, children);
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};