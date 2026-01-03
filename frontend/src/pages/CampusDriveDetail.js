import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useOpportunities } from '@/hooks/useOpportunities';
import { MapPin, Calendar, DollarSign, ExternalLink, ArrowLeft, Mail, Phone, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import React from "react";
export default function CampusDriveDetail() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    campusDrives,
    loadCampusDrives
  } = useOpportunities();
  const [drive, setDrive] = useState(null);
  useEffect(() => {
    loadCampusDrives();
  }, [loadCampusDrives]);
  useEffect(() => {
    if (id && campusDrives.length > 0) {
      const found = campusDrives.find(d => d.id === id);
      setDrive(found || null);
    }
  }, [id, campusDrives]);
  if (!drive) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(Card, {
      className: "max-w-md"
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "pt-6 text-center"
    }, /*#__PURE__*/React.createElement(AlertCircle, {
      className: "w-12 h-12 text-slate-400 mx-auto mb-4"
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 mb-4"
    }, "Campus drive not found"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate('/campus-drives')
    }, "Back to Campus Drives"))));
  }
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
  const isRegistrationOpen = new Date(drive.registrationDeadline) > new Date();
  const daysLeft = Math.ceil((new Date(drive.registrationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const daysUntilDrive = Math.ceil((new Date(drive.driveDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => navigate('/campus-drives'),
    className: "mb-6"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back to Campus Drives"), /*#__PURE__*/React.createElement(Card, {
    className: "mb-6 border-0 shadow-lg"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl md:text-4xl font-bold text-slate-900"
  }, drive.company), /*#__PURE__*/React.createElement(Badge, {
    className: getStatusColor(drive.status)
  }, drive.status)), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-slate-700 font-semibold"
  }, "Campus Recruitment Drive"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
  }, drive.ctc && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-5 h-5 text-green-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "CTC"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, drive.ctc))), drive.positions && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Positions"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, drive.positions))), drive.driveDate && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-orange-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Drive Date"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, new Date(drive.driveDate).toLocaleDateString('en-IN')))), drive.registrationDeadline && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-5 h-5 text-red-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Register By"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, new Date(drive.registrationDeadline).toLocaleDateString('en-IN'))))), !isRegistrationOpen ? /*#__PURE__*/React.createElement(Alert, {
    variant: "destructive"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement(AlertDescription, null, "Registration deadline has passed")) : daysLeft <= 3 ? /*#__PURE__*/React.createElement(Alert, {
    className: "border-orange-200 bg-orange-50"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "h-4 w-4 text-orange-600"
  }), /*#__PURE__*/React.createElement(AlertDescription, {
    className: "text-orange-800"
  }, "Only ", daysLeft, " day", daysLeft !== 1 ? 's' : '', " left to register!")) : /*#__PURE__*/React.createElement(Alert, {
    className: "border-green-200 bg-green-50"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "h-4 w-4 text-green-600"
  }), /*#__PURE__*/React.createElement(AlertDescription, {
    className: "text-green-800"
  }, "Registration is open! ", daysLeft, " days remaining. Drive in ", daysUntilDrive, " day", daysUntilDrive !== 1 ? 's' : '', ".")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-6"
  }, drive.description && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "About the Drive")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700 whitespace-pre-line"
  }, drive.description))), drive.roles && drive.roles.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Roles Available")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, drive.roles.map((role, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    className: "bg-blue-100 text-blue-800 text-sm py-1 px-3"
  }, role))))), drive.eligibility && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Eligibility Criteria")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700 whitespace-pre-line"
  }, drive.eligibility))), drive.recruitmentProcess && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Recruitment Process")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700 whitespace-pre-line"
  }, drive.recruitmentProcess))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Drive Details")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, drive.expectedTime && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Expected Duration"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900 font-semibold"
  }, drive.expectedTime)), drive.venue && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-5 h-5 text-red-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Venue"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900 font-semibold"
  }, drive.venue)))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, isRegistrationOpen && drive.registrationLink && /*#__PURE__*/React.createElement(Card, {
    className: "border-green-200 bg-green-50"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("a", {
    href: drive.registrationLink,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6 mb-4"
  }, "Register Now ", /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 ml-2"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 text-center"
  }, daysLeft, " day", daysLeft !== 1 ? 's' : '', " to register"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Contact Information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, drive.contactPerson && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Contact Person"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900 font-semibold"
  }, drive.contactPerson)), drive.contactEmail && /*#__PURE__*/React.createElement("a", {
    href: `mailto:${drive.contactEmail}`,
    className: "flex items-center gap-3 text-slate-700 hover:text-blue-600"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "break-all text-sm"
  }, drive.contactEmail)), drive.contactPhone && /*#__PURE__*/React.createElement("a", {
    href: `tel:${drive.contactPhone}`,
    className: "flex items-center gap-3 text-slate-700 hover:text-blue-600"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, drive.contactPhone)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Quick Facts")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Status"), /*#__PURE__*/React.createElement(Badge, {
    className: getStatusColor(drive.status)
  }, drive.status)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Hiring For"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900 font-semibold"
  }, drive.positions, " position", drive.positions !== 1 ? 's' : '')), drive.createdDate && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Posted"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900"
  }, new Date(drive.createdDate).toLocaleDateString('en-IN')))))))));
}