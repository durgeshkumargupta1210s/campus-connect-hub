import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useClubs } from "@/hooks/useClubs";
import { Users, Heart, Code2, Palette, Music, Camera, Mic, BookOpen } from "lucide-react";
import React from "react";
const Community = () => {
  const navigate = useNavigate();
  const {
    clubs,
    loadClubs
  } = useClubs();
  const [displayClubs, setDisplayClubs] = useState([]);
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);
  useEffect(() => {
    if (clubs.length > 0) {
      setDisplayClubs(clubs);
    }
  }, [clubs]);
  const getClubIcon = clubName => {
    const iconMap = {
      "Coding Club": /*#__PURE__*/React.createElement(Code2, {
        className: "w-8 h-8"
      }),
      "Design Society": /*#__PURE__*/React.createElement(Palette, {
        className: "w-8 h-8"
      }),
      "Music Club": /*#__PURE__*/React.createElement(Music, {
        className: "w-8 h-8"
      }),
      "Photography Club": /*#__PURE__*/React.createElement(Camera, {
        className: "w-8 h-8"
      }),
      "Debate Society": /*#__PURE__*/React.createElement(Mic, {
        className: "w-8 h-8"
      }),
      "Literary Club": /*#__PURE__*/React.createElement(BookOpen, {
        className: "w-8 h-8"
      })
    };
    return iconMap[clubName] || /*#__PURE__*/React.createElement(Users, {
      className: "w-8 h-8"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold"
  }, "Active Clubs"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-accent text-accent-foreground"
  }, displayClubs.length, " Communities")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, displayClubs.map(club => /*#__PURE__*/React.createElement(Card, {
    key: club.id,
    className: "bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 group overflow-hidden cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-32 ${club.color} relative flex items-center justify-center`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-white group-hover:animate-float"
  }, getClubIcon(club.name))), /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl"
  }, club.name), /*#__PURE__*/React.createElement(CardDescription, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4"
  }), club.members, "+ members")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, club.description), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, club.tags.map((tag, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    variant: "secondary",
    className: "text-xs"
  }, tag)))), /*#__PURE__*/React.createElement(CardFooter, {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
    onClick: () => navigate(`/club/${club.id}`)
  }, "View Details"))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-secondary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-center mb-12"
  }, "Why Join a Club?"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
  }, [{
    icon: /*#__PURE__*/React.createElement(Users, {
      className: "w-12 h-12"
    }),
    title: "Build Your Network",
    description: "Connect with students who share your passions and interests across all years."
  }, {
    icon: /*#__PURE__*/React.createElement(Heart, {
      className: "w-12 h-12"
    }),
    title: "Pursue Your Passion",
    description: "Dedicate time to what you love while balancing academics and personal growth."
  }, {
    icon: /*#__PURE__*/React.createElement(BookOpen, {
      className: "w-12 h-12"
    }),
    title: "Learn New Skills",
    description: "Develop leadership, teamwork, and technical skills through hands-on experience."
  }].map((benefit, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-primary mb-4 flex justify-center"
  }, benefit.icon), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-3"
  }, benefit.title), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, benefit.description)))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-gradient-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-white mb-6"
  }, "Start Your Club Journey"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-white/90 mb-8 max-w-2xl mx-auto"
  }, "Don't see a club that matches your interest? Start your own community!"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-accent hover:bg-accent/90 text-accent-foreground"
  }, "Create a Club")))), /*#__PURE__*/React.createElement(Footer, null));
};
export default Community;