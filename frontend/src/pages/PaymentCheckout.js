import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CheckCircle, AlertCircle, CreditCard, Smartphone, Landmark, Loader2 } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';
import { useAuth } from '@/context/AuthContext';
import { APIClient, API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/hooks/use-toast';
import React from "react";
const PaymentCheckout = () => {
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const {
    userEmail,
    userName,
    isLoggedIn
  } = useAuth();
  const {
    createPayment
  } = usePayments();
  const {
    toast
  } = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: userName || '',
    email: userEmail || '',
    phone: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Load event from backend
  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) {
        setError('Event ID is missing');
        setLoading(false);
        return;
      }
      if (!isLoggedIn) {
        setError('Please login to make a payment');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const backendEvent = await APIClient.get(API_ENDPOINTS.EVENTS_GET(eventId));

        // Map backend payment methods to frontend format
        const paymentMethodMapping = {
          'credit_card': 'card',
          'debit_card': 'card',
          'upi': 'upi',
          'net_banking': 'netbanking',
          'wallet': 'upi'
        };
        const mappedEvent = {
          id: backendEvent._id || backendEvent.id,
          title: backendEvent.title,
          date: backendEvent.date ? new Date(backendEvent.date).toLocaleDateString() : 'N/A',
          location: backendEvent.location,
          isPaid: backendEvent.isPaid || false,
          price: backendEvent.price || 0,
          paymentMethods: backendEvent.paymentMethods?.map(m => paymentMethodMapping[m] || m) || ['card', 'upi', 'netbanking'],
          paymentDeadline: backendEvent.paymentDeadline,
          category: backendEvent.category
        };
        if (!mappedEvent.isPaid) {
          setError('This event is not a paid event');
          setLoading(false);
          return;
        }
        setEvent(mappedEvent);
      } catch (err) {
        console.error('Error loading event:', err);
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId, isLoggedIn]);
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
    }, "Loading payment page..."))), /*#__PURE__*/React.createElement(Footer, null));
  }
  if (error || !event || !event.isPaid) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
      className: "flex-1 bg-background"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto py-12 px-4 text-center"
    }, /*#__PURE__*/React.createElement(AlertCircle, {
      className: "w-12 h-12 mx-auto mb-4 text-red-500"
    }), /*#__PURE__*/React.createElement("h1", {
      className: "text-2xl font-bold text-foreground mb-4"
    }, error || 'Event Not Found or Not Available for Payment'), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate(-1),
      className: "bg-primary hover:bg-primary/90"
    }, "Go Back"))), /*#__PURE__*/React.createElement(Footer, null));
  }
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePaymentSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setMessage({
        type: 'error',
        text: 'Please fill all fields'
      });
      setIsSubmitting(false);
      return;
    }
    if (!selectedPaymentMethod) {
      setMessage({
        type: 'error',
        text: 'Please select a payment method'
      });
      setIsSubmitting(false);
      return;
    }
    if (!event.paymentMethods?.includes(selectedPaymentMethod)) {
      setMessage({
        type: 'error',
        text: 'Selected payment method is not available for this event'
      });
      setIsSubmitting(false);
      return;
    }
    try {
      // Map frontend payment method to backend format
      const paymentMethodMapping = {
        'card': 'credit_card',
        'upi': 'upi',
        'netbanking': 'net_banking'
      };
      const backendPaymentMethod = paymentMethodMapping[selectedPaymentMethod] || 'credit_card';

      // Create payment record via backend API
      const paymentData = {
        amount: event.price,
        paymentMethod: backendPaymentMethod,
        description: `Payment for ${event.title}`,
        relatedTo: 'ticket',
        relatedId: event.id
      };
      const paymentResponse = await APIClient.post(API_ENDPOINTS.PAYMENTS_CREATE, paymentData);
      const payment = paymentResponse.payment || paymentResponse;
      if (!payment || !payment._id) {
        setMessage({
          type: 'error',
          text: 'Payment creation failed'
        });
        setIsSubmitting(false);
        return;
      }

      // Complete the payment (simulated - in production, this would be done by payment gateway)
      const completeResponse = await APIClient.put(API_ENDPOINTS.PAYMENTS_COMPLETE(payment._id), {
        transactionId: payment.transactionId || `TXN-${Date.now()}`
      });

      // Create registration record via backend API
      // The backend will automatically send confirmation email
      try {
        await APIClient.post(API_ENDPOINTS.REGISTRATIONS_CREATE, {
          eventId: event.id
        });
      } catch (regErr) {
        console.warn('Registration creation failed:', regErr);
        // Continue anyway - payment succeeded and email will be sent
      }
      toast({
        title: "Payment Successful!",
        description: `Payment of ₹${event.price} completed. Check your email for confirmation.`
      });
      setMessage({
        type: 'success',
        text: `✓ Payment of ₹${event.price} successful! Redirecting...`
      });

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate(`/event/${eventId}/payment-success`, {
          state: {
            transactionId: payment.transactionId,
            eventId,
            eventTitle: event.title,
            amount: event.price,
            paymentMethod: selectedPaymentMethod,
            paymentId: payment._id
          }
        });
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      const errorMsg = err.message || 'Payment processing failed';
      setMessage({
        type: 'error',
        text: errorMsg
      });
      toast({
        title: "Payment Failed",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const getPaymentMethodIcon = method => {
    switch (method) {
      case 'card':
        return /*#__PURE__*/React.createElement(CreditCard, {
          className: "w-5 h-5"
        });
      case 'upi':
        return /*#__PURE__*/React.createElement(Smartphone, {
          className: "w-5 h-5"
        });
      case 'netbanking':
        return /*#__PURE__*/React.createElement(Landmark, {
          className: "w-5 h-5"
        });
      default:
        return null;
    }
  };
  const getPaymentMethodLabel = method => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'upi':
        return 'UPI (Google Pay, PhonePe)';
      case 'netbanking':
        return 'Net Banking';
      default:
        return method;
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
  }, "Complete Your Payment"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-lg"
  }, "Secure payment for ", event.title)))), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border sticky top-20"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Order Summary")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Event"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.title)), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-border pt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-foreground"
  }, "Event Fee"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-foreground"
  }, "\u20B9", event.price)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-foreground"
  }, "Processing Fee"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-foreground"
  }, "\u20B90")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center border-t border-border pt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-foreground"
  }, "Total Amount"), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold text-accent"
  }, "\u20B9", event.price))), event.paymentDeadline && /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-accent/10 rounded-lg border border-accent/20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mb-1"
  }, "Payment Deadline"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-sm"
  }, new Date(event.paymentDeadline).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-green-500/10 rounded-lg border border-green-500/20 flex gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600 dark:text-green-400 font-semibold"
  }, "Secure Payment"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600/80 dark:text-green-400/80"
  }, "Your payment is encrypted and secure")))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Payment Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Enter your information to complete the payment")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handlePaymentSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground text-lg"
  }, "Personal Information"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Full Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "fullName",
    value: formData.fullName,
    onChange: handleInputChange,
    placeholder: "Your name",
    className: "bg-background border-border",
    required: true,
    disabled: isSubmitting
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Email Address *"), /*#__PURE__*/React.createElement(Input, {
    name: "email",
    type: "email",
    value: formData.email,
    onChange: handleInputChange,
    placeholder: "your@email.com",
    className: "bg-background border-border",
    required: true,
    disabled: isSubmitting
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Phone Number *"), /*#__PURE__*/React.createElement(Input, {
    name: "phone",
    value: formData.phone,
    onChange: handleInputChange,
    placeholder: "+91 XXXXX XXXXX",
    className: "bg-background border-border",
    required: true,
    disabled: isSubmitting
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 border-t border-border pt-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground text-lg"
  }, "Payment Method"), event.paymentMethods && event.paymentMethods.length > 0 ? /*#__PURE__*/React.createElement(RadioGroup, {
    value: selectedPaymentMethod,
    onValueChange: setSelectedPaymentMethod
  }, event.paymentMethods.map(method => /*#__PURE__*/React.createElement("div", {
    key: method,
    className: "flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-accent/50 cursor-pointer transition-all",
    onClick: () => setSelectedPaymentMethod(method)
  }, /*#__PURE__*/React.createElement(RadioGroupItem, {
    value: method,
    id: method
  }), /*#__PURE__*/React.createElement(Label, {
    htmlFor: method,
    className: "flex-1 cursor-pointer flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-foreground/60"
  }, getPaymentMethodIcon(method)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, getPaymentMethodLabel(method)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, method === 'card' && 'Visa, Mastercard, American Express', method === 'upi' && 'Instant transfer from your bank account', method === 'netbanking' && 'Direct transfer from your bank')))))) : /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold"
  }, "No payment methods available"))), message && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`
  }, message.type === 'success' ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }) : /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, message.text)), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isSubmitting || !selectedPaymentMethod,
    className: "w-full bg-gradient-accent hover:opacity-90 text-white h-12 text-base"
  }, isSubmitting ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Loader2, {
    className: "w-4 h-4 mr-2 animate-spin"
  }), "Processing Payment...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-4 h-4 mr-2"
  }), "Pay \u20B9", event.price)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground text-center"
  }, "By clicking \"Pay\", you agree to our payment terms. Your payment is 100% secure.")))))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default PaymentCheckout;