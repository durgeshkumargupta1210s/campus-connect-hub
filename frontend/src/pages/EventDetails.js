import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Clock, Mail, Phone, CheckCircle, AlertCircle, Plus, Trash2, CreditCard } from 'lucide-react';
import { useRegistrations } from '@/hooks/useRegistrations';
import { useGroupRegistrations } from '@/hooks/useGroupRegistrations';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { APIClient, API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/hooks/use-toast';
import React from "react";
const EventDetails = () => {
  const {
    eventId
  } = useParams();
  const navigate = useNavigate();
  const {
    isLoggedIn,
    userEmail,
    userName
  } = useAuth();
  const {
    toast
  } = useToast();
  const [event, setEvent] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load event from backend API
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

        // Try to fetch from backend API first
        const backendEvent = await APIClient.get(API_ENDPOINTS.EVENTS_GET(eventId));

        // Map backend category to frontend category format
        const categoryMapping = {
          "hackathon": "Hackathon",
          "workshop": "Workshop",
          "technical": "Placement",
          "seminar": "Seminar",
          "cultural": "Fest",
          "sports": "Competition",
          "other": "Technical"
        };

        // Map backend payment methods to frontend format
        const paymentMethodMapping = {
          'credit_card': 'card',
          'debit_card': 'card',
          'upi': 'upi',
          'net_banking': 'netbanking',
          'wallet': 'upi'
        };

        // Convert backend format to frontend format
        const convertedEvent = {
          id: backendEvent._id || backendEvent.id,
          title: backendEvent.title,
          date: backendEvent.date ? new Date(backendEvent.date).toLocaleDateString() : '',
          time: backendEvent.time,
          location: backendEvent.location,
          description: backendEvent.description,
          category: categoryMapping[backendEvent.category?.toLowerCase()] || backendEvent.category || 'Technical',
          duration: backendEvent.duration,
          status: backendEvent.status || 'upcoming',
          capacity: backendEvent.capacity,
          tags: backendEvent.tags || [],
          participants: backendEvent.registeredCount || 0,
          difficulty: 'All Levels',
          prize: '₹0',
          registrationFee: '',
          organizer: backendEvent.organizer?.name || backendEvent.organizer || '',
          contactEmail: '',
          contactPhone: '',
          // Payment fields
          isPaid: backendEvent.isPaid || false,
          price: backendEvent.price || 0,
          paymentMethods: backendEvent.paymentMethods?.map(m => paymentMethodMapping[m] || m) || [],
          paymentDeadline: backendEvent.paymentDeadline
        };

        // Add imageUrl if it exists (for poster display)
        if (backendEvent.imageUrl) {
          convertedEvent.imageUrl = backendEvent.imageUrl;
          console.log('Event imageUrl found:', backendEvent.imageUrl.substring(0, 50) + '...');
        } else {
          console.log('No imageUrl in backend event');
        }
        console.log('Converted event:', convertedEvent);
        console.log('Event isPaid:', convertedEvent.isPaid, 'price:', convertedEvent.price);
        setEvent(convertedEvent);
      } catch (err) {
        console.error('Error loading event from backend:', err);
        setError('Event not found');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);
  const {
    register,
    isRegistered
  } = useRegistrations(eventId);
  const {
    registerTeam,
    isTeamRegistered
  } = useGroupRegistrations(eventId);

  // Individual registration form
  const [formData, setFormData] = useState({
    fullName: userName || '',
    email: userEmail || '',
    phone: ''
  });

  // Group registration form
  const [groupFormData, setGroupFormData] = useState({
    teamName: '',
    teamLeaderName: userName || '',
    teamLeaderEmail: userEmail || '',
    teamLeaderPhone: '',
    teamMembers: [{
      name: '',
      email: '',
      phone: ''
    }]
  });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationType, setRegistrationType] = useState('individual');
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
      className: "flex-1 bg-background"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mx-auto py-12 px-4 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground"
    }, "Loading event details..."))), /*#__PURE__*/React.createElement(Footer, null));
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
    }, "Event Not Found"), /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground mb-4"
    }, error || 'The event you are looking for does not exist.'), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate(-1),
      className: "bg-primary hover:bg-primary/90"
    }, "Go Back"))), /*#__PURE__*/React.createElement(Footer, null));
  }

  // Registration count comes from event.participants (from backend)
  const registrationCount = event.participants || 0;
  const userAlreadyRegistered = eventId ? isRegistered(userEmail || '') : false;
  const teamAlreadyRegistered = eventId ? isTeamRegistered(userEmail || '') : false;
  const isGroupEvent = event.category === 'Hackathon'; // Hackathons support group registration

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
  const handleGroupInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setGroupFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleTeamMemberChange = (index, field, value) => {
    setGroupFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => i === index ? {
        ...member,
        [field]: value
      } : member)
    }));
  };
  const addTeamMember = () => {
    setGroupFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, {
        name: '',
        email: '',
        phone: ''
      }]
    }));
  };
  const removeTeamMember = index => {
    setGroupFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };
  const handleIndividualSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    if (!formData.fullName || !formData.email || !formData.phone) {
      setMessage({
        type: 'error',
        text: 'Please fill all fields'
      });
      setIsSubmitting(false);
      return;
    }
    try {
      const result = register({
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category,
        userName: formData.fullName,
        userEmail: formData.email,
        userPhone: formData.phone
      });
      if (result.success) {
        setMessage({
          type: 'success',
          text: '✓ Registration successful! Check your email for confirmation.'
        });
        setFormData({
          fullName: '',
          email: '',
          phone: ''
        });

        // Refresh registration count
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Registration failed'
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Registration failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGroupSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    if (!groupFormData.teamName || !groupFormData.teamLeaderName || !groupFormData.teamLeaderEmail || !groupFormData.teamLeaderPhone) {
      setMessage({
        type: 'error',
        text: 'Please fill all team leader fields'
      });
      setIsSubmitting(false);
      return;
    }
    const validMembers = groupFormData.teamMembers.filter(m => m.name && m.email && m.phone);
    if (validMembers.length === 0) {
      setMessage({
        type: 'error',
        text: 'Please add at least one team member'
      });
      setIsSubmitting(false);
      return;
    }
    try {
      const result = registerTeam({
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category,
        teamName: groupFormData.teamName,
        teamLeaderName: groupFormData.teamLeaderName,
        teamLeaderEmail: groupFormData.teamLeaderEmail,
        teamLeaderPhone: groupFormData.teamLeaderPhone,
        teamMembers: validMembers
      });
      if (result.success) {
        setMessage({
          type: 'success',
          text: `✓ Team registration successful! ${groupFormData.teamName} with ${validMembers.length + 1} members registered.`
        });
        setGroupFormData({
          teamName: '',
          teamLeaderName: userName || '',
          teamLeaderEmail: userEmail || '',
          teamLeaderPhone: '',
          teamMembers: [{
            name: '',
            email: '',
            phone: ''
          }]
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Team registration failed'
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Team registration failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 bg-background"
  }, event.imageUrl && /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-64 md:h-96 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: event.imageUrl,
    alt: event.title,
    className: "w-full h-full object-cover",
    onError: e => {
      console.error('Image failed to load:', event.imageUrl);
      e.target.style.display = 'none';
    },
    onLoad: () => {
      console.log('Poster image loaded successfully');
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 right-0 p-6 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent/20 text-accent"
  }, event.status), event.difficulty && /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "bg-white/20 text-white border-white/30"
  }, event.difficulty)), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl md:text-5xl font-bold text-white mb-2"
  }, event.title), /*#__PURE__*/React.createElement("p", {
    className: "text-white/90 text-lg line-clamp-2"
  }, event.description))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(-1),
    className: "absolute top-4 left-4 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-5 h-5"
  }), "Back")), !event.imageUrl && /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-hero py-8 px-4 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(-1),
    className: "flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-5 h-5"
  }), "Back"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent/20 text-accent"
  }, event.status), event.difficulty && /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, event.difficulty)), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-white mb-2"
  }, event.title), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-lg"
  }, event.description))), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-6 h-6 text-primary mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Date"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.date))), event.duration && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-6 h-6 text-accent mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Duration"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.duration))), event.isPaid ? /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/50"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-6 h-6 text-accent mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Fee"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-accent"
  }, "\u20B9", event.price))) : event.prize ? /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement(Trophy, {
    className: "w-6 h-6 text-primary mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Prize Pool"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.prize))) : null, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-accent mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Registered"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.participants || 0, "+")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "About This Event")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-foreground/90"
  }, event.description), event.isPaid && event.paymentDeadline && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Payment Deadline"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, new Date(event.paymentDeadline).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })))), event.location && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Location"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.location))), event.capacity && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Capacity"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.capacity, " Seats"))), event.registrationFee && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Registration Fee"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.registrationFee)))), event.tags && event.tags.length > 0 && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Topics Covered")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, event.tags.map((tag, i) => /*#__PURE__*/React.createElement(Badge, {
    key: i,
    variant: "secondary",
    className: "text-sm"
  }, tag))))), event.category === "Hackathon" && (event.problemStatements || event.judgesCriteria) && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/30"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Hackathon Details")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, event.problemStatements && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground font-semibold mb-2"
  }, "Problem Statements"), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground whitespace-pre-wrap"
  }, event.problemStatements)), event.judgesCriteria && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground font-semibold mb-2"
  }, "Judging Criteria"), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground whitespace-pre-wrap"
  }, event.judgesCriteria)))), event.category === "Workshop" && (event.mentor || event.prerequisites || event.materials) && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/30"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Workshop Details")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, event.mentor && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Instructor/Mentor"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.mentor)), event.prerequisites && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground font-semibold mb-2"
  }, "Prerequisites"), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground whitespace-pre-wrap"
  }, event.prerequisites)), event.materials && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground font-semibold mb-2"
  }, "Materials Provided"), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground whitespace-pre-wrap"
  }, event.materials)))), event.category === "Placement" && (event.company || event.ctc || event.jobProfile) && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/30"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Placement Details")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, event.company && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Company"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-lg"
  }, event.company)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, event.ctc && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "CTC Package"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-accent"
  }, event.ctc)), event.positions && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Positions Available"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.positions)), event.jobProfile && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Job Profile"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.jobProfile))), event.eligibility && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground font-semibold mb-2"
  }, "Eligibility Criteria"), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground whitespace-pre-wrap"
  }, event.eligibility)))), (event.organizer || event.contactEmail) && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Contact Information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, event.organizer && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mb-1"
  }, "Organizer"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.organizer)), event.contactEmail && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Email"), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${event.contactEmail}`,
    className: "font-semibold text-primary hover:underline"
  }, event.contactEmail))), event.contactPhone && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Phone"), /*#__PURE__*/React.createElement("a", {
    href: `tel:${event.contactPhone}`,
    className: "font-semibold text-foreground hover:text-primary"
  }, event.contactPhone)))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border sticky top-20"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Register Now"), /*#__PURE__*/React.createElement(CardDescription, null, "Join ", event.participants || 0, "+ participants"), event.isPaid && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-4 h-4 text-accent"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-accent"
  }, "Paid Event \u2022 \u20B9", event.price))), /*#__PURE__*/React.createElement(CardContent, null, event.isPaid ?
  /*#__PURE__*/
  // Paid Event - Show Payment Button
  React.createElement(Button, {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      if (!eventId) {
        console.error('Event ID is missing');
        toast({
          title: "Error",
          description: "Event ID is missing. Please try again.",
          variant: "destructive"
        });
        return;
      }
      if (!isLoggedIn) {
        toast({
          title: "Login Required",
          description: "Please login to proceed with payment.",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }
      console.log('Navigating to checkout for event:', eventId);
      navigate(`/event/${eventId}/checkout`, {
        replace: false
      });
    },
    disabled: userAlreadyRegistered,
    className: "w-full bg-gradient-accent hover:opacity-90 text-white mb-2",
    size: "lg"
  }, /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-4 h-4 mr-2"
  }), !isLoggedIn ? 'Login to Pay' : userAlreadyRegistered ? 'Already Registered' : 'Proceed to Payment') : /*#__PURE__*/React.createElement(React.Fragment, null, isGroupEvent && /*#__PURE__*/React.createElement(Tabs, {
    value: registrationType,
    onValueChange: value => setRegistrationType(value),
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-2"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "individual"
  }, "Individual"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "group"
  }, "Team"))), registrationType === 'individual' ?
  /*#__PURE__*/
  // Individual Registration Form
  React.createElement("form", {
    onSubmit: handleIndividualSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
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
  }, "Email *"), /*#__PURE__*/React.createElement(Input, {
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
  })), message && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`
  }, message.type === 'success' ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }) : /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, message.text)), userAlreadyRegistered && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 p-3 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "You are already registered!")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isSubmitting || userAlreadyRegistered,
    className: "w-full bg-gradient-accent hover:opacity-90 text-white"
  }, isSubmitting ? 'Registering...' : userAlreadyRegistered ? 'Already Registered' : 'Register Now'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground text-center"
  }, "You will receive a confirmation email after registration.")) :
  /*#__PURE__*/
  // Group Registration Form
  React.createElement("form", {
    onSubmit: handleGroupSubmit,
    className: "space-y-4 max-h-96 overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 border-b border-border pb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground"
  }, "Team Information"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground text-sm mb-1 block"
  }, "Team Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "teamName",
    value: groupFormData.teamName,
    onChange: handleGroupInputChange,
    placeholder: "e.g., Tech Titans",
    className: "bg-background border-border text-sm",
    required: true,
    disabled: isSubmitting
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 border-b border-border pb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground"
  }, "Team Leader"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground text-sm mb-1 block"
  }, "Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "teamLeaderName",
    value: groupFormData.teamLeaderName,
    onChange: handleGroupInputChange,
    placeholder: "Leader name",
    className: "bg-background border-border text-sm",
    required: true,
    disabled: isSubmitting
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground text-sm mb-1 block"
  }, "Email *"), /*#__PURE__*/React.createElement(Input, {
    name: "teamLeaderEmail",
    type: "email",
    value: groupFormData.teamLeaderEmail,
    onChange: handleGroupInputChange,
    placeholder: "leader@email.com",
    className: "bg-background border-border text-sm",
    required: true,
    disabled: isSubmitting
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground text-sm mb-1 block"
  }, "Phone *"), /*#__PURE__*/React.createElement(Input, {
    name: "teamLeaderPhone",
    value: groupFormData.teamLeaderPhone,
    onChange: handleGroupInputChange,
    placeholder: "+91 XXXXX XXXXX",
    className: "bg-background border-border text-sm",
    required: true,
    disabled: isSubmitting
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-foreground"
  }, "Team Members"), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: addTeamMember,
    size: "sm",
    variant: "outline",
    className: "h-7 gap-1"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-3 h-3"
  }), "Add Member")), groupFormData.teamMembers.map((member, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "p-3 bg-secondary rounded-lg space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-muted-foreground"
  }, "Member ", index + 1), groupFormData.teamMembers.length > 1 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeTeamMember(index),
    className: "p-1 hover:bg-red-500/20 rounded transition-colors",
    title: "Remove member",
    "aria-label": "Remove team member"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-3 h-3 text-red-500"
  }))), /*#__PURE__*/React.createElement(Input, {
    value: member.name,
    onChange: e => handleTeamMemberChange(index, 'name', e.target.value),
    placeholder: "Name",
    className: "bg-background border-border text-sm"
  }), /*#__PURE__*/React.createElement(Input, {
    type: "email",
    value: member.email,
    onChange: e => handleTeamMemberChange(index, 'email', e.target.value),
    placeholder: "Email",
    className: "bg-background border-border text-sm"
  }), /*#__PURE__*/React.createElement(Input, {
    value: member.phone,
    onChange: e => handleTeamMemberChange(index, 'phone', e.target.value),
    placeholder: "Phone",
    className: "bg-background border-border text-sm"
  })))), message && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`
  }, message.type === 'success' ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }) : /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, message.text)), teamAlreadyRegistered && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 p-3 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, "Your team is already registered!")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isSubmitting || teamAlreadyRegistered,
    className: "w-full bg-gradient-accent hover:opacity-90 text-white"
  }, isSubmitting ? 'Registering Team...' : teamAlreadyRegistered ? 'Already Registered' : 'Register Team'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground text-center"
  }, "Team leader will receive confirmation email."))))))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default EventDetails;