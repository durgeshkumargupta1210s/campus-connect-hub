import React from "react";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";
const EventsSection = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.EVENTS_LIST, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          let backendEvents = [];
          if (Array.isArray(data)) {
            backendEvents = data;
          } else if (data.events && Array.isArray(data.events)) {
            backendEvents = data.events;
          } else if (data.data && Array.isArray(data.data)) {
            backendEvents = data.data;
          }

          // Convert backend events to display format, take first 3
          const convertedEvents = backendEvents.slice(0, 3).map(event => ({
            title: event.title,
            date: event.date ? new Date(event.date).toLocaleDateString() : '',
            location: event.location || 'TBA',
            attendees: event.registeredCount || 0,
            category: event.category || 'Event',
            imageColor: getCategoryColor(event.category)
          }));
          setEvents(convertedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);
  const getCategoryColor = category => {
    const colorMap = {
      'hackathon': 'bg-gradient-to-br from-accent to-accent/70',
      'workshop': 'bg-gradient-to-br from-primary to-primary/70',
      'placement': 'bg-gradient-to-br from-primary to-accent',
      'seminar': 'bg-gradient-to-br from-primary/50 to-accent/50',
      'cultural': 'bg-gradient-to-br from-accent/50 to-primary/50',
      'sports': 'bg-gradient-to-br from-green-500 to-green-600',
      'technical': 'bg-gradient-to-br from-blue-500 to-blue-600'
    };
    return colorMap[category?.toLowerCase()] || 'bg-gradient-to-br from-primary to-primary/70';
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-foreground mb-4"
  }, "Upcoming Events"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground"
  }, "Don't miss out on exciting campus activities")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "hidden md:block",
    onClick: () => navigate("/events")
  }, "View All Events")), loading ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Loading events...")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, events.map((event, index) => /*#__PURE__*/React.createElement(EventCard, _extends({
    key: index
  }, event)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 text-center md:hidden"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full sm:w-auto",
    onClick: () => navigate("/events")
  }, "View All Events")))));
};
export default EventsSection;