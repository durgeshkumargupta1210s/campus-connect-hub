import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trophy, Zap, Users, BookOpen } from "lucide-react";
import React from "react";
const Hero = () => {
  const navigate = useNavigate();
  return /*#__PURE__*/React.createElement("section", {
    className: "relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-hero pt-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-24 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-4 h-4 text-white"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm font-medium"
  }, "Where Every Student Stays Connected!")), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in [animation-delay:0.1s]"
  }, "Welcome to ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "bg-gradient-accent bg-clip-text text-transparent"
  }, "CampusConnect")), /*#__PURE__*/React.createElement("p", {
    className: "text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:0.2s]"
  }, "A smart campus ecosystem designed to make every college moment smoother, smarter & more exciting!"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in [animation-delay:0.3s]"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => navigate("/create-account"),
    className: "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-glow transition-all"
  }, "Create Account")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in [animation-delay:0.4s]"
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(Trophy, null),
    title: "Events",
    onClick: () => navigate("/events")
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(Zap, null),
    title: "Career Growth",
    onClick: () => navigate("/placements")
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(Users, null),
    title: "Community",
    onClick: () => navigate("/community")
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    icon: /*#__PURE__*/React.createElement(BookOpen, null),
    title: "Resources",
    onClick: () => navigate("/resources")
  })))));
};
const FeatureCard = ({
  icon,
  title,
  onClick
}) => {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    className: "bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-white mb-3 flex justify-center"
  }, icon), /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-semibold"
  }, title));
};
export default Hero;