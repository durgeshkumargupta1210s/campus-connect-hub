import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Trophy, Users, BookOpen, Briefcase } from "lucide-react";
const features = [{
  icon: /*#__PURE__*/React.createElement(QrCode, {
    className: "w-8 h-8"
  }),
  title: "Instant QR Registration",
  description: "Register for events in seconds with smart QR code technology. No more long queues!",
  color: "text-primary"
}, {
  icon: /*#__PURE__*/React.createElement(Smartphone, {
    className: "w-8 h-8"
  }),
  title: "Fast Gate Entry",
  description: "Secure and lightning-fast entry scanning for all campus events and facilities.",
  color: "text-accent"
}, {
  icon: /*#__PURE__*/React.createElement(Trophy, {
    className: "w-8 h-8"
  }),
  title: "Hackathons & Contests",
  description: "Never miss a hackathon or competition. Get instant updates on all opportunities.",
  color: "text-primary"
}, {
  icon: /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-8 h-8"
  }),
  title: "Placement Updates",
  description: "Stay ahead with real-time placement drives, company visits, and career opportunities.",
  color: "text-accent"
}, {
  icon: /*#__PURE__*/React.createElement(Users, {
    className: "w-8 h-8"
  }),
  title: "Clubs & Communities",
  description: "Join clubs, connect with like-minded students, and build your campus network.",
  color: "text-primary"
}, {
  icon: /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-8 h-8"
  }),
  title: "Study Resources",
  description: "Access curated study materials, training programs, and skill development resources.",
  color: "text-accent"
}];
const Features = () => {
  return /*#__PURE__*/React.createElement("section", {
    className: "py-24 px-4 bg-background relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-foreground mb-4"
  }, "Everything You Need, One Platform"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "No more missing out on opportunities. CampusConnect brings everything to your fingertips.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  }, features.map((feature, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "group relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"
  }), /*#__PURE__*/React.createElement(Card, {
    className: "relative bg-white dark:bg-slate-900 border-border hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: `${feature.color} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`
  }, feature.icon), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl text-foreground"
  }, feature.title)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-base text-muted-foreground"
  }, feature.description))))))));
};
export default Features;