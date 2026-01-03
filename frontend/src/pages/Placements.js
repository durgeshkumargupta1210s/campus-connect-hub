import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, TrendingUp, Search, DollarSign, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
// Removed sample data initialization - using backend API
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOpportunities } from "@/hooks/useOpportunities";
// Removed dummy data - using backend API

const Placements = () => {
  const navigate = useNavigate();
  const {
    loadOpportunities,
    opportunities,
    getActiveOpportunities,
    getUpcomingOpportunities
  } = useOpportunities();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);
  useEffect(() => {
    let filtered = opportunities;

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter(opp => opp.type === selectedType);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(opp => opp.title.toLowerCase().includes(search) || opp.company.toLowerCase().includes(search) || opp.description?.toLowerCase().includes(search) || opp.location?.toLowerCase().includes(search));
    }
    setFilteredOpportunities(filtered);
  }, [opportunities, searchTerm, selectedType]);
  const activeOpps = filteredOpportunities.filter(opp => opp.status === 'Active');
  const upcomingOpps = filteredOpportunities.filter(opp => opp.status === 'Upcoming');
  const OpportunityCard = ({
    opportunity
  }) => {
    const typeColor = {
      'Job': 'bg-blue-100 text-blue-800',
      'Internship': 'bg-green-100 text-green-800',
      'Fellowship': 'bg-purple-100 text-purple-800'
    };
    return /*#__PURE__*/React.createElement(Card, {
      className: "hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "pt-6 h-full flex flex-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold text-slate-900"
    }, opportunity.title), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-600 font-semibold"
    }, opportunity.company)), /*#__PURE__*/React.createElement(Badge, {
      className: typeColor[opportunity.type]
    }, opportunity.type)), opportunity.description && /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-600 mb-4 line-clamp-2"
    }, opportunity.description), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-2 mb-4"
    }, opportunity.ctc && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(DollarSign, {
      className: "w-4 h-4 text-green-600"
    }), /*#__PURE__*/React.createElement("span", null, opportunity.ctc)), opportunity.positions && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(Briefcase, {
      className: "w-4 h-4 text-blue-600"
    }), /*#__PURE__*/React.createElement("span", null, opportunity.positions, " positions")), opportunity.location && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(MapPin, {
      className: "w-4 h-4 text-red-600"
    }), /*#__PURE__*/React.createElement("span", null, opportunity.location)), opportunity.deadline && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(Calendar, {
      className: "w-4 h-4 text-orange-600"
    }), /*#__PURE__*/React.createElement("span", null, new Date(opportunity.deadline).toLocaleDateString('en-IN')))), opportunity.skills && opportunity.skills.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "mb-4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-semibold text-slate-700 mb-2"
    }, "Skills Required:"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-1"
    }, opportunity.skills.slice(0, 3).map((skill, idx) => /*#__PURE__*/React.createElement(Badge, {
      key: idx,
      variant: "outline",
      className: "text-xs"
    }, skill)), opportunity.skills.length > 3 && /*#__PURE__*/React.createElement(Badge, {
      variant: "outline",
      className: "text-xs"
    }, "+", opportunity.skills.length - 3, " more"))), /*#__PURE__*/React.createElement("div", {
      className: "mt-auto flex gap-2 pt-4 border-t"
    }, opportunity.applyLink ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
      href: opportunity.applyLink,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex-1",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Button, {
      className: "w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
    }, "Apply Now ", /*#__PURE__*/React.createElement(ExternalLink, {
      className: "w-3 h-3 ml-2"
    }))), /*#__PURE__*/React.createElement(Link, {
      to: `/opportunity/${opportunity.id}`,
      className: "flex-1",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      className: "w-full"
    }, "Details"))) : /*#__PURE__*/React.createElement(Link, {
      to: `/opportunity/${opportunity.id}`,
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Button, {
      className: "w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
    }, "View & Apply")))));
  };
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
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4 text-white"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm font-medium"
  }, "Build Your Career")), /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-7xl font-bold text-white mb-6"
  }, "Placement & ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "bg-gradient-accent bg-clip-text text-transparent"
  }, "Career Opportunities")), /*#__PURE__*/React.createElement("p", {
    className: "text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
  }, "Your gateway to dream careers! Stay updated with the latest placement drives from top companies."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center items-center"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-glow transition-all",
    onClick: () => {
      document.getElementById('career-opportunities')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, "View All Openings"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    className: "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm",
    onClick: () => navigate("/resume-analysis")
  }, "Upload Resume")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, "250+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Placed Students")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-accent"
  }, "50+"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Companies")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-white"
  }, "95%"), /*#__PURE__*/React.createElement("div", {
    className: "text-white/80 text-sm"
  }, "Placement Rate")))))), /*#__PURE__*/React.createElement("section", {
    id: "career-opportunities",
    className: "py-20 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-slate-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-slate-900 mb-2"
  }, "Career Opportunities"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-lg"
  }, "Explore job openings, internships, and fellowships from top companies")), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8 border-0 shadow-md"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-3 w-5 h-5 text-slate-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by job title, company, location...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "pl-10"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-slate-700 mb-2"
  }, "Filter by Type:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, ['All', 'Job', 'Internship', 'Fellowship'].map(type => /*#__PURE__*/React.createElement(Button, {
    key: type,
    variant: selectedType === type ? 'default' : 'outline',
    onClick: () => setSelectedType(type),
    className: selectedType === type ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' : ''
  }, type))))))), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "active",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-2"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "active"
  }, "Active (", activeOpps.length, ")"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "upcoming"
  }, "Upcoming (", upcomingOpps.length, ")")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "active",
    className: "space-y-4"
  }, activeOpps.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, activeOpps.map(opportunity => /*#__PURE__*/React.createElement(OpportunityCard, {
    key: opportunity.id,
    opportunity: opportunity
  }))) : /*#__PURE__*/React.createElement(Card, {
    className: "border-2 border-dashed"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "flex flex-col items-center justify-center py-12"
  }, /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-12 h-12 text-slate-400 mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-center"
  }, searchTerm ? 'No opportunities match your search criteria' : 'No active opportunities at the moment')))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "upcoming",
    className: "space-y-4"
  }, upcomingOpps.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, upcomingOpps.map(opportunity => /*#__PURE__*/React.createElement(OpportunityCard, {
    key: opportunity.id,
    opportunity: opportunity
  }))) : /*#__PURE__*/React.createElement(Card, {
    className: "border-2 border-dashed"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "flex flex-col items-center justify-center py-12"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-12 h-12 text-slate-400 mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-center"
  }, searchTerm ? 'No upcoming opportunities match your search criteria' : 'No upcoming opportunities at the moment'))))), filteredOpportunities.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-blue-600"
  }, filteredOpportunities.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Total Opportunities"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-green-600"
  }, new Set(filteredOpportunities.map(o => o.company)).size), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Companies"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-purple-600"
  }, filteredOpportunities.reduce((sum, o) => sum + (o.positions || 0), 0)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Total Positions"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-orange-600"
  }, activeOpps.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Actively Hiring")))))), /*#__PURE__*/React.createElement("section", {
    className: "py-24 px-4 bg-gradient-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl md:text-5xl font-bold text-white mb-6"
  }, "Ready to Start Your Career?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-white/90 mb-8 max-w-2xl mx-auto"
  }, "Upload your resume and apply for your dream job today"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/resources"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    className: "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-glow"
  }, "Prepare Now")))))), /*#__PURE__*/React.createElement(Footer, null));
};
export default Placements;