import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Ticket, Heart, Share2, LogOut, Settings, Bell } from "lucide-react";
import React from "react";
const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const user = {
    name: "Rahul Kumar",
    email: "rahul@example.com",
    avatar: "RK",
    registeredEvents: 5,
    upcomingEvents: 3,
    badges: 12
  };
  const registeredEvents = [{
    id: 1,
    title: "Tech Fest 2024",
    date: "March 15, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Main Auditorium",
    status: "Registered",
    category: "Fest",
    attendees: 320,
    capacity: 500
  }, {
    id: 2,
    title: "AI/ML Hackathon",
    date: "March 20-21, 2024",
    time: "9:00 AM",
    location: "Computer Lab",
    status: "Registered",
    category: "Hackathon",
    attendees: 95,
    capacity: 120
  }, {
    id: 3,
    title: "Cultural Night",
    date: "March 18, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Open Arena",
    status: "Registered",
    category: "Cultural",
    attendees: 650,
    capacity: 800
  }];
  const savedEvents = [{
    id: 4,
    title: "Web Dev Workshop",
    date: "April 1, 2024",
    location: "Tech Hub",
    category: "Workshop",
    attendees: 45,
    capacity: 50
  }, {
    id: 5,
    title: "UI/UX Design Talk",
    date: "April 5, 2024",
    location: "Design Studio",
    category: "Talk",
    attendees: 78,
    capacity: 100
  }];
  const handleLogout = () => {
    navigate("/");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col bg-background"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-gradient-hero py-12 px-4 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-white text-gradient-hero rounded-full flex items-center justify-center font-bold text-xl"
  }, user.avatar), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-white mb-1"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80"
  }, user.email))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all",
    title: "Notifications"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("button", {
    className: "p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all",
    title: "Settings"
  }, /*#__PURE__*/React.createElement(Settings, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: handleLogout,
    variant: "outline",
    className: "bg-white/10 border-white/20 text-white hover:bg-white/20"
  }, /*#__PURE__*/React.createElement(LogOut, {
    className: "w-4 h-4 mr-2"
  }), "Logout"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, user.registeredEvents), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm mt-1"
  }, "Events Registered")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, user.upcomingEvents), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm mt-1"
  }, "Upcoming Events")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, user.badges), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm mt-1"
  }, "Badges Earned")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, "Level 5"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm mt-1"
  }, "Community Level"))))), /*#__PURE__*/React.createElement("section", {
    className: "py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: activeTab,
    onValueChange: setActiveTab,
    className: "w-full"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full max-w-md grid-cols-3 mb-8"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "overview"
  }, "My Events"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "saved"
  }, "Saved Events"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "bookings"
  }, "My Bookings")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "overview",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground mb-4"
  }, "Registered Events"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, registeredEvents.map(event => /*#__PURE__*/React.createElement(Card, {
    key: event.id,
    className: "bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-all group"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary text-primary-foreground"
  }, event.category), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent/20 text-accent"
  }, event.status)), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl text-foreground"
  }, event.title), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-base mt-2"
  }, event.location)), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-primary flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Date & Time"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, event.date, " \u2022 ", event.time))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-accent flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Attendees"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, event.attendees, "/", event.capacity, " registered")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, "Capacity"), /*#__PURE__*/React.createElement("span", {
    className: "text-foreground font-semibold"
  }, Math.round(event.attendees / event.capacity * 100), "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-2 bg-secondary rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-gradient-accent rounded-full transition-all",
    style: {
      width: `${event.attendees / event.capacity * 100}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 pt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
  }, /*#__PURE__*/React.createElement(Ticket, {
    className: "w-4 h-4 mr-2"
  }), "View Ticket"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "flex-1"
  }, /*#__PURE__*/React.createElement(Share2, {
    className: "w-4 h-4 mr-2"
  }), "Share")))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "saved",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground mb-4"
  }, "Saved Events"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, savedEvents.map(event => /*#__PURE__*/React.createElement(Card, {
    key: event.id,
    className: "bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-all"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary text-primary-foreground"
  }, event.category), /*#__PURE__*/React.createElement("button", {
    className: "text-red-500 hover:scale-110 transition-transform",
    title: "Save event"
  }, /*#__PURE__*/React.createElement(Heart, {
    className: "w-6 h-6 fill-current"
  }))), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl text-foreground mt-2"
  }, event.title), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-base mt-2"
  }, event.location)), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-primary flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, event.date)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-accent flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, event.attendees, "/", event.capacity, " interested")), /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-gradient-accent hover:opacity-90 text-white"
  }, "Register Now"))))))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "bookings",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground mb-4"
  }, "My Bookings"), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, "Booking History"), /*#__PURE__*/React.createElement(CardDescription, null, "View all your event bookings and registrations")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, registeredEvents.map(event => /*#__PURE__*/React.createElement("div", {
    key: event.id,
    className: "flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-foreground"
  }, event.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, event.date, " \u2022 ", event.location)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary text-primary-foreground"
  }, event.status), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "View Details"))))))))))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default UserDashboard;