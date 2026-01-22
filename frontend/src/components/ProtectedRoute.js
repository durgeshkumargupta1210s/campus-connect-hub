import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, useClerk, SignIn } from "@clerk/clerk-react";
import { useUserRole } from '@/hooks/useUserRole';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProtectedRoute = ({
  children,
  requiredUserType
}) => {
  const { isSignedIn, isLoaded } = useUser();
  const { role: userRole, loading: roleLoading } = useUserRole();

  // Wait for Clerk to load and role to be fetched
  if (!isLoaded || roleLoading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
    }), /*#__PURE__*/React.createElement("p", {
      className: "mt-4 text-muted-foreground"
    }, "Loading...")));
  }

  // If not logged in, show sign in
  if (!isSignedIn) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
      className: "flex-1 bg-background flex items-center justify-center px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-md w-full"
    }, /*#__PURE__*/React.createElement(SignIn, {
      routing: "hash",
      signUpUrl: "/sign-up"
    }))), /*#__PURE__*/React.createElement(Footer, null));
  }

  // Check access based on required user type
  let hasAccess = true;
  
  if (requiredUserType === 'admin') {
    hasAccess = userRole === 'admin';
  }
  
  console.log('🔐 ProtectedRoute - Required:', requiredUserType, 'User Role:', userRole, 'Has Access:', hasAccess);

  // If user doesn't have access, show access denied
  if (!hasAccess) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
      className: "flex-1 bg-background flex items-center justify-center px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-md w-full text-center py-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center mb-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-red-500/20 p-4 rounded-lg"
    }, /*#__PURE__*/React.createElement(AlertCircle, {
      className: "w-12 h-12 text-red-500"
    }))), /*#__PURE__*/React.createElement("h1", {
      className: "text-3xl font-bold text-foreground mb-2"
    }, "Access Denied"), /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground mb-6"
    }, requiredUserType === 'admin' ? "This page is only accessible to administrators. Please contact support if you believe this is an error." : "This page is only accessible to registered users. Please log in with a regular account."), /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => window.location.href = '/',
      className: "w-full bg-primary hover:bg-primary/90"
    }, /*#__PURE__*/React.createElement(Home, {
      className: "w-4 h-4 mr-2"
    }), "Go to Home"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => window.location.href = '/login',
      variant: "outline",
      className: "w-full"
    }, "Switch Account")), /*#__PURE__*/React.createElement("div", {
      className: "mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-muted-foreground"
    }, "Current role: ", /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-foreground capitalize"
    }, userRole || 'None'))))), /*#__PURE__*/React.createElement(Footer, null));
  }

  // User has required permissions
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
export default ProtectedRoute;