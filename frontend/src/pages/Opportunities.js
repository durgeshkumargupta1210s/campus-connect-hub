import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useOpportunities } from '@/hooks/useOpportunities';
import { MapPin, Briefcase, Calendar, DollarSign, ExternalLink, Search } from 'lucide-react';
import React from "react";

console.log('🔥🔥🔥 OPPORTUNITIES FILE LOADED - NEW VERSION 🔥🔥🔥');

export default function Opportunities() {
  console.log('⭐⭐⭐ OPPORTUNITIES COMPONENT RENDERING ⭐⭐⭐');
  
  const {
    loadOpportunities,
    opportunities,
    loading
  } = useOpportunities();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);
  
  // Apply filters
  let filteredOpportunities = [...opportunities];
  
  // Filter by type
  if (selectedType !== 'All') {
    const normalizedSelectedType = selectedType.toLowerCase().replace(/\s+/g, '_');
    filteredOpportunities = filteredOpportunities.filter(opp => {
      const oppType = (opp.type || '').toLowerCase();
      return oppType === normalizedSelectedType;
    });
  }

  // Filter by search term
  if (searchTerm.trim()) {
    const search = searchTerm.toLowerCase();
    filteredOpportunities = filteredOpportunities.filter(opp => 
      (opp.title || '').toLowerCase().includes(search) || 
      (opp.company || '').toLowerCase().includes(search) || 
      (opp.description || '').toLowerCase().includes(search) || 
      (opp.location || '').toLowerCase().includes(search)
    );
  }
  
  // Filter active opportunities
  const activeOpps = filteredOpportunities.filter(opp => 
    opp.status && String(opp.status).toLowerCase() === 'active'
  );
  
  // Filter upcoming opportunities (active with future deadline)
  const now = new Date();
  const upcomingOpps = filteredOpportunities.filter(opp => {
    if (!opp.status || String(opp.status).toLowerCase() !== 'active') return false;
    if (!opp.deadline) return false;
    const deadlineDate = new Date(opp.deadline);
    return deadlineDate > now;
  });
  const OpportunityCard = ({
    opportunity
  }) => {
    // Helper function to format type display
    const formatType = (type) => {
      if (!type) return 'Other';
      // Convert snake_case to Title Case
      return type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    
    const getTypeColor = (type) => {
      const lowerType = type?.toLowerCase() || 'other';
      const colorMap = {
        'job': 'bg-blue-100 text-blue-800',
        'internship': 'bg-green-100 text-green-800',
        'fellowship': 'bg-purple-100 text-purple-800',
        'placement': 'bg-indigo-100 text-indigo-800',
        'campus_drive': 'bg-orange-100 text-orange-800',
        'workshop': 'bg-pink-100 text-pink-800',
        'hackathon': 'bg-red-100 text-red-800',
        'other': 'bg-gray-100 text-gray-800'
      };
      return colorMap[lowerType] || colorMap['other'];
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
      className: getTypeColor(opportunity.type)
    }, formatType(opportunity.type))), opportunity.description && /*#__PURE__*/React.createElement("p", {
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
      to: `/opportunity/${opportunity._id || opportunity.id}`,
      className: "flex-1",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      className: "w-full"
    }, "Details"))) : /*#__PURE__*/React.createElement(Link, {
      to: `/opportunity/${opportunity._id || opportunity.id}`,
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Button, {
      className: "w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
    }, "View & Apply")))));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-slate-900 mb-2"
  }, "Career Opportunities"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-lg"
  }, "Explore job openings, internships, and fellowships from top companies")), loading ? /*#__PURE__*/React.createElement(Card, {
    className: "mb-8 border-0 shadow-md"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center py-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600"
  }, "Loading opportunities..."))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
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
  }, ['All', 'Internship', 'Placement', 'Campus Drive', 'Workshop', 'Hackathon'].map(type => /*#__PURE__*/React.createElement(Button, {
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
    key: opportunity._id || opportunity.id,
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
    key: opportunity._id || opportunity.id,
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
  }, "Actively Hiring")))))));
}