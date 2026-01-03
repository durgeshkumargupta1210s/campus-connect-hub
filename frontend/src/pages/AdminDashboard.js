import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, Menu, X, BarChart3, Calendar, Users, Zap, LayoutDashboard, Edit2, Trash2, Eye, Briefcase, Users2, DollarSign, CreditCard, AlertCircle } from "lucide-react";
import React from "react";
// Removed localStorage services - using backend API directly
import { useOpportunities } from "@/hooks/useOpportunities";
import { useClubs } from "@/hooks/useClubs";
import { useClubApplications } from "@/hooks/useClubApplications";
import { usePayments } from "@/hooks/usePayments";
import { APIClient, API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { useEvents } from "@/hooks/useEvents";
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const menuItems = [{
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard
  }, {
    id: "events",
    label: "Events",
    icon: Calendar
  }, {
    id: "bookings",
    label: "Bookings",
    icon: Users
  }, {
    id: "opportunities",
    label: "Opportunities",
    icon: Briefcase
  }, {
    id: "clubs",
    label: "Clubs",
    icon: Users2
  }, {
    id: "club-applications",
    label: "Club Applications",
    icon: Users
  }, {
    id: "payments",
    label: "Payments",
    icon: Briefcase
  }, {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3
  }];
  const handleLogout = () => {
    navigate("/");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex h-screen bg-background overflow-hidden"
  }, /*#__PURE__*/React.createElement("aside", {
    className: `${sidebarOpen ? "w-64" : "w-20"} bg-gradient-hero transition-all duration-300 border-r border-white/10 flex flex-col overflow-y-auto`
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold"
  }, "CC"), sidebarOpen && /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-lg"
  }, "CampusConnect Admin"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 p-4 space-y-2"
  }, menuItems.map(item => {
    const Icon = item.icon;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => setActiveTab(item.id),
      className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? "bg-white/20 text-white border border-white/30" : "text-white/70 hover:text-white hover:bg-white/10"}`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "w-5 h-5 flex-shrink-0"
    }), sidebarOpen && /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium"
    }, item.label));
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleLogout,
    className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
  }, /*#__PURE__*/React.createElement(LogOut, {
    className: "w-5 h-5 flex-shrink-0"
  }), sidebarOpen && /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium"
  }, "Logout")))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col overflow-hidden"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white dark:bg-slate-900 border-b border-border shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSidebarOpen(!sidebarOpen),
    className: "text-foreground hover:bg-secondary p-2 rounded-lg transition-all"
  }, sidebarOpen ? /*#__PURE__*/React.createElement(X, {
    className: "w-6 h-6"
  }) : /*#__PURE__*/React.createElement(Menu, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold text-foreground"
  }, menuItems.find(m => m.id === activeTab)?.label || "Dashboard"), activeTab === "events" && /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/admin/add-event"),
    className: "bg-gradient-accent hover:opacity-90 text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4"
  }), "Add Event"), activeTab === "opportunities" && /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/admin/add-opportunity"),
    className: "bg-gradient-accent hover:opacity-90 text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4"
  }), "Add Opportunity"), activeTab === "clubs" && /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/admin/add-club"),
    className: "bg-gradient-accent hover:opacity-90 text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4"
  }), "Add Club"), !["events", "opportunities", "clubs"].includes(activeTab) && /*#__PURE__*/React.createElement("div", null))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-y-auto"
  }, activeTab === "overview" && /*#__PURE__*/React.createElement(OverviewTab, null), activeTab === "events" && /*#__PURE__*/React.createElement(EventsTab, null), activeTab === "bookings" && /*#__PURE__*/React.createElement(BookingsTab, null), activeTab === "opportunities" && /*#__PURE__*/React.createElement(OpportunitiesTab, null), activeTab === "clubs" && /*#__PURE__*/React.createElement(ClubsTab, null), activeTab === "club-applications" && /*#__PURE__*/React.createElement(ClubApplicationsTab, null), activeTab === "payments" && /*#__PURE__*/React.createElement(PaymentsTab, null), activeTab === "analytics" && /*#__PURE__*/React.createElement(AnalyticsTab, null))));
};

// Overview Tab Component
const OverviewTab = () => {
  const {
    events,
    loading: eventsLoading
  } = useEvents();
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    upcomingEvents: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        // Fetch all events
        const eventsData = await APIClient.get(API_ENDPOINTS.EVENTS_LIST);
        const allEvents = Array.isArray(eventsData) ? eventsData : eventsData.events || [];

        // Fetch registrations for bookings count
        const registrationsData = await APIClient.get(API_ENDPOINTS.REGISTRATIONS_LIST);
        const allRegistrations = Array.isArray(registrationsData) ? registrationsData : registrationsData.registrations || [];
        const totalEvents = allEvents.length;
        const upcomingEvents = allEvents.filter(e => e.status === 'upcoming' || new Date(e.date) >= new Date()).length;
        const totalBookings = allRegistrations.length;

        // Calculate revenue from completed payments
        // Note: Payments endpoint may need to be added to backend
        let revenue = 0;
        try {
          // Get payments from backend
          const paymentsData = await APIClient.get(API_ENDPOINTS.PAYMENTS_LIST);
          const payments = Array.isArray(paymentsData) ? paymentsData : paymentsData.payments || [];
          revenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + (p.amount || 0), 0);
        } catch (e) {
          // If payments endpoint doesn't exist, revenue stays 0
          console.log('Payments endpoint not available yet');
        }
        setStats({
          totalEvents,
          totalBookings,
          upcomingEvents,
          revenue
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);
  const eventStats = [{
    label: "Total Events",
    value: stats.totalEvents.toString(),
    icon: Calendar,
    color: "text-primary"
  }, {
    label: "Total Bookings",
    value: stats.totalBookings.toLocaleString(),
    icon: Users,
    color: "text-accent"
  }, {
    label: "Upcoming Events",
    value: stats.upcomingEvents.toString(),
    icon: Zap,
    color: "text-primary"
  }, {
    label: "Revenue",
    value: `₹${(stats.revenue / 1000).toFixed(0)}K`,
    icon: BarChart3,
    color: "text-accent"
  }];
  const recentEvents = events.slice(0, 3);
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, eventStats.map((stat, index) => {
    const Icon = stat.icon;
    return /*#__PURE__*/React.createElement(Card, {
      key: index,
      className: "bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-all"
    }, /*#__PURE__*/React.createElement(CardHeader, {
      className: "flex flex-row items-center justify-between space-y-0 pb-2"
    }, /*#__PURE__*/React.createElement(CardTitle, {
      className: "text-sm font-medium text-foreground"
    }, stat.label), /*#__PURE__*/React.createElement(Icon, {
      className: `w-6 h-6 ${stat.color}`
    })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
      className: "text-3xl font-bold text-foreground"
    }, loading ? '...' : stat.value), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground mt-1"
    }, "From database")));
  })), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Recent Events"), /*#__PURE__*/React.createElement(CardDescription, null, "Your latest created events")), /*#__PURE__*/React.createElement(CardContent, null, eventsLoading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Loading events...")) : recentEvents.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No events created yet")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, recentEvents.map(event => /*#__PURE__*/React.createElement("div", {
    key: event.id || event._id,
    className: "flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-foreground"
  }, event.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, event.date ? new Date(event.date).toLocaleDateString() : 'TBA', " \u2022 ", event.location || 'TBA')), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, event.participants || 0, "/", event.capacity || 0), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Registered")), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary text-primary-foreground ml-4"
  }, event.status || 'upcoming')))))));
};

// Events Tab Component
// Events Tab Component
const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const loadEvents = async () => {
    try {
      setLoading(true);
      // Load from backend API
      const data = await APIClient.get(API_ENDPOINTS.EVENTS_LIST);

      // Handle different response structures
      let eventsList = [];
      if (Array.isArray(data)) {
        eventsList = data;
      } else if (data.events && Array.isArray(data.events)) {
        eventsList = data.events;
      } else if (data.data && Array.isArray(data.data)) {
        eventsList = data.data;
      }
      setEvents(eventsList);
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteEvent = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await APIClient.delete(API_ENDPOINTS.EVENTS_DELETE(eventId));
      toast({
        title: "Event Deleted",
        description: `"${eventTitle}" has been deleted successfully.`
      });
      // Reload events after deletion
      loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete event. Please try again.",
        variant: "destructive"
      });
    }
  };
  useEffect(() => {
    loadEvents();
    // Refresh events every 5 seconds to see new events immediately
    const interval = setInterval(loadEvents, 5000);
    return () => clearInterval(interval);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground"
  }, "Manage Events"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-sm"
  }, "Create, edit, and manage campus events")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: loadEvents,
    variant: "outline",
    className: "text-foreground border-border hover:bg-secondary"
  }, "Refresh"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/admin/add-event"),
    className: "bg-gradient-accent hover:opacity-90 text-white"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Add New Event"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "p-6"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Loading events...")) : events.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No events created yet")) : /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-border"
  }, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 font-semibold text-foreground"
  }, "Event Name"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 font-semibold text-foreground"
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 font-semibold text-foreground"
  }, "Location"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 font-semibold text-foreground"
  }, "Capacity"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 font-semibold text-foreground"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 font-semibold text-foreground"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, events.map(event => /*#__PURE__*/React.createElement("tr", {
    key: event._id || event.id,
    className: "border-b border-border hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-foreground font-medium"
  }, event.title || event.eventName), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-foreground"
  }, event.date ? new Date(event.date).toLocaleDateString() : 'N/A'), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-foreground"
  }, event.location || 'N/A'), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-foreground"
  }, event.capacity || 0), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary text-primary-foreground"
  }, event.status || 'Open')), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(`/events/${event._id || event.id}`),
    className: "p-2 hover:bg-secondary rounded-lg transition-all",
    title: "View Event Details"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "w-4 h-4 text-muted-foreground"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(`/admin/edit-event/${event._id || event.id}`),
    className: "p-2 hover:bg-secondary rounded-lg transition-all",
    title: "Edit Event"
  }, /*#__PURE__*/React.createElement(Edit2, {
    className: "w-4 h-4 text-muted-foreground"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteEvent(event._id || event.id, event.title || event.eventName || 'Event'),
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all",
    title: "Delete Event"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  }))))))))))));
};

// Bookings Tab Component
const BookingsTab = () => {
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [allGroupRegistrations, setAllGroupRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch individual registrations from backend
      const registrationsData = await APIClient.get(API_ENDPOINTS.REGISTRATIONS_LIST);
      const registrations = Array.isArray(registrationsData) ? registrationsData : registrationsData.registrations || [];
      setAllRegistrations(registrations);

      // Note: Group registrations might need a separate endpoint
      // For now, we'll set empty array if no endpoint exists
      setAllGroupRegistrations([]);
    } catch (err) {
      console.error('Error loading registrations:', err);
      setError(err.message || 'Failed to load registrations');
      setAllRegistrations([]);
      setAllGroupRegistrations([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadRegistrations();
    // Refresh every 30 seconds to get latest bookings
    const interval = setInterval(loadRegistrations, 30000);
    return () => clearInterval(interval);
  }, []);
  const totalRegistrations = allRegistrations.length + allGroupRegistrations.length;
  const paidRegistrations = allRegistrations.filter(r => r.payment && r.payment.status === 'completed').length;
  const totalRevenue = allRegistrations.filter(r => r.payment && r.payment.status === 'completed').reduce((sum, r) => sum + (r.payment.amount || 0), 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Total Bookings"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-blue-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, totalRegistrations), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "All registrations"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Paid Bookings"), /*#__PURE__*/React.createElement(CreditCard, {
    className: "w-6 h-6 text-green-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, paidRegistrations), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "With completed payment"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Revenue from Bookings"), /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-6 h-6 text-accent"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, "\u20B9", totalRevenue.toLocaleString()), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "From paid registrations")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Individual Registrations"), /*#__PURE__*/React.createElement(CardDescription, null, "Solo participants (", allRegistrations.length, " total, ", paidRegistrations, " paid)")), /*#__PURE__*/React.createElement(Button, {
    onClick: loadRegistrations,
    variant: "outline",
    className: "text-foreground border-border hover:bg-secondary",
    disabled: loading
  }, loading ? 'Refreshing...' : 'Refresh'))), /*#__PURE__*/React.createElement(CardContent, null, loading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Loading registrations...")) : error ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8 text-red-500"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50"
  }), /*#__PURE__*/React.createElement("p", null, "Error loading registrations: ", error), /*#__PURE__*/React.createElement(Button, {
    onClick: loadRegistrations,
    className: "mt-4"
  }, "Try Again")) : allRegistrations.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No individual registrations yet")) : /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-border"
  }, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-3 font-semibold text-foreground"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-3 font-semibold text-foreground"
  }, "Email"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-3 font-semibold text-foreground"
  }, "Event"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-3 font-semibold text-foreground"
  }, "Registration Date"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-3 font-semibold text-foreground"
  }, "Payment"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-3 font-semibold text-foreground"
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, allRegistrations.map(registration => {
    const payment = registration.payment;
    const paymentMethodMapping = {
      'credit_card': 'Card',
      'debit_card': 'Card',
      'upi': 'UPI',
      'net_banking': 'Net Banking',
      'wallet': 'Wallet'
    };
    return /*#__PURE__*/React.createElement("tr", {
      key: registration._id || registration.id,
      className: "border-b border-border hover:bg-secondary transition-all"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-3 text-foreground font-medium"
    }, registration.user?.name || registration.userName || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-3 text-foreground"
    }, registration.user?.email || registration.userEmail || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-3 text-foreground"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-medium"
    }, registration.event?.title || registration.eventTitle || 'N/A'), registration.event?.isPaid && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, "Paid Event \u2022 \u20B9", registration.event?.price || 0))), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-3 text-foreground text-xs"
    }, registration.createdAt ? new Date(registration.createdAt).toLocaleDateString() : registration.registeredAt ? new Date(registration.registeredAt).toLocaleDateString() : 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-3"
    }, payment ? /*#__PURE__*/React.createElement("div", {
      className: "space-y-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Badge, {
      className: "bg-green-500/20 text-green-600 dark:text-green-400 text-xs"
    }, "Paid"), /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-foreground text-xs"
    }, "\u20B9", payment.amount)), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, paymentMethodMapping[payment.paymentMethod] || payment.paymentMethod), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground font-mono"
    }, payment.transactionId), payment.paidAt && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, new Date(payment.paidAt).toLocaleDateString())) : registration.event?.isPaid ? /*#__PURE__*/React.createElement(Badge, {
      className: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs"
    }, "Payment Pending") : /*#__PURE__*/React.createElement(Badge, {
      className: "bg-gray-500/20 text-gray-600 dark:text-gray-400 text-xs"
    }, "Free Event")), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-3"
    }, /*#__PURE__*/React.createElement(Badge, {
      className: registration.status === "confirmed" || registration.status === "Confirmed" || registration.status === "registered" ? "bg-primary text-primary-foreground" : "bg-red-500 text-white"
    }, registration.status || 'pending')));
  })))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Team Registrations"), /*#__PURE__*/React.createElement(CardDescription, null, "Group hackathon teams (", allGroupRegistrations.length, " teams, ", allGroupRegistrations.reduce((sum, t) => sum + t.totalMembers, 0), " members)")), /*#__PURE__*/React.createElement(CardContent, null, loading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Loading team registrations...")) : allGroupRegistrations.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No team registrations yet")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, allGroupRegistrations.map(team => /*#__PURE__*/React.createElement("div", {
    key: team.id,
    className: "border border-border rounded-lg p-4 hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Team Name"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, team.teamName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Event"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, team.eventTitle)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: team.status === "Confirmed" ? "bg-primary text-primary-foreground" : "bg-red-500 text-white"
  }, team.status))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-border pt-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-muted-foreground mb-2"
  }, "Team Leader"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 text-sm mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-foreground font-medium"
  }, team.teamLeader.name), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, team.teamLeader.email), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, team.teamLeader.phone)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-muted-foreground mb-2"
  }, "Team Members (", team.totalMembers, ")"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, team.teamMembers.map(member => /*#__PURE__*/React.createElement("div", {
    key: member.id,
    className: "flex items-center gap-4 text-sm bg-secondary rounded px-3 py-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "text-xs"
  }, member.role), /*#__PURE__*/React.createElement("span", {
    className: "text-foreground font-medium min-w-32"
  }, member.name), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground flex-1"
  }, member.email), /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, member.phone))))), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-muted-foreground mt-3 pt-3 border-t border-border"
  }, "Registered on ", new Date(team.registeredAt).toLocaleDateString(), " at ", new Date(team.registeredAt).toLocaleTimeString())))))));
};

// Analytics Tab Component
const AnalyticsTab = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Analytics Overview"), /*#__PURE__*/React.createElement(CardDescription, null, "Event performance and user engagement metrics")), /*#__PURE__*/React.createElement(CardContent, {
    className: "h-64 flex items-center justify-center text-muted-foreground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "w-12 h-12 mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("p", null, "Analytics charts will be displayed here")))));
};

// Opportunities Tab Component
const OpportunitiesTab = () => {
  const {
    opportunities,
    loadOpportunities,
    deleteOpportunity
  } = useOpportunities();
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Manage Opportunities"), /*#__PURE__*/React.createElement(CardDescription, null, "Create and manage job opportunities, internships, and fellowships (", opportunities.length, " total)")), /*#__PURE__*/React.createElement(CardContent, null, opportunities.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No opportunities created yet")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, opportunities.map(opp => /*#__PURE__*/React.createElement("div", {
    key: opp.id,
    className: "border border-border rounded-lg p-4 hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Title"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, opp.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Company"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, opp.company)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Type"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-blue-100 text-blue-800"
  }, opp.type)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: opp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
  }, opp.status))), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground grid grid-cols-3 gap-2 mb-3"
  }, opp.ctc && /*#__PURE__*/React.createElement("span", null, "CTC: ", opp.ctc), opp.positions && /*#__PURE__*/React.createElement("span", null, "Positions: ", opp.positions), opp.deadline && /*#__PURE__*/React.createElement("span", null, "Deadline: ", new Date(opp.deadline).toLocaleDateString())), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "p-2 hover:bg-secondary rounded-lg transition-all",
    title: "Edit"
  }, /*#__PURE__*/React.createElement(Edit2, {
    className: "w-4 h-4 text-muted-foreground"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm('Delete this opportunity?')) {
        deleteOpportunity(opp.id);
      }
    },
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all",
    title: "Delete"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  })))))))));
};

// Campus Drives Tab Component

// Clubs Tab Component
const ClubsTab = () => {
  const navigate = useNavigate();
  const {
    clubs,
    loadClubs,
    deleteClub
  } = useClubs();
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Manage Clubs"), /*#__PURE__*/React.createElement(CardDescription, null, "Create, edit, and manage campus clubs")), /*#__PURE__*/React.createElement(CardContent, null, clubs.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(Users2, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No clubs created yet")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, clubs.map(club => /*#__PURE__*/React.createElement("div", {
    key: club.id,
    className: "border border-border rounded-lg p-4 hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Club Name"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, club.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Members"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, club.members, "+")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Established"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, club.establishedYear)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "President"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, club.president.name))), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-3 line-clamp-2"
  }, club.description), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, club.tags.slice(0, 3).map((tag, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    variant: "secondary",
    className: "text-xs"
  }, tag)), club.tags.length > 3 && /*#__PURE__*/React.createElement(Badge, {
    variant: "outline",
    className: "text-xs"
  }, "+", club.tags.length - 3, " more")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => window.open(`/club/${club.id}`, '_blank'),
    className: "p-2 hover:bg-secondary rounded-lg transition-all",
    title: "View"
  }, /*#__PURE__*/React.createElement(Eye, {
    className: "w-4 h-4 text-muted-foreground"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(`/admin/edit-club/${club.id}`),
    className: "p-2 hover:bg-secondary rounded-lg transition-all",
    title: "Edit"
  }, /*#__PURE__*/React.createElement(Edit2, {
    className: "w-4 h-4 text-muted-foreground"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm('Delete this club?')) {
        deleteClub(club.id);
      }
    },
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all",
    title: "Delete"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  })))))))));
};

// Club Applications Tab Component
const ClubApplicationsTab = () => {
  const {
    applications,
    loadApplications,
    updateApplicationStatus,
    deleteApplication
  } = useClubApplications();
  useEffect(() => {
    loadApplications();
  }, [loadApplications]);
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');
  const renderApplications = apps => {
    return /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, apps.length === 0 ? /*#__PURE__*/React.createElement("p", {
      className: "text-center py-8 text-muted-foreground"
    }, "No applications") : apps.map(app => /*#__PURE__*/React.createElement("div", {
      key: app.id,
      className: "border border-border rounded-lg p-4 hover:bg-secondary transition-all"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, "Name"), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-foreground"
    }, app.fullName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, "Club"), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-foreground"
    }, app.clubName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, "Roll Number"), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-foreground"
    }, app.universityRollNumber)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, "Year"), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-foreground"
    }, app.year)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-muted-foreground"
    }, "Team Interest"), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-foreground text-sm"
    }, app.teamInterest))), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-muted-foreground grid grid-cols-3 gap-2 mb-3"
    }, /*#__PURE__*/React.createElement("span", null, "Email: ", app.email), /*#__PURE__*/React.createElement("span", null, "Phone: ", app.phone), /*#__PURE__*/React.createElement("span", null, "Applied: ", new Date(app.applicationDate).toLocaleDateString())), app.resume && /*#__PURE__*/React.createElement("div", {
      className: "mb-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium text-blue-900 dark:text-blue-100"
    }, "Resume attached"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        const link = document.createElement('a');
        link.href = app.resume;
        link.download = `${app.fullName}_resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      className: "px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-100 rounded text-xs font-medium transition-all",
      title: "Download resume"
    }, "Download")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, app.status === 'pending' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => updateApplicationStatus(app.id, 'approved'),
      className: "px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-all text-sm font-medium",
      title: "Approve"
    }, "Approve"), /*#__PURE__*/React.createElement("button", {
      onClick: () => updateApplicationStatus(app.id, 'rejected'),
      className: "px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all text-sm font-medium",
      title: "Reject"
    }, "Reject")), app.status !== 'pending' && /*#__PURE__*/React.createElement(Badge, {
      className: app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }, app.status.charAt(0).toUpperCase() + app.status.slice(1)), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        if (window.confirm('Delete this application?')) {
          deleteApplication(app.id);
        }
      },
      className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all ml-auto",
      title: "Delete"
    }, /*#__PURE__*/React.createElement(Trash2, {
      className: "w-4 h-4 text-red-500"
    }))))));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Pending"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-yellow-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, pendingApplications.length), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "Applications awaiting review"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Approved"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-green-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, approvedApplications.length), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "Applications approved"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Rejected"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-red-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, rejectedApplications.length), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "Applications rejected")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground text-yellow-600"
  }, "Pending Applications"), /*#__PURE__*/React.createElement(CardDescription, null, "Review and take action on new applications")), /*#__PURE__*/React.createElement(CardContent, null, renderApplications(pendingApplications))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground text-green-600"
  }, "Approved Applications")), /*#__PURE__*/React.createElement(CardContent, null, renderApplications(approvedApplications))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground text-red-600"
  }, "Rejected Applications")), /*#__PURE__*/React.createElement(CardContent, null, renderApplications(rejectedApplications))));
};

// Payments Tab Component
const PaymentsTab = () => {
  const {
    payments,
    loadPayments,
    updatePaymentStatus,
    deletePayment
  } = usePayments();
  const [filterStatus, setFilterStatus] = useState('all');
  useEffect(() => {
    loadPayments();
  }, [loadPayments]);
  const filteredPayments = payments.filter(p => filterStatus === 'all' ? true : p.status === filterStatus);
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;
  return /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Total Revenue"), /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-6 h-6 text-green-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, "\u20B9", totalRevenue.toLocaleString()), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "Completed payments"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Total Payments"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-blue-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, payments.length), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "All transactions"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Pending"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-yellow-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, pendingPayments), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "Awaiting confirmation"))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "flex flex-row items-center justify-between space-y-0 pb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-sm font-medium text-foreground"
  }, "Failed"), /*#__PURE__*/React.createElement(Users, {
    className: "w-6 h-6 text-red-600"
  })), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-foreground"
  }, failedPayments), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground mt-1"
  }, "Failed transactions")))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Payment Transactions"), /*#__PURE__*/React.createElement(CardDescription, null, "Manage event payment transactions")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-6 border-b border-border pb-4"
  }, ['all', 'pending', 'completed', 'failed'].map(status => /*#__PURE__*/React.createElement("button", {
    key: status,
    onClick: () => setFilterStatus(status),
    className: `px-4 py-2 rounded-lg font-medium text-sm transition-all ${filterStatus === status ? 'bg-primary text-primary-foreground' : 'bg-slate-100 dark:bg-slate-800 text-foreground hover:bg-slate-200 dark:hover:bg-slate-700'}`
  }, status.charAt(0).toUpperCase() + status.slice(1), " (", filteredPayments.filter(p => status === 'all' ? true : p.status === status).length, ")"))), filteredPayments.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "No payments found")) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, filteredPayments.map(payment => /*#__PURE__*/React.createElement("div", {
    key: payment.id,
    className: "border border-border rounded-lg p-4 hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "User"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, payment.userName), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, payment.userEmail)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Event"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground"
  }, payment.eventTitle)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Amount"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground text-lg"
  }, "\u20B9", payment.amount)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Method"), /*#__PURE__*/React.createElement(Badge, {
    className: "mt-1 capitalize"
  }, payment.paymentMethod.replace(/([A-Z])/g, ' $1').trim())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Status"), /*#__PURE__*/React.createElement(Badge, {
    className: `mt-1 ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`
  }, payment.status.charAt(0).toUpperCase() + payment.status.slice(1)))), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground grid grid-cols-3 gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", null, "ID: ", payment.id), /*#__PURE__*/React.createElement("span", null, "TXN: ", payment.transactionId), /*#__PURE__*/React.createElement("span", null, "Date: ", new Date(payment.paymentDate).toLocaleDateString())), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, payment.status === 'pending' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      const result = await updatePaymentStatus(payment.id, 'completed');
      if (result.success) {
        toast({
          title: "Payment Completed",
          description: "Payment status updated successfully."
        });
        loadPayments();
      }
    },
    className: "px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-all text-sm font-medium",
    title: "Mark as completed"
  }, "Complete"), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      const result = await updatePaymentStatus(payment.id, 'failed');
      if (result.success) {
        toast({
          title: "Payment Failed",
          description: "Payment status updated to failed."
        });
        loadPayments();
      }
    },
    className: "px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all text-sm font-medium",
    title: "Mark as failed"
  }, "Failed")), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      if (window.confirm('Are you sure you want to delete this payment record? This action cannot be undone.')) {
        const result = await deletePayment(payment.id);
        if (result.success) {
          toast({
            title: "Payment Deleted",
            description: "Payment record has been deleted."
          });
          loadPayments();
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete payment.",
            variant: "destructive"
          });
        }
      }
    },
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all ml-auto",
    title: "Delete"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  })))))))));
};
export default AdminDashboard;