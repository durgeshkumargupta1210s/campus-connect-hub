import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import React from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isLoggedIn,
    userType,
    userName,
    logout
  } = useAuth();
  const navItems = [{
    name: "Home",
    path: "/"
  }, {
    name: "Events",
    path: "/events"
  }, {
    name: "Workshops",
    path: "/workshops"
  }, {
    name: "Placements",
    path: "/placements"
  }, {
    name: "Community",
    path: "/community"
  }, {
    name: "Resources",
    path: "/resources"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center h-16"
  }, /*#__PURE__*/React.createElement(NavLink, {
    to: "/",
    className: "text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent"
  }, "CampusConnect"), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-6"
  }, navItems.map(item => /*#__PURE__*/React.createElement(NavLink, {
    key: item.path,
    to: item.path,
    className: "text-foreground/70 hover:text-primary transition-colors",
    activeClassName: "text-primary font-semibold"
  }, item.name))), isLoggedIn ? /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-4 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsProfileOpen(!isProfileOpen),
    className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-bold"
  }, userName?.charAt(0).toUpperCase() || "U"), /*#__PURE__*/React.createElement("span", null, userName?.split(" ")[0] || "User")), isProfileOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-border rounded-lg shadow-lg z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 border-b border-border text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, userName), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground capitalize"
  }, userType)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsProfileOpen(false);
      navigate(userType === "admin" ? "/admin" : "/user");
    },
    className: "w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 text-foreground transition-colors"
  }, /*#__PURE__*/React.createElement(LayoutDashboard, {
    className: "w-4 h-4"
  }), "My Dashboard"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsProfileOpen(false);
      logout();
      navigate("/");
    },
    className: "w-full text-left px-4 py-2 hover:bg-secondary text-red-600 hover:text-red-700 flex items-center gap-2 transition-colors"
  }, /*#__PURE__*/React.createElement(LogOut, {
    className: "w-4 h-4"
  }), "Logout")))) : /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => navigate("/login"),
    className: "border-primary text-primary hover:bg-primary/10"
  }, "Login"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/signup"),
    className: "bg-gradient-accent hover:opacity-90 text-white"
  }, "Sign Up")), /*#__PURE__*/React.createElement("button", {
    className: "lg:hidden",
    onClick: () => setIsOpen(!isOpen),
    "aria-label": "Toggle menu"
  }, isOpen ? /*#__PURE__*/React.createElement(X, {
    className: "w-6 h-6"
  }) : /*#__PURE__*/React.createElement(Menu, {
    className: "w-6 h-6"
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "lg:hidden py-4 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4"
  }, navItems.map(item => /*#__PURE__*/React.createElement(NavLink, {
    key: item.path,
    to: item.path,
    className: "text-foreground/70 hover:text-primary transition-colors py-2",
    activeClassName: "text-primary font-semibold",
    onClick: () => setIsOpen(false)
  }, item.name)), isLoggedIn ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 pt-2 border-t border-border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "py-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, userName), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground capitalize"
  }, userType)), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      navigate(userType === "admin" ? "/admin" : "/user");
      setIsOpen(false);
    },
    className: "w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
  }, /*#__PURE__*/React.createElement(LayoutDashboard, {
    className: "w-4 h-4"
  }), "My Dashboard"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      logout();
      navigate("/");
      setIsOpen(false);
    },
    variant: "outline",
    className: "w-full justify-start gap-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
  }, /*#__PURE__*/React.createElement(LogOut, {
    className: "w-4 h-4"
  }), "Logout")) : /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 pt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      navigate("/login");
      setIsOpen(false);
    },
    className: "flex-1 border-primary text-primary hover:bg-primary/10"
  }, "Login"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      navigate("/signup");
      setIsOpen(false);
    },
    className: "flex-1 bg-gradient-accent hover:opacity-90 text-white"
  }, "Sign Up"))))));
};
export default Navbar;