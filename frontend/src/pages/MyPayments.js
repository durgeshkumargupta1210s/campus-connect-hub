import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, Search, Download, Calendar, AlertCircle } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';
import { useUser } from '@clerk/clerk-react';
import React from "react";
const MyPayments = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const {
    getPaymentsByUserId
  } = usePayments();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get user's payments
  const userPayments = userEmail ? getPaymentsByUserId(userEmail) : [];

  // Filter payments
  const filteredPayments = userPayments.filter(payment => {
    const matchesSearch = payment.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) || payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const completedPayments = userPayments.filter(p => p.status === 'completed');
  const totalSpent = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = userPayments.filter(p => p.status === 'pending');
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✕';
      default:
        return '•';
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-hero py-8 px-4 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(-1),
    className: "flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-5 h-5"
  }), "Back"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-white mb-2"
  }, "My Payments"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-lg"
  }, "Manage and track your event registrations")))), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Total Paid"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-foreground"
  }, "\u20B9", totalSpent.toLocaleString('en-IN'))), /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-8 h-8 text-primary opacity-20"
  })))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Completed"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-green-600 dark:text-green-400"
  }, completedPayments.length)), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl"
  }, "\u2713")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Pending"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-yellow-600 dark:text-yellow-400"
  }, pendingPayments.length)), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl"
  }, "\u23F3"))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Payment History"), /*#__PURE__*/React.createElement(CardDescription, null, "View and manage all your event payments"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by event name or transaction ID...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "pl-10 bg-background border-border"
  })), /*#__PURE__*/React.createElement(Tabs, {
    value: filterStatus,
    onValueChange: value => setFilterStatus(value),
    className: "w-full md:w-auto"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-4"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "all"
  }, "All"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "completed"
  }, "Completed"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "pending"
  }, "Pending"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "failed"
  }, "Failed"))))), /*#__PURE__*/React.createElement(CardContent, null, filteredPayments.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, filteredPayments.map(payment => /*#__PURE__*/React.createElement("div", {
    key: payment.id,
    className: "flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 mb-4 md:mb-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-primary/10 rounded-lg"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-5 h-5 text-primary"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, payment.eventTitle), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4"
  }), new Date(payment.paymentDate).toLocaleDateString('en-IN')), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, "TXN: ", payment.transactionId), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, payment.paymentMethod))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-foreground"
  }, "\u20B9", payment.amount.toLocaleString('en-IN')), /*#__PURE__*/React.createElement(Badge, {
    className: getStatusColor(payment.status)
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1"
  }, getStatusIcon(payment.status)), payment.status.charAt(0).toUpperCase() + payment.status.slice(1))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => window.print(),
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4"
  }), "Receipt"))))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12"
  }, userPayments.length === 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-lg mb-4"
  }, "No payments yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-sm mb-6"
  }, "Register for paid events to see your payment history here"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate('/events'),
    className: "bg-gradient-accent hover:opacity-90 text-white"
  }, "Browse Events")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-lg"
  }, "No payments match your search"))))), userPayments.length > 0 && /*#__PURE__*/React.createElement(Card, {
    className: "bg-blue-500/10 border-blue-500/20 mt-8"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Need Help?")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-foreground/80 mb-4"
  }, "If you have questions about your payments or need to make changes, our support team is here to help."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "text-blue-600 dark:text-blue-400 border-blue-500/30"
  }, "Contact Support"))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default MyPayments;