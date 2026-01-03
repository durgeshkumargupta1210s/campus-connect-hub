import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Rocket, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import React from "react";
const timeline = [{
  phase: "Registration",
  duration: "2 weeks before",
  color: "bg-primary"
}, {
  phase: "Event Day",
  duration: "24-48 hours",
  color: "bg-accent"
}, {
  phase: "Judging",
  duration: "48 hours after",
  color: "bg-primary"
}, {
  phase: "Results",
  duration: "1 week after",
  color: "bg-accent"
}];
const Hackathons = () => {
  const navigate = useNavigate();
  const {
    events: hackathons,
    loading
  } = useEvents("Hackathon");
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("section", {
    className: "relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-hero pt-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-10 right-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-20"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-24 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center max-w-4xl mx-auto animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
  }, /*#__PURE__*/React.createElement(Rocket, {
    className: "w-4 h-4 text-white"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm font-medium"
  }, "Build & Innovate")), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-7xl font-bold text-white mb-6"
  }, "Hackathons & ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "bg-gradient-accent bg-clip-text text-transparent"
  }, "Competitions")), /*#__PURE__*/React.createElement("p", {
    className: "text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
  }, "Showcase your skills, build amazing projects, and win exciting prizes. Your next big opportunity awaits!"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center items-center"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm",
    onClick: () => document.getElementById('upcoming-hackathons')?.scrollIntoView({
      behavior: 'smooth'
    })
  }, "Explore Events")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, "15+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Events/Year")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-accent"
  }, "\u20B95L+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Total Prize Pool")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, "1000+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Participants")))))), /*#__PURE__*/React.createElement("section", {
    id: "upcoming-hackathons",
    className: "py-24 px-4 bg-background relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-foreground mb-4"
  }, "Upcoming Hackathons"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "Mark your calendar and register for the most exciting hacking events")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, hackathons.map((hack, index) => /*#__PURE__*/React.createElement("button", {
    key: index,
    onClick: () => navigate(`/hackathons/${hack.id}`),
    className: "group text-left hover:no-underline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition"
  }), /*#__PURE__*/React.createElement(Card, {
    className: "relative bg-white dark:bg-slate-900 border-border hover:shadow-xl transition-all group-hover:scale-105 h-full flex flex-col cursor-pointer"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent/20 text-accent hover:bg-accent/30"
  }, hack.status), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, hack.difficulty)), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl text-foreground"
  }, hack.title), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-base mt-2"
  }, hack.description)), /*#__PURE__*/React.createElement(CardContent, {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Date"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, hack.date))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-5 h-5 text-accent"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Duration"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, hack.duration))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Trophy, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Prize Pool"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, hack.prize))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-accent"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Registrations"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, hack.participants, "+ registered"))), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-2"
  }, "Technologies"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, hack.tags.map((tag, i) => /*#__PURE__*/React.createElement(Badge, {
    key: i,
    variant: "secondary",
    className: "text-xs"
  }, tag)))))))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-24 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-foreground mb-4"
  }, "Hackathon Timeline"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "Here's what happens at each stage")), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  }, timeline.map((item, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "relative"
  }, index < timeline.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:block absolute top-1/3 -right-2 w-4 h-0.5 bg-gradient-to-r from-primary to-accent"
  }), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-border"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 ${item.color}`
  }, index + 1), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg text-foreground"
  }, item.phase)), /*#__PURE__*/React.createElement(CardContent, {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, item.duration))))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-24 px-4 bg-gradient-hero relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 opacity-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-3xl relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-white mb-4"
  }, "Tips to Win"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-white/90"
  }, "Follow these tips to ace your next hackathon")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, [{
    num: "1",
    title: "Form Strong Teams",
    desc: "Find teammates with complementary skills"
  }, {
    num: "2",
    title: "Plan Ahead",
    desc: "Have a clear project plan before you start"
  }, {
    num: "3",
    title: "Focus on MVP",
    desc: "Build a minimum viable product first"
  }, {
    num: "4",
    title: "Present Well",
    desc: "Your presentation matters as much as your code"
  }].map((tip, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold text-accent mb-4"
  }, tip.num), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-semibold text-white mb-2"
  }, tip.title), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80"
  }, tip.desc))))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default Hackathons;