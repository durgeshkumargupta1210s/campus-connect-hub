import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { useEventNotifications } from "@/hooks/useEventNotifications";
import { useEvents } from "@/hooks/useEvents";
import { APIClient, API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import React from "react";
const AddEventPage = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const isEditMode = !!id;
  const {
    notifyNewEvent
  } = useEventNotifications();
  const {
    addEvent,
    refreshEvents
  } = useEvents();
  const {
    toast
  } = useToast();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    endTime: "",
    duration: "",
    location: "",
    description: "",
    category: "Technical",
    capacity: "",
    registrationFee: "",
    prize: "",
    difficulty: "All Levels",
    poster: null,
    posterBase64: null,
    tags: [],
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    // Payment fields
    isPaid: false,
    price: "",
    paymentDeadline: "",
    paymentMethods: ["card", "upi", "netbanking"],
    // Hackathon specific
    problemStatements: "",
    judgesCriteria: "",
    // Placement specific
    company: "",
    ctc: "",
    positions: "",
    eligibility: "",
    jobProfile: "",
    // Workshop specific
    mentor: "",
    materials: "",
    prerequisites: ""
  });
  const [tagInput, setTagInput] = useState("");

  // Load event data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const loadEvent = async () => {
        try {
          setLoading(true);
          const event = await APIClient.get(API_ENDPOINTS.EVENTS_GET(id));

          // Map backend category to frontend category
          const categoryReverseMapping = {
            "hackathon": "Hackathon",
            "workshop": "Workshop",
            "technical": "Placement",
            "seminar": "Seminar",
            "cultural": "Fest",
            "sports": "Competition"
          };

          // Format date for input (YYYY-MM-DD)
          const eventDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
          setFormData({
            eventName: event.title || "",
            date: eventDate,
            time: event.time || "",
            endTime: "",
            duration: event.duration || "",
            location: event.location || "",
            description: event.description || "",
            category: categoryReverseMapping[event.category] || event.category || "Technical",
            capacity: event.capacity?.toString() || "",
            registrationFee: "",
            prize: "",
            difficulty: "All Levels",
            poster: null,
            tags: event.tags || [],
            organizer: "",
            contactEmail: "",
            contactPhone: "",
            isPaid: event.isPaid || false,
            price: event.price?.toString() || "",
            paymentDeadline: event.paymentDeadline ? new Date(event.paymentDeadline).toISOString().split('T')[0] : "",
            paymentMethods: event.paymentMethods?.map(m => {
              // Map backend payment methods to frontend format
              const mapping = {
                'credit_card': 'card',
                'debit_card': 'card',
                'upi': 'upi',
                'net_banking': 'netbanking',
                'wallet': 'upi'
              };
              return mapping[m] || m;
            }) || ["card", "upi", "netbanking"],
            problemStatements: "",
            judgesCriteria: "",
            company: "",
            ctc: "",
            positions: "",
            eligibility: "",
            jobProfile: "",
            mentor: "",
            materials: "",
            prerequisites: ""
          });
        } catch (error) {
          console.error('Error loading event:', error);
          toast({
            title: "Error Loading Event",
            description: error.message || "Failed to load event data.",
            variant: "destructive"
          });
          navigate("/admin");
        } finally {
          setLoading(false);
        }
      };
      loadEvent();
    }
  }, [isEditMode, id, navigate, toast]);

  // All supported event categories
  const categories = [{
    name: "Hackathon",
    icon: "⚡",
    description: "Coding competition"
  }, {
    name: "Workshop",
    icon: "📚",
    description: "Learning session"
  }, {
    name: "Placement",
    icon: "💼",
    description: "Job opportunity"
  }, {
    name: "Seminar",
    icon: "🎤",
    description: "Knowledge sharing"
  }, {
    name: "Fest",
    icon: "🎉",
    description: "Cultural event"
  }, {
    name: "Talk",
    icon: "💬",
    description: "Speaker session"
  }, {
    name: "Competition",
    icon: "🏆",
    description: "Contest"
  }];
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
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };
  const handleRemoveTag = tag => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  const handleFileUpload = async e => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (PNG, JPG, GIF, etc.)",
          variant: "destructive"
        });
        return;
      }

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData(prev => ({
          ...prev,
          poster: file,
          posterBase64: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage("");

    // Build event data - convert category to lowercase for backend
    const categoryMapping = {
      "Hackathon": "hackathon",
      "Workshop": "workshop",
      "Placement": "technical",
      "Seminar": "seminar",
      "Fest": "cultural",
      "Talk": "seminar",
      "Competition": "technical",
      "Technical": "technical",
      "Cultural": "cultural",
      "Sports": "sports"
    };
    const eventData = {
      title: formData.eventName,
      description: formData.description,
      date: formData.date,
      // Send date string as-is, backend will parse it
      time: formData.time,
      duration: formData.duration,
      location: formData.location,
      category: categoryMapping[formData.category] || formData.category.toLowerCase(),
      capacity: parseInt(formData.capacity) || 0,
      tags: formData.tags,
      status: "upcoming",
      // Payment fields
      isPaid: formData.isPaid || false,
      price: formData.isPaid ? parseFloat(formData.price) || 0 : 0,
      paymentMethods: formData.isPaid ? formData.paymentMethods || [] : [],
      paymentDeadline: formData.isPaid && formData.paymentDeadline ? formData.paymentDeadline : undefined
      // Omit organizer - backend will set it from createdBy
      // Only include fields that backend schema supports
    };

    // Add imageUrl if poster is uploaded
    if (formData.posterBase64) {
      eventData.imageUrl = formData.posterBase64;
      console.log('Including imageUrl in event data (length:', formData.posterBase64.length, ')');
    } else {
      console.log('No posterBase64 found, imageUrl will not be included');
    }
    console.log('Event data being sent:', {
      ...eventData,
      imageUrl: eventData.imageUrl ? 'present (' + eventData.imageUrl.length + ' chars)' : 'missing'
    });
    try {
      let response;
      if (isEditMode && id) {
        // Update existing event
        response = await APIClient.put(API_ENDPOINTS.EVENTS_UPDATE(id), eventData);
        console.log("Event updated on backend:", response);
        toast({
          title: "Event Updated Successfully!",
          description: `${formData.eventName} has been updated.`
        });
        setSuccessMessage(`Event "${formData.eventName}" updated successfully!`);
      } else {
        // Create new event
        response = await APIClient.post(API_ENDPOINTS.EVENTS_CREATE, eventData);
        console.log("Event created on backend:", response);

        // Notify subscribers about the new event
        await notifyNewEvent({
          name: formData.eventName,
          date: formData.date,
          description: formData.description,
          category: formData.category
        });
        toast({
          title: "Event Created Successfully!",
          description: `${formData.eventName} has been created and is now live.`
        });
        setSuccessMessage(`Event "${formData.eventName}" created successfully!`);
      }

      // Refresh events from backend to ensure the changes are visible
      await refreshEvents();

      // Reset form and navigate after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/admin");
      }, 2000);
    } catch (error) {
      const errorMsg = error.message || "Failed to create event. Please try again.";
      setErrorMessage(errorMsg);
      console.error("Error creating event:", error);
      toast({
        title: "Error Creating Event",
        description: errorMsg,
        variant: "destructive"
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-hero py-6 px-4 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate("/admin"),
    className: "flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-5 h-5"
  }), "Back to Dashboard"), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-white"
  }, isEditMode ? "Edit Event" : "Create New Event"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 mt-2"
  }, isEditMode ? "Update the event details below" : "Fill in the details to create a new campus event"))), errorMessage && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-500/20 border-t-2 border-red-500 px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto flex items-center gap-2 text-red-300"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, errorMessage))), successMessage && /*#__PURE__*/React.createElement("div", {
    className: "bg-green-500/20 border-t-2 border-green-500 px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto flex items-center gap-2 text-green-300"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, successMessage))), /*#__PURE__*/React.createElement("div", {
    className: "py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-4xl"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Loading event data...")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Basic Information"), /*#__PURE__*/React.createElement(CardDescription, null, "Event name, date, and time")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Event Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "eventName",
    value: formData.eventName,
    onChange: handleInputChange,
    placeholder: "e.g., Tech Fest 2024",
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Date *"), /*#__PURE__*/React.createElement(Input, {
    name: "date",
    type: "date",
    value: formData.date,
    onChange: handleInputChange,
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Start Time *"), /*#__PURE__*/React.createElement(Input, {
    name: "time",
    type: "time",
    value: formData.time,
    onChange: handleInputChange,
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "End Time *"), /*#__PURE__*/React.createElement(Input, {
    name: "endTime",
    type: "time",
    value: formData.endTime,
    onChange: handleInputChange,
    className: "bg-background border-border",
    required: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Location *"), /*#__PURE__*/React.createElement(Input, {
    name: "location",
    value: formData.location,
    onChange: handleInputChange,
    placeholder: "e.g., Main Auditorium, Campus Ground",
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Duration"), /*#__PURE__*/React.createElement(Input, {
    name: "duration",
    value: formData.duration,
    onChange: handleInputChange,
    placeholder: "e.g., 24 hours, 2 days, 3 weeks",
    className: "bg-background border-border"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Prize Pool"), /*#__PURE__*/React.createElement(Input, {
    name: "prize",
    value: formData.prize,
    onChange: handleInputChange,
    placeholder: "e.g., \u20B950,000",
    className: "bg-background border-border"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Description *"), /*#__PURE__*/React.createElement("textarea", {
    name: "description",
    value: formData.description,
    onChange: handleInputChange,
    placeholder: "Describe your event in detail...",
    className: "w-full min-h-32 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
    required: true
  })))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Event Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Category, capacity, and fees")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Category *"), /*#__PURE__*/React.createElement("select", {
    name: "category",
    title: "Select event category",
    value: formData.category,
    onChange: handleInputChange,
    className: "w-full p-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
    required: true
  }, categories.map(cat => /*#__PURE__*/React.createElement("option", {
    key: cat.name,
    value: cat.name
  }, cat.icon, " ", cat.name))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, categories.find(c => c.name === formData.category)?.description)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Difficulty Level"), /*#__PURE__*/React.createElement("select", {
    name: "difficulty",
    title: "Select difficulty level",
    value: formData.difficulty,
    onChange: handleInputChange,
    className: "w-full p-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  }, /*#__PURE__*/React.createElement("option", {
    value: "All Levels"
  }, "All Levels"), /*#__PURE__*/React.createElement("option", {
    value: "Beginner"
  }, "Beginner"), /*#__PURE__*/React.createElement("option", {
    value: "Intermediate"
  }, "Intermediate"), /*#__PURE__*/React.createElement("option", {
    value: "Advanced"
  }, "Advanced"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Capacity *"), /*#__PURE__*/React.createElement(Input, {
    name: "capacity",
    type: "number",
    value: formData.capacity,
    onChange: handleInputChange,
    placeholder: "e.g., 500",
    className: "bg-background border-border",
    required: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Registration Fee (\u20B9)"), /*#__PURE__*/React.createElement(Input, {
    name: "registrationFee",
    type: "number",
    value: formData.registrationFee,
    onChange: handleInputChange,
    placeholder: "Leave blank for free event",
    className: "bg-background border-border"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Tags"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Input, {
    value: tagInput,
    onChange: e => setTagInput(e.target.value),
    onKeyPress: e => e.key === "Enter" && (e.preventDefault(), handleAddTag()),
    placeholder: "Add tags (press Enter)",
    className: "bg-background border-border flex-1"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: handleAddTag,
    className: "bg-primary hover:bg-primary/90"
  }, "Add")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, formData.tags.map(tag => /*#__PURE__*/React.createElement(Badge, {
    key: tag,
    className: "bg-primary text-primary-foreground flex items-center gap-2"
  }, tag, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => handleRemoveTag(tag),
    className: "hover:opacity-70",
    title: `Remove ${tag} tag`
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-3 h-3"
  })))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Payment Configuration"), /*#__PURE__*/React.createElement(CardDescription, null, "Set up pricing and payment options for this event")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "isPaid",
    checked: formData.isPaid,
    onChange: e => setFormData(prev => ({
      ...prev,
      isPaid: e.target.checked
    })),
    className: "w-5 h-5 cursor-pointer"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "isPaid",
    className: "cursor-pointer flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, "This is a Paid Event"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Enable payment collection for this event"))), formData.isPaid && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Price (\u20B9) *"), /*#__PURE__*/React.createElement(Input, {
    name: "price",
    type: "number",
    value: formData.price,
    onChange: handleInputChange,
    placeholder: "e.g., 500",
    className: "bg-background border-border",
    required: formData.isPaid
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Payment Deadline"), /*#__PURE__*/React.createElement(Input, {
    name: "paymentDeadline",
    type: "date",
    value: formData.paymentDeadline,
    onChange: handleInputChange,
    className: "bg-background border-border"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-3 block"
  }, "Accepted Payment Methods"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "card",
    checked: formData.paymentMethods?.includes("card"),
    onChange: e => {
      if (e.target.checked) {
        setFormData(prev => ({
          ...prev,
          paymentMethods: [...(prev.paymentMethods || []), "card"]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          paymentMethods: (prev.paymentMethods || []).filter(m => m !== "card")
        }));
      }
    },
    className: "w-4 h-4 cursor-pointer"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "card",
    className: "cursor-pointer flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-foreground"
  }, "Credit/Debit Card"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Visa, Mastercard, etc."))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "upi",
    checked: formData.paymentMethods?.includes("upi"),
    onChange: e => {
      if (e.target.checked) {
        setFormData(prev => ({
          ...prev,
          paymentMethods: [...(prev.paymentMethods || []), "upi"]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          paymentMethods: (prev.paymentMethods || []).filter(m => m !== "upi")
        }));
      }
    },
    className: "w-4 h-4 cursor-pointer"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "upi",
    className: "cursor-pointer flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-foreground"
  }, "UPI"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Google Pay, PhonePe, etc."))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "netbanking",
    checked: formData.paymentMethods?.includes("netbanking"),
    onChange: e => {
      if (e.target.checked) {
        setFormData(prev => ({
          ...prev,
          paymentMethods: [...(prev.paymentMethods || []), "netbanking"]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          paymentMethods: (prev.paymentMethods || []).filter(m => m !== "netbanking")
        }));
      }
    },
    className: "w-4 h-4 cursor-pointer"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "netbanking",
    className: "cursor-pointer flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-foreground"
  }, "Net Banking"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Direct bank transfer")))))))), formData.category === "Hackathon" && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/50"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Hackathon Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Hackathon-specific information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Problem Statements"), /*#__PURE__*/React.createElement("textarea", {
    name: "problemStatements",
    value: formData.problemStatements,
    onChange: handleInputChange,
    placeholder: "List the problem statements or themes (one per line)...",
    className: "w-full min-h-24 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Judging Criteria"), /*#__PURE__*/React.createElement("textarea", {
    name: "judgesCriteria",
    value: formData.judgesCriteria,
    onChange: handleInputChange,
    placeholder: "Describe how projects will be judged...",
    className: "w-full min-h-24 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  })))), formData.category === "Workshop" && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/50"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Workshop Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Workshop-specific information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Mentor/Instructor Name"), /*#__PURE__*/React.createElement(Input, {
    name: "mentor",
    value: formData.mentor,
    onChange: handleInputChange,
    placeholder: "Name of the workshop instructor",
    className: "bg-background border-border"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Prerequisites"), /*#__PURE__*/React.createElement("textarea", {
    name: "prerequisites",
    value: formData.prerequisites,
    onChange: handleInputChange,
    placeholder: "Skills or knowledge required to attend...",
    className: "w-full min-h-20 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Materials Provided"), /*#__PURE__*/React.createElement("textarea", {
    name: "materials",
    value: formData.materials,
    onChange: handleInputChange,
    placeholder: "Learning materials, resources, or tools provided...",
    className: "w-full min-h-20 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  })))), formData.category === "Placement" && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border border-accent/50"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Placement Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Job opportunity information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Company Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "company",
    value: formData.company,
    onChange: handleInputChange,
    placeholder: "Recruiting company name",
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "CTC (Package)"), /*#__PURE__*/React.createElement(Input, {
    name: "ctc",
    value: formData.ctc,
    onChange: handleInputChange,
    placeholder: "e.g., 8-12 LPA",
    className: "bg-background border-border"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Number of Positions"), /*#__PURE__*/React.createElement(Input, {
    name: "positions",
    type: "number",
    value: formData.positions,
    onChange: handleInputChange,
    placeholder: "e.g., 50",
    className: "bg-background border-border"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Job Profile"), /*#__PURE__*/React.createElement(Input, {
    name: "jobProfile",
    value: formData.jobProfile,
    onChange: handleInputChange,
    placeholder: "e.g., Software Engineer, Data Analyst",
    className: "bg-background border-border"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Eligibility Criteria"), /*#__PURE__*/React.createElement("textarea", {
    name: "eligibility",
    value: formData.eligibility,
    onChange: handleInputChange,
    placeholder: "GPA requirements, branch eligibility, etc...",
    className: "w-full min-h-20 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  })))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Organizer Information"), /*#__PURE__*/React.createElement(CardDescription, null, "Your contact details")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Organizer Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "organizer",
    value: formData.organizer,
    onChange: handleInputChange,
    placeholder: "Your name or organization",
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Email *"), /*#__PURE__*/React.createElement(Input, {
    name: "contactEmail",
    type: "email",
    value: formData.contactEmail,
    onChange: handleInputChange,
    placeholder: "contact@example.com",
    className: "bg-background border-border",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-foreground font-semibold mb-2 block"
  }, "Phone *"), /*#__PURE__*/React.createElement(Input, {
    name: "contactPhone",
    type: "tel",
    value: formData.contactPhone,
    onChange: handleInputChange,
    placeholder: "+91 XXXXXXXXXX",
    className: "bg-background border-border",
    required: true
  }))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Event Poster"), /*#__PURE__*/React.createElement(CardDescription, null, "Upload a poster image for your event")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary transition-all cursor-pointer"
  }, /*#__PURE__*/React.createElement("label", {
    className: "cursor-pointer block"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: handleFileUpload,
    className: "hidden"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-3"
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "w-8 h-8 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-foreground font-semibold"
  }, "Click to upload poster"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-sm"
  }, "PNG, JPG, GIF up to 10MB")), (formData.poster || formData.posterBase64) && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-2"
  }, formData.poster && /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent text-accent-foreground"
  }, formData.poster.name), (formData.posterBase64 || formData.poster) && /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: formData.posterBase64 || (formData.poster ? URL.createObjectURL(formData.poster) : ''),
    alt: "Event poster preview",
    className: "max-w-full h-auto max-h-48 rounded-lg border border-border"
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 justify-end pt-6"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "outline",
    onClick: () => navigate("/admin")
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    className: "bg-gradient-accent hover:opacity-90 text-white px-8",
    disabled: loading
  }, isEditMode ? "Update Event" : "Create Event"))))));
};
export default AddEventPage;