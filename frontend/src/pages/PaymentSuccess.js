import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Home, FileText, CreditCard, Calendar, Ticket, Loader2 } from 'lucide-react';
import { APIClient, API_ENDPOINTS } from '@/config/api';
import React from "react";
const PaymentSuccess = () => {
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const state = location.state;

  // Load event from backend
  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) {
        setError('Event ID is missing');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const backendEvent = await APIClient.get(API_ENDPOINTS.EVENTS_GET(eventId));
        const categoryMapping = {
          "hackathon": "Hackathon",
          "workshop": "Workshop",
          "technical": "Placement",
          "seminar": "Seminar",
          "cultural": "Fest",
          "sports": "Competition",
          "other": "Technical"
        };
        const mappedEvent = {
          id: backendEvent._id || backendEvent.id,
          title: backendEvent.title,
          date: backendEvent.date ? new Date(backendEvent.date).toLocaleDateString() : 'N/A',
          location: backendEvent.location,
          category: categoryMapping[backendEvent.category?.toLowerCase()] || backendEvent.category || 'Technical'
        };
        setEvent(mappedEvent);
      } catch (err) {
        console.error('Error loading event:', err);
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
      className: "flex-1 bg-background flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement(Loader2, {
      className: "w-8 h-8 animate-spin mx-auto mb-4 text-primary"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground"
    }, "Loading payment confirmation..."))), /*#__PURE__*/React.createElement(Footer, null));
  }
  if (error || !event) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
      className: "flex-1 bg-background"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto py-12 px-4 text-center"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "text-2xl font-bold text-foreground mb-4"
    }, error || 'Event Not Found'), /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground mb-6"
    }, error || 'The event associated with this payment could not be found.'), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate('/'),
      className: "bg-primary hover:bg-primary/90"
    }, "Back to Home"))), /*#__PURE__*/React.createElement(Footer, null));
  }

  // If no state but we have event, show success page with available data
  if (!state) {
    // Allow showing success page even without state (e.g., direct URL access)
    // Use defaults for missing payment info
  }
  const getPaymentMethodLabel = method => {
    const methodMap = {
      'card': 'Credit/Debit Card',
      'upi': 'UPI',
      'netbanking': 'Net Banking'
    };
    return methodMap[method] || method;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-green-500/20 to-green-600/20 border-b border-green-500/30 py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-green-500/20 rounded-full animate-pulse"
  }), /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-24 h-24 text-green-500 relative"
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-white mb-2"
  }, "Payment Successful!"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-lg"
  }, "Your registration is confirmed"))), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-green-500/20 rounded-lg"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 text-green-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Confirmation Details")))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 border-b border-border pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground text-lg"
  }, "Payment Information"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Transaction ID"), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-foreground font-semibold"
  }, state?.transactionId || state?.paymentId || 'N/A')), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-green-500/20 text-green-600 dark:text-green-400"
  }, "Completed")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Payment Method"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, state?.paymentMethod ? getPaymentMethodLabel(state.paymentMethod) : 'N/A'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Amount Paid"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-lg"
  }, state?.amount ? `₹${state.amount}` : 'N/A'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mb-2"
  }, "Date & Time"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, new Date().toLocaleString('en-IN')))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 border-b border-border pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground text-lg"
  }, "Event Details"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Event Name"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-lg"
  }, event.title)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Event Date"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 text-accent"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.date))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Category"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "mt-1"
  }, event.category))), event.location && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Location"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.location))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 border-b border-border pb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground text-lg flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Ticket, {
    className: "w-5 h-5 text-accent"
  }), "Registration Confirmed"), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-foreground mb-2"
  }, "\u2713 Your registration for ", /*#__PURE__*/React.createElement("strong", null, event.title), " has been confirmed!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "A confirmation email has been sent to your registered email address with all the details.")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mb-1"
  }, "\uD83D\uDCCB Entry Instructions"), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-foreground/80 space-y-1"
  }, /*#__PURE__*/React.createElement("li", null, "\u2713 Check your email for the confirmation and ticket details"), /*#__PURE__*/React.createElement("li", null, "\u2713 Arrive 15 minutes before event start time"), /*#__PURE__*/React.createElement("li", null, "\u2713 Bring a valid ID for verification at the venue"), /*#__PURE__*/React.createElement("li", null, "\u2713 View your registration in \"My Registrations\"")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-foreground"
  }, "What's Next?"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-foreground/80"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-500 font-semibold"
  }, "1."), /*#__PURE__*/React.createElement("span", null, "A confirmation email with your ticket has been sent")), /*#__PURE__*/React.createElement("li", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-500 font-semibold"
  }, "2."), /*#__PURE__*/React.createElement("span", null, "Save or print your ticket - you'll need it at the venue")), /*#__PURE__*/React.createElement("li", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-500 font-semibold"
  }, "3."), /*#__PURE__*/React.createElement("span", null, "View all your tickets anytime in \"My Tickets\"")))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "flex-1",
    onClick: () => window.print()
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download Receipt"))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border sticky top-20 h-fit"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground text-base"
  }, "Quick Actions")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate('/my-tickets'),
    className: "w-full bg-gradient-accent hover:opacity-90 text-white",
    size: "lg"
  }, /*#__PURE__*/React.createElement(Ticket, {
    className: "w-4 h-4 mr-2"
  }), "View My Tickets"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate(`/event/${eventId}`),
    className: "w-full bg-gradient-accent hover:opacity-90 text-white",
    size: "lg"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-4 h-4 mr-2"
  }), "View Event Details"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate('/my-events'),
    variant: "outline",
    className: "w-full",
    size: "lg"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 mr-2"
  }), "My Registrations"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate('/'),
    variant: "outline",
    className: "w-full",
    size: "lg"
  }, /*#__PURE__*/React.createElement(Home, {
    className: "w-4 h-4 mr-2"
  }), "Back to Home"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border mt-4"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground text-base"
  }, "Need Help?")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "If you face any issues with your registration or payment, please contact our support team."), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground font-semibold"
  }, "\uD83D\uDCE7 support@campusconnecthub.com"))))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default PaymentSuccess;