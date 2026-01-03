import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useOpportunities } from '@/hooks/useOpportunities';
import { MapPin, Calendar, Users, DollarSign, ExternalLink, Search, Clock } from 'lucide-react';
import React from "react";
export default function CampusDrives() {
  const {
    loadCampusDrives,
    campusDrives
  } = useOpportunities();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrives, setFilteredDrives] = useState([]);
  useEffect(() => {
    loadCampusDrives();
  }, [loadCampusDrives]);
  useEffect(() => {
    let filtered = campusDrives;

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(drive => drive.company.toLowerCase().includes(search) || drive.description?.toLowerCase().includes(search) || drive.venue?.toLowerCase().includes(search) || drive.roles?.some(role => role.toLowerCase().includes(search)));
    }
    setFilteredDrives(filtered);
  }, [campusDrives, searchTerm]);
  const upcomingDrives = filteredDrives.filter(d => d.status === 'Upcoming');
  const ongoingDrives = filteredDrives.filter(d => d.status === 'Ongoing');
  const completedDrives = filteredDrives.filter(d => d.status === 'Completed');
  const getStatusColor = status => {
    switch (status) {
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  const CampusDriveCard = ({
    drive
  }) => {
    const isRegistrationOpen = new Date(drive.registrationDeadline) > new Date();
    const daysLeft = Math.ceil((new Date(drive.registrationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return /*#__PURE__*/React.createElement(Card, {
      className: "hover:shadow-lg transition-shadow overflow-hidden"
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "pt-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between items-start mb-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-slate-900"
    }, drive.company), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-600 mt-1"
    }, "Campus Recruitment Drive")), /*#__PURE__*/React.createElement(Badge, {
      className: getStatusColor(drive.status)
    }, drive.status)), drive.description && /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-600 mb-4 line-clamp-2"
    }, drive.description), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(Calendar, {
      className: "w-4 h-4 text-blue-600"
    }), /*#__PURE__*/React.createElement("span", null, "Drive: ", new Date(drive.driveDate).toLocaleDateString('en-IN'))), isRegistrationOpen && daysLeft > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-orange-700 font-semibold bg-orange-50 px-2 py-1 rounded"
    }, /*#__PURE__*/React.createElement(Clock, {
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, "Register in ", daysLeft, " days")), drive.venue && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(MapPin, {
      className: "w-4 h-4 text-red-600"
    }), /*#__PURE__*/React.createElement("span", null, drive.venue)), drive.ctc && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(DollarSign, {
      className: "w-4 h-4 text-green-600"
    }), /*#__PURE__*/React.createElement("span", null, "CTC: ", drive.ctc)), drive.positions && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-sm text-slate-700"
    }, /*#__PURE__*/React.createElement(Users, {
      className: "w-4 h-4 text-purple-600"
    }), /*#__PURE__*/React.createElement("span", null, drive.positions, " positions"))), drive.roles && drive.roles.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "mb-4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-semibold text-slate-700 mb-2"
    }, "Roles:"), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-1"
    }, drive.roles.map((role, idx) => /*#__PURE__*/React.createElement(Badge, {
      key: idx,
      variant: "outline",
      className: "text-xs"
    }, role)))), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2 pt-4 border-t"
    }, /*#__PURE__*/React.createElement(Link, {
      to: `/campus-drive/${drive.id}`,
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      className: "w-full"
    }, "View Details")), drive.registrationLink && isRegistrationOpen && /*#__PURE__*/React.createElement("a", {
      href: drive.registrationLink,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(Button, {
      className: "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    }, "Register ", /*#__PURE__*/React.createElement(ExternalLink, {
      className: "w-3 h-3 ml-2"
    }))))));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-slate-900 mb-2"
  }, "Campus Recruitment Drives"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-lg"
  }, "Connect with top companies and kickstart your career journey")), /*#__PURE__*/React.createElement(Card, {
    className: "mb-8 border-0 shadow-md"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-3 w-5 h-5 text-slate-400"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search by company name, roles, location...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "pl-10"
  })))), /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "upcoming",
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(TabsList, {
    className: "grid w-full grid-cols-3"
  }, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "upcoming"
  }, "Upcoming (", upcomingDrives.length, ")"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "ongoing"
  }, "Ongoing (", ongoingDrives.length, ")"), /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "completed"
  }, "Completed (", completedDrives.length, ")")), /*#__PURE__*/React.createElement(TabsContent, {
    value: "upcoming",
    className: "space-y-4"
  }, upcomingDrives.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, upcomingDrives.map(drive => /*#__PURE__*/React.createElement(CampusDriveCard, {
    key: drive.id,
    drive: drive
  }))) : /*#__PURE__*/React.createElement(Card, {
    className: "border-2 border-dashed"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "flex flex-col items-center justify-center py-12"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-12 h-12 text-slate-400 mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-center"
  }, searchTerm ? 'No upcoming drives match your search criteria' : 'No upcoming drives at the moment')))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "ongoing",
    className: "space-y-4"
  }, ongoingDrives.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, ongoingDrives.map(drive => /*#__PURE__*/React.createElement(CampusDriveCard, {
    key: drive.id,
    drive: drive
  }))) : /*#__PURE__*/React.createElement(Card, {
    className: "border-2 border-dashed"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "flex flex-col items-center justify-center py-12"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-12 h-12 text-slate-400 mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-center"
  }, searchTerm ? 'No ongoing drives match your search criteria' : 'No ongoing drives at the moment')))), /*#__PURE__*/React.createElement(TabsContent, {
    value: "completed",
    className: "space-y-4"
  }, completedDrives.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, completedDrives.map(drive => /*#__PURE__*/React.createElement(CampusDriveCard, {
    key: drive.id,
    drive: drive
  }))) : /*#__PURE__*/React.createElement(Card, {
    className: "border-2 border-dashed"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "flex flex-col items-center justify-center py-12"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-12 h-12 text-slate-400 mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-center"
  }, searchTerm ? 'No completed drives match your search criteria' : 'No completed drives to display'))))), filteredDrives.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-blue-600"
  }, filteredDrives.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Total Drives"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-purple-600"
  }, upcomingDrives.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Upcoming"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-green-600"
  }, filteredDrives.reduce((sum, d) => sum + (d.positions || 0), 0)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Total Positions"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-orange-600"
  }, new Set(filteredDrives.map(d => d.company)).size), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-2"
  }, "Companies"))))));
}