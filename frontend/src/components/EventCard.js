import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import React from "react";
const EventCard = ({
  title,
  date,
  location,
  attendees,
  category,
  imageColor
}) => {
  return /*#__PURE__*/React.createElement(Card, {
    className: "overflow-hidden hover:shadow-lg transition-all hover:scale-105 bg-gradient-card border-border group"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-48 ${imageColor} relative overflow-hidden`
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-br from-transparent to-black/20"
  }), /*#__PURE__*/React.createElement(Badge, {
    className: "absolute top-4 right-4 bg-accent text-accent-foreground"
  }, category)), /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl group-hover:text-primary transition-colors"
  }, title)), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-muted-foreground"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, date)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-muted-foreground"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, location)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-muted-foreground"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, attendees, " attending"))), /*#__PURE__*/React.createElement(CardFooter, null, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground"
  }, "Register with QR")));
};
export default EventCard;