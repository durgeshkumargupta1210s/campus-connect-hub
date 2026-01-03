import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import React from "react";
const Login = () => {
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const {
    toast
  } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      // Call the backend API through AuthContext
      await login(formData.email, formData.password);

      // Show success toast
      toast({
        title: "Login Successful!",
        description: "Welcome back to CampusConnect"
      });

      // Redirect to home page after successful login
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      const errorMsg = err.message || "Login failed. Please check your credentials and try again.";
      setErrors({
        email: errorMsg
      });
      toast({
        title: "Login Failed",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-background flex items-center justify-center px-4 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 -z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block bg-gradient-hero bg-clip-text text-transparent"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold"
  }, "CampusConnect")), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Sign in to your account")), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white/50 dark:bg-slate-900/50 backdrop-blur border-border shadow-lg"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Welcome Back"), /*#__PURE__*/React.createElement(CardDescription, null, "Enter your credentials to access your dashboard")), /*#__PURE__*/React.createElement(CardContent, null, errors.email && !formData.email.includes("required") && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex gap-3"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-red-600 dark:text-red-400"
  }, errors.email)), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email",
    className: "text-foreground font-semibold"
  }, "Email Address"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "absolute left-3 top-3 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    name: "email",
    type: "email",
    value: formData.email,
    onChange: handleInputChange,
    placeholder: "you@example.com",
    className: "pl-10 bg-background border-border focus:ring-primary"
  })), errors.email && /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 text-sm"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "password",
    className: "text-foreground font-semibold"
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "absolute left-3 top-3 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "password",
    name: "password",
    type: showPassword ? "text" : "password",
    value: formData.password,
    onChange: handleInputChange,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    className: "pl-10 pr-10 bg-background border-border focus:ring-primary"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors",
    title: showPassword ? "Hide password" : "Show password"
  }, showPassword ? /*#__PURE__*/React.createElement(EyeOff, {
    className: "w-5 h-5"
  }) : /*#__PURE__*/React.createElement(Eye, {
    className: "w-5 h-5"
  }))), errors.password && /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 text-sm"
  }, errors.password)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-sm"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "w-4 h-4 rounded border-border accent-primary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, "Remember me")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "text-primary hover:text-primary/80 transition-colors font-medium"
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isLoading,
    className: "w-full bg-gradient-accent hover:opacity-90 text-white font-semibold h-10 flex items-center justify-center gap-2"
  }, isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), "Signing in...") : /*#__PURE__*/React.createElement(React.Fragment, null, "Sign In", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-4 h-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "relative my-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full border-t border-border"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative flex justify-center text-xs uppercase"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-white dark:bg-slate-900 px-2 text-muted-foreground"
  }, "New to CampusConnect?"))), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-sm text-muted-foreground"
  }, "Don't have an account?", " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate("/signup"),
    className: "text-primary hover:text-primary/80 font-semibold transition-colors"
  }, "Sign up here")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-900 dark:text-blue-100"
  }, /*#__PURE__*/React.createElement("strong", null, "Demo:"), " Use any email and password (min 6 chars) to test the login flow."))));
};
export default Login;