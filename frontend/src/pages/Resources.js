import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Code2, Brain, Award, Download, ExternalLink } from "lucide-react";
import React from "react";
const categories = [{
  title: "Programming",
  icon: /*#__PURE__*/React.createElement(Code2, {
    className: "w-8 h-8"
  }),
  count: "150+ resources",
  color: "text-primary"
}, {
  title: "Data Structures",
  icon: /*#__PURE__*/React.createElement(Brain, {
    className: "w-8 h-8"
  }),
  count: "120+ resources",
  color: "text-accent"
}, {
  title: "Interview Prep",
  icon: /*#__PURE__*/React.createElement(Award, {
    className: "w-8 h-8"
  }),
  count: "80+ resources",
  color: "text-primary"
}, {
  title: "Development",
  icon: /*#__PURE__*/React.createElement(Code2, {
    className: "w-8 h-8"
  }),
  count: "200+ resources",
  color: "text-accent"
}];
const resources = [{
  title: "Complete DSA Guide",
  type: "PDF",
  icon: /*#__PURE__*/React.createElement(FileText, {
    className: "w-6 h-6"
  }),
  size: "15 MB",
  downloads: "1,250",
  category: "Data Structures"
}, {
  title: "Web Development Bootcamp",
  type: "Video Course",
  icon: /*#__PURE__*/React.createElement(Video, {
    className: "w-6 h-6"
  }),
  size: "25 hours",
  downloads: "850",
  category: "Development"
}, {
  title: "Python Programming Notes",
  type: "PDF",
  icon: /*#__PURE__*/React.createElement(FileText, {
    className: "w-6 h-6"
  }),
  size: "8 MB",
  downloads: "2,100",
  category: "Programming"
}, {
  title: "Interview Questions Bank",
  type: "Document",
  icon: /*#__PURE__*/React.createElement(FileText, {
    className: "w-6 h-6"
  }),
  size: "5 MB",
  downloads: "3,500",
  category: "Interview Prep"
}, {
  title: "React.js Complete Guide",
  type: "PDF",
  icon: /*#__PURE__*/React.createElement(FileText, {
    className: "w-6 h-6"
  }),
  size: "12 MB",
  downloads: "1,680",
  category: "Development"
}, {
  title: "Machine Learning Basics",
  type: "Video Course",
  icon: /*#__PURE__*/React.createElement(Video, {
    className: "w-6 h-6"
  }),
  size: "18 hours",
  downloads: "920",
  category: "Programming"
}];
const Resources = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-gradient-hero py-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto text-center"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-20 h-20 text-white mx-auto mb-6 animate-float"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-6xl font-bold text-white mb-6"
  }, "Study Resources Hub"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-white/90 max-w-2xl mx-auto mb-8"
  }, "Access curated study materials, training programs, and skill development resources - all in one place!"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-accent hover:bg-accent/90 text-accent-foreground",
    onClick: () => {
      document.getElementById('popular-resources')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, "Browse Resources")))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold mb-12"
  }, "Browse by Category"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, categories.map((category, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer group"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: `${category.color} mb-4 group-hover:animate-float`
  }, category.icon), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl"
  }, category.title), /*#__PURE__*/React.createElement(CardDescription, null, category.count)), /*#__PURE__*/React.createElement(CardFooter, null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    className: "w-full"
  }, "Explore"))))))), /*#__PURE__*/React.createElement("section", {
    id: "popular-resources",
    className: "py-20 px-4 bg-secondary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold"
  }, "Popular Resources"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "View All")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, resources.map((resource, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "bg-gradient-card border-border hover:shadow-lg transition-all group"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-primary"
  }, resource.icon), /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, resource.type)), /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl"
  }, resource.title), /*#__PURE__*/React.createElement(CardDescription, null, resource.category)), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, "Size:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, resource.size)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted-foreground"
  }, "Downloads:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-primary"
  }, resource.downloads))), /*#__PURE__*/React.createElement(CardFooter, {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
  }, /*#__PURE__*/React.createElement(Download, {
    className: "w-4 h-4 mr-2"
  }), "Download"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon"
  }, /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4"
  })))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold mb-12"
  }, "Skill Development Programs"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
  }, [{
    title: "Full Stack Development",
    duration: "12 weeks",
    level: "Intermediate",
    enrolled: "120 students"
  }, {
    title: "Data Science with Python",
    duration: "10 weeks",
    level: "Beginner",
    enrolled: "95 students"
  }, {
    title: "Mobile App Development",
    duration: "8 weeks",
    level: "Intermediate",
    enrolled: "85 students"
  }, {
    title: "Cloud Computing Basics",
    duration: "6 weeks",
    level: "Beginner",
    enrolled: "110 students"
  }].map((program, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "bg-gradient-card border-border hover:shadow-lg transition-all"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-xl"
  }, program.title), /*#__PURE__*/React.createElement(Badge, null, program.level)), /*#__PURE__*/React.createElement(CardDescription, null, "Duration: ", program.duration)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm text-muted-foreground"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, program.enrolled, " enrolled"))), /*#__PURE__*/React.createElement(CardFooter, null, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground"
  }, "Enroll Now"))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-gradient-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-center text-white mb-12"
  }, "Resources by Numbers"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
  }, [{
    number: "500+",
    label: "Study Materials"
  }, {
    number: "50+",
    label: "Video Courses"
  }, {
    number: "10,000+",
    label: "Downloads"
  }, {
    number: "20+",
    label: "Training Programs"
  }].map((stat, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-bold text-white mb-2"
  }, stat.number), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80"
  }, stat.label))))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default Resources;