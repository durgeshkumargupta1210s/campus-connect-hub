import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import React from "react";
const Signup = () => {
  const navigate = useNavigate();
  const {
    register
  } = useAuth();
  const {
    toast
  } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student" // student or admin
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
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Call the backend API through AuthContext
      await register(formData.fullName, formData.email, formData.password, formData.userType);

      // Show success toast
      toast({
        title: "Account Created!",
        description: "Welcome to CampusConnect. Your account has been created successfully."
      });

      // Redirect to home page after successful registration
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
      const errorMsg = err.message || "Signup failed. Please try again.";
      setErrors({
        email: errorMsg
      });
      toast({
        title: "Signup Failed",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const passwordStrength = () => {
    if (!formData.password) return {
      level: 0,
      text: ""
    };
    let strength = 0;
    if (formData.password.length >= 6) strength++;
    if (formData.password.length >= 10) strength++;
    if (/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password)) strength++;
    if (/\d/.test(formData.password)) strength++;
    if (/[^a-zA-Z\d]/.test(formData.password)) strength++;
    const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];
    return {
      level: strength,
      text: levels[strength] || "Very Weak",
      color: colors[Math.max(0, Math.min(strength - 1, 4))] || "bg-red-500"
    };
  };
  const strength = passwordStrength();
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-background flex items-center justify-center px-4 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 -z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
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
  }, "Create your account and join our community")), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white/50 dark:bg-slate-900/50 backdrop-blur border-border shadow-lg"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Get Started"), /*#__PURE__*/React.createElement(CardDescription, null, "Join CampusConnect to access exclusive features")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold"
  }, "I am a"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setFormData(prev => ({
      ...prev,
      userType: "student"
    })),
    className: `p-3 rounded-lg border-2 transition-all font-medium text-sm ${formData.userType === "student" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/50"}`
  }, "Student"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setFormData(prev => ({
      ...prev,
      userType: "admin"
    })),
    className: `p-3 rounded-lg border-2 transition-all font-medium text-sm ${formData.userType === "admin" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:border-primary/50"}`
  }, "Admin"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "fullName",
    className: "text-foreground font-semibold"
  }, "Full Name"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(User, {
    className: "absolute left-3 top-3 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "fullName",
    name: "fullName",
    type: "text",
    value: formData.fullName,
    onChange: handleInputChange,
    placeholder: "John Doe",
    className: "pl-10 bg-background border-border focus:ring-primary"
  })), errors.fullName && /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 text-sm"
  }, errors.fullName)), /*#__PURE__*/React.createElement("div", {
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
  }, errors.password), formData.password && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-2 bg-secondary rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full transition-all ${strength.color}`,
    style: {
      width: `${strength.level / 5 * 100}%`
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Strength: ", /*#__PURE__*/React.createElement("span", {
    className: strength.color.replace("bg-", "text-")
  }, strength.text)))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "confirmPassword",
    className: "text-foreground font-semibold"
  }, "Confirm Password"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "absolute left-3 top-3 w-5 h-5 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    id: "confirmPassword",
    name: "confirmPassword",
    type: showConfirmPassword ? "text" : "password",
    value: formData.confirmPassword,
    onChange: handleInputChange,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    className: "pl-10 pr-10 bg-background border-border focus:ring-primary"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowConfirmPassword(!showConfirmPassword),
    className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors",
    title: showConfirmPassword ? "Hide password" : "Show password"
  }, showConfirmPassword ? /*#__PURE__*/React.createElement(EyeOff, {
    className: "w-5 h-5"
  }) : /*#__PURE__*/React.createElement(Eye, {
    className: "w-5 h-5"
  }))), errors.confirmPassword && /*#__PURE__*/React.createElement("p", {
    className: "text-red-500 text-sm"
  }, errors.confirmPassword)), /*#__PURE__*/React.createElement("label", {
    className: "flex items-start gap-2 cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "w-4 h-4 rounded border-border accent-primary mt-1",
    required: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-muted-foreground"
  }, "I agree to the", " ", /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "text-primary hover:text-primary/80 font-medium transition-colors"
  }, "Terms & Conditions"), " ", "and", " ", /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "text-primary hover:text-primary/80 font-medium transition-colors"
  }, "Privacy Policy"))), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isLoading,
    className: "w-full bg-gradient-accent hover:opacity-90 text-white font-semibold h-10 flex items-center justify-center gap-2"
  }, isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), "Creating account...") : /*#__PURE__*/React.createElement(React.Fragment, null, "Sign Up", /*#__PURE__*/React.createElement(ArrowRight, {
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
  }, "Already have an account?"))), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-sm text-muted-foreground"
  }, "Already signed up?", " ", /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate("/login"),
    className: "text-primary hover:text-primary/80 font-semibold transition-colors"
  }, "Sign in here")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, ["Access exclusive campus events", "Register for hackathons & competitions", "Track placement opportunities"].map((feature, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-center gap-3 text-sm text-muted-foreground"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-5 h-5 text-green-500 flex-shrink-0"
  }), feature)))));
};
export default Signup;