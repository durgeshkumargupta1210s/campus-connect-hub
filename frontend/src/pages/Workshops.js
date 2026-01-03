import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Users, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import React from "react";
const Workshops = () => {
  const navigate = useNavigate();
  const {
    events: workshops
  } = useEvents("Workshop");
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
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-white"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm font-medium"
  }, "Learn & Grow")), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-7xl font-bold text-white mb-6"
  }, "Workshops & ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "bg-gradient-accent bg-clip-text text-transparent"
  }, "Learning Sessions")), /*#__PURE__*/React.createElement("p", {
    className: "text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
  }, "Upskill yourself with industry experts. Learn new technologies and best practices."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center items-center"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm",
    onClick: () => document.getElementById('upcoming-workshops')?.scrollIntoView({
      behavior: 'smooth'
    })
  }, "Explore Workshops")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, workshops.length, "+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Active Workshops")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-accent"
  }, "1000+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Learners Trained")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, "50+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Expert Mentors")))))), /*#__PURE__*/React.createElement("section", {
    id: "upcoming-workshops",
    className: "py-24 px-4 bg-background relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-foreground mb-4"
  }, "Upcoming Workshops"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "Register for hands-on learning sessions from industry experts")), workshops.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-lg"
  }, "No workshops scheduled yet. Check back soon!")) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, workshops.map(workshop => /*#__PURE__*/React.createElement("button", {
    key: workshop.id,
    onClick: () => navigate(`/workshops/${workshop.id}`),
    className: "group text-left hover:no-underline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition"
  }), /*#__PURE__*/React.createElement(Card, {
    className: "relative bg-white dark:bg-slate-900 border-border hover:shadow-xl transition-all group-hover:scale-105 h-full flex flex-col cursor-pointer"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent/20 text-accent hover:bg-accent/30"
  }, workshop.status), workshop.difficulty && /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, workshop.difficulty)), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl text-foreground"
  }, workshop.title), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-base mt-2"
  }, workshop.description)), /*#__PURE__*/React.createElement(CardContent, {
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
  }, workshop.date))), workshop.duration && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-5 h-5 text-accent"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Duration"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, workshop.duration))), workshop.organizer && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-5 h-5 text-primary"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Organizer"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, workshop.organizer))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-foreground"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-accent"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground"
  }, "Capacity"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold"
  }, workshop.capacity || 0, " Seats"))), workshop.tags && workshop.tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-muted-foreground mb-2"
  }, "Topics Covered"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, workshop.tags.map((tag, i) => /*#__PURE__*/React.createElement(Badge, {
    key: i,
    variant: "secondary",
    className: "text-xs"
  }, tag)))))))))))), /*#__PURE__*/React.createElement("section", {
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
  }, "Workshop Tips"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-white/90"
  }, "Get the most out of your learning experience")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, [{
    num: "1",
    title: "Prepare Ahead",
    desc: "Review prerequisites and install required software"
  }, {
    num: "2",
    title: "Engage Actively",
    desc: "Ask questions and participate in hands-on exercises"
  }, {
    num: "3",
    title: "Take Notes",
    desc: "Document key learnings and code snippets"
  }, {
    num: "4",
    title: "Practice Later",
    desc: "Apply what you learned in real projects"
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
export default Workshops;