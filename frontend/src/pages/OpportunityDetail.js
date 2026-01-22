import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';
import { APIClient, API_ENDPOINTS } from '@/config/api';
import { MapPin, Calendar, DollarSign, ExternalLink, ArrowLeft, Mail, Phone, Users, CheckCircle2, AlertCircle, Upload, FileText, CheckCircle } from 'lucide-react';
import React from "react";
export default function OpportunityDetail() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  const {
    opportunities,
    loadOpportunities
  } = useOpportunities();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Function to fetch opportunity directly from API
  const fetchOpportunityFromAPI = async (opportunityId) => {
    try {
      const response = await fetch(`/api/opportunities/${opportunityId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched opportunity from API:', data);
        setOpportunity(data);
        return data;
      }
    } catch (err) {
      console.error('Failed to fetch opportunity:', err);
    }
    return null;
  };
  
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);
  
  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      console.log('Fetching opportunity with ID:', id);
      
      // First try to find in cached opportunities
      if (opportunities.length > 0) {
        const found = opportunities.find(o => (o._id || o.id) === id);
        if (found) {
          console.log('Found in cache:', found);
          setOpportunity(found);
          setLoading(false);
          return;
        }
      }
      
      // If not found in cache, fetch directly from API
      try {
        console.log('Fetching from API...');
        const response = await fetch(`/api/opportunities/${id}`);
        console.log('Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched opportunity:', data);
          setOpportunity(data);
        } else {
          console.log('Response not OK');
          setOpportunity(null);
        }
      } catch (err) {
        console.error('Failed to fetch opportunity:', err);
        setOpportunity(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunity();
  }, [id, opportunities]);
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
    }), /*#__PURE__*/React.createElement("p", {
      className: "mt-4 text-slate-600"
    }, "Loading opportunity...")));
  }
  if (!opportunity) {
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
    }, "Opportunity not found"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate('/opportunities')
    }, "Back to Opportunities"))));
  }
  const typeColor = {
    'Job': 'bg-blue-100 text-blue-800',
    'Internship': 'bg-green-100 text-green-800',
    'Fellowship': 'bg-purple-100 text-purple-800'
  };
  const isDeadlinePassed = new Date(opportunity.deadline) < new Date();
  const daysLeft = Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => navigate('/opportunities'),
    className: "mb-6"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4 mr-2"
  }), "Back to Opportunities"), /*#__PURE__*/React.createElement(Card, {
    className: "mb-6 border-0 shadow-lg"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl md:text-4xl font-bold text-slate-900"
  }, opportunity.title), /*#__PURE__*/React.createElement(Badge, {
    className: typeColor[opportunity.type]
  }, opportunity.type)), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-slate-700 font-semibold"
  }, opportunity.company))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
  }, opportunity.ctc && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(DollarSign, {
    className: "w-5 h-5 text-green-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "CTC/Stipend"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, opportunity.ctc))), opportunity.positions && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Positions"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, opportunity.positions))), opportunity.location && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-5 h-5 text-red-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Location"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, opportunity.location))), opportunity.deadline && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-orange-600"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Deadline"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, new Date(opportunity.deadline).toLocaleDateString('en-IN'))))), isDeadlinePassed ? /*#__PURE__*/React.createElement(Alert, {
    variant: "destructive"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement(AlertDescription, null, "Application deadline has passed")) : daysLeft <= 3 && daysLeft > 0 ? /*#__PURE__*/React.createElement(Alert, {
    className: "border-orange-200 bg-orange-50"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "h-4 w-4 text-orange-600"
  }), /*#__PURE__*/React.createElement(AlertDescription, {
    className: "text-orange-800"
  }, "Only ", daysLeft, " day", daysLeft !== 1 ? 's' : '', " left to apply!")) : /*#__PURE__*/React.createElement(Alert, {
    className: "border-green-200 bg-green-50"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "h-4 w-4 text-green-600"
  }), /*#__PURE__*/React.createElement(AlertDescription, {
    className: "text-green-800"
  }, "Applications are open! ", daysLeft, " days remaining to apply.")), !isDeadlinePassed && opportunity.applyLink && /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold mb-1"
  }, "Ready to Apply?"), /*#__PURE__*/React.createElement("p", {
    className: "text-blue-100"
  }, "Click below to submit your application on the company portal")), /*#__PURE__*/React.createElement("a", {
    href: opportunity.applyLink,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "bg-white hover:bg-slate-100 text-blue-600 font-bold px-8 py-6 text-lg whitespace-nowrap"
  }, "Apply Now ", /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 ml-2"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-6"
  }, opportunity.description && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "About the Role")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700 whitespace-pre-line"
  }, opportunity.description))), opportunity.eligibility && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Eligibility Criteria")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700 whitespace-pre-line"
  }, opportunity.eligibility))), opportunity.skills && opportunity.skills.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Required Skills")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, opportunity.skills.map((skill, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    className: "bg-blue-100 text-blue-800"
  }, skill))))), opportunity.tags && opportunity.tags.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Tags")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, opportunity.tags.map((tag, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    variant: "outline"
  }, tag))))), opportunity.jobProfile && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Job Profile/Role")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-700"
  }, opportunity.jobProfile)))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, !isDeadlinePassed && opportunity.applyLink && /*#__PURE__*/React.createElement(Card, {
    className: "border-green-200 bg-green-50"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("a", {
    href: opportunity.applyLink,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6 mb-4"
  }, "Apply Now ", /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 ml-2"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 text-center"
  }, "You will be redirected to the company's application portal"))), /*#__PURE__*/React.createElement(ResumeEligibilityCard, {
    opportunity: opportunity,
    userId: userId
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Contact Information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, opportunity.contactEmail && /*#__PURE__*/React.createElement("a", {
    href: `mailto:${opportunity.contactEmail}`,
    className: "flex items-center gap-3 text-slate-700 hover:text-blue-600"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "break-all"
  }, opportunity.contactEmail)), opportunity.contactPhone && /*#__PURE__*/React.createElement("a", {
    href: `tel:${opportunity.contactPhone}`,
    className: "flex items-center gap-3 text-slate-700 hover:text-blue-600"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", null, opportunity.contactPhone)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Quick Facts")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Type"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900 font-semibold"
  }, opportunity.type)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Status"), /*#__PURE__*/React.createElement(Badge, {
    className: opportunity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
  }, opportunity.status)), opportunity.postedDate && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-600 uppercase"
  }, "Posted"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-900"
  }, new Date(opportunity.postedDate).toLocaleDateString('en-IN')))))))));
}

// Resume Eligibility Card Component
const ResumeEligibilityCard = ({
  opportunity,
  userId
}) => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const isApplyingRef = useRef(false); // Use ref to prevent race conditions
  const {
    analyzeResume,
    analyzing,
    error,
    result,
    resetAnalysis,
    suggestions,
    loadingSuggestions
  } = useResumeAnalysis();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user has already applied on component mount
  useEffect(() => {
    if (userId && opportunity?.applications) {
      const hasApplied = opportunity.applications.some(
        app => {
          // app.userId is populated with { _id, clerkId }
          const appUserId = app.userId?.clerkId || app.userId;
          return appUserId === userId;
        }
      );
      console.log('Checking if applied:', { userId, applications: opportunity.applications, hasApplied });
      setApplied(hasApplied);
    }
  }, [userId, opportunity]);
  const handleFileSelect = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const requiredSkills = opportunity.skills || [];

    // Extract CGPA requirement from eligibility text
    let requiredCGPA;
    if (opportunity.eligibility?.toLowerCase().includes('cgpa')) {
      const cgpaMatch = opportunity.eligibility.match(/cgpa\s*[>=]*\s*(\d+\.?\d*)/i);
      if (cgpaMatch) {
        requiredCGPA = parseFloat(cgpaMatch[1]);
      }
    }
    await analyzeResume(file, requiredSkills, requiredCGPA);
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };
  return /*#__PURE__*/React.createElement(Card, {
    className: "border-0 shadow-lg"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "w-5 h-5 text-blue-600"
  }), "Resume Eligibility Checker"), /*#__PURE__*/React.createElement(CardDescription, null, "Upload your resume to get AI-powered analysis and improvement suggestions")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, !result ? /*#__PURE__*/React.createElement(React.Fragment, null, !showUpload ? /*#__PURE__*/React.createElement(Button, {
    onClick: () => setShowUpload(true),
    variant: "outline",
    className: "w-full flex items-center justify-center gap-2 h-12 border-2 border-dashed hover:border-blue-500 hover:bg-blue-50"
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "w-4 h-4"
  }), "Upload Your Resume") : /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "file",
    accept: ".pdf,.txt,.doc,.docx",
    onChange: handleFileSelect,
    disabled: analyzing,
    className: "cursor-pointer"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "\uD83D\uDCC4 PDF or TXT file (max 5MB)"), analyzing && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, "Analyzing your resume with AI...")), error && /*#__PURE__*/React.createElement(Alert, {
    variant: "destructive"
  }, /*#__PURE__*/React.createElement(AlertDescription, null, "\u26A0\uFE0F ", error)))) : /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('overview'),
    className: `px-4 py-2 font-medium text-sm transition-all ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
  }, "Analysis Results"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('improvements'),
    className: `px-4 py-2 font-medium text-sm transition-all ${activeTab === 'improvements' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
  }, "AI Suggestions")), activeTab === 'overview' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, "Overall Eligibility Score"), /*#__PURE__*/React.createElement("span", {
    className: `text-3xl font-bold ${result.eligibilityScore >= 80 ? 'text-green-600' : result.eligibilityScore >= 60 ? 'text-orange-600' : 'text-red-600'}`
  }, result.eligibilityScore, "%")), /*#__PURE__*/React.createElement("div", {
    className: "eligibility-progress-container"
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    percentage: result.eligibilityScore
  }))), /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-3 p-3 rounded-lg bg-slate-50 border-l-4 ${result.isEligible ? 'status-eligible' : 'status-ineligible'}`
  }, result.isEligible ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-6 h-6 text-green-600 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-green-700"
  }, "You are eligible! \uD83C\uDF89"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600"
  }, "Your profile matches the job requirements"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-6 h-6 text-red-600 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-red-700"
  }, "Needs Improvement"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-red-600"
  }, "Check the suggestions tab for improvements")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50 border border-blue-200 p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-blue-900"
  }, "Analysis: "), result.feedback)), (result.matchedSkills.length > 0 || result.missingSkills.length > 0) && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, result.matchedSkills.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-green-50 p-4 rounded-lg border border-green-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-green-900 mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4"
  }), "Matched Skills (", result.matchedSkills.length, "/", result.matchedSkills.length + result.missingSkills.length, ")"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, result.matchedSkills.map((skill, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    className: "bg-green-200 text-green-900 text-xs font-medium"
  }, "\u2713 ", skill)))), result.missingSkills.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-red-50 p-4 rounded-lg border border-red-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-red-900 mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-4 h-4"
  }), "Missing Skills (", result.missingSkills.length, ")"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, result.missingSkills.map((skill, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    variant: "outline",
    className: "text-xs text-red-700 border-red-300 bg-white"
  }, "\u2715 ", skill))))), result.requiredCGPA && /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 p-4 rounded-lg border border-slate-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900 mb-2 text-sm"
  }, "\uD83D\uDCCA CGPA Requirement"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Required"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-slate-900"
  }, result.requiredCGPA)), result.userCGPA && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl text-slate-400"
  }, "\u2192"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600"
  }, "Your CGPA"), /*#__PURE__*/React.createElement("p", {
    className: `text-lg font-bold ${result.userCGPA >= result.requiredCGPA ? 'text-green-600' : 'text-red-600'}`
  }, result.userCGPA))))), result.isEligible && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-slate-200"
  }, opportunity.applyLink ? /*#__PURE__*/React.createElement("a", {
    href: opportunity.applyLink,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white mb-2"
  }, "Apply Now ", /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 ml-2 inline"
  }))) : /*#__PURE__*/React.createElement(Button, {
    onClick: async () => {
      // Prevent multiple clicks using ref
      if (applied || applying || isApplyingRef.current) {
        console.log('Already applied or applying, ignoring click');
        return;
      }
      
      // Set ref immediately to block any other clicks
      isApplyingRef.current = true;
      setApplying(true);
      setApplied(true); // Set immediately to prevent double-clicks
      
      try {
        const response = await APIClient.post(API_ENDPOINTS.OPPORTUNITIES_APPLY(opportunity._id || opportunity.id));
        console.log('Application successful:', response);
        // Refetch the opportunity to get updated applications with populated clerkId
        await fetchOpportunityFromAPI(opportunity._id || opportunity.id);
      } catch (err) {
        console.error('Application error:', err);
        // If API fails, revert the applied state
        setApplied(false);
        isApplyingRef.current = false;
        // Check if error is "Already applied"
        if (err.message && err.message.includes('Already applied')) {
          alert('You have already applied to this opportunity.');
          setApplied(true); // Keep it as applied
          isApplyingRef.current = true;
          await fetchOpportunityFromAPI(opportunity._id || opportunity.id);
        } else {
          alert(err.message || 'Failed to submit application. Please try again.');
        }
      } finally {
        setApplying(false);
      }
    },
    disabled: applied || applying,
    className: `w-full mb-2 ${applied ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'} text-white`
  }, applied ? "✓ Applied" : applying ? "Applying..." : "Apply Now")), /*#__PURE__*/React.createElement(Button, {
    onClick: resetAnalysis,
    variant: "outline",
    className: "w-full"
  }, "Check Another Resume")), activeTab === 'improvements' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, loadingSuggestions ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent mr-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600"
  }, "Generating AI-powered suggestions...")) : suggestions.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 bg-blue-50 p-3 rounded-lg"
  }, "\uD83D\uDCA1 Based on your resume analysis, here are AI-powered improvement suggestions to boost your candidacy:"), suggestions.map((suggestion, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: `p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)} bg-opacity-30`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm"
  }, suggestion.area), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(suggestion.priority)}`
  }, suggestion.priority.toUpperCase())), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-700 mb-2"
  }, suggestion.suggestion), suggestion.timeToLearn && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 flex items-center gap-1"
  }, "\u23F1\uFE0F Estimated time: ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, suggestion.timeToLearn))))))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-12 h-12 text-green-500 mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, "Perfect Match! \uD83C\uDFAF"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-sm mt-1"
  }, "Your resume perfectly matches all the requirements.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-4 border-t border-slate-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-slate-900 mb-3"
  }, "\uD83D\uDCDA Learning Resources"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.udemy.com",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-2 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 transition"
  }, "Udemy Courses"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.coursera.org",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-2 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 transition"
  }, "Coursera"), /*#__PURE__*/React.createElement("a", {
    href: "https://leetcode.com",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-2 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 transition"
  }, "LeetCode"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.geeksforgeeks.org",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-2 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 transition"
  }, "GeeksforGeeks"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 pt-4"
  }, result.isEligible ? /*#__PURE__*/React.createElement(React.Fragment, null, opportunity.applyLink ? /*#__PURE__*/React.createElement("a", {
    href: opportunity.applyLink,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
  }, "Apply Now ", /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-4 h-4 ml-2 inline"
  }))) : /*#__PURE__*/React.createElement(Button, {
    onClick: async () => {
      try {
        await fetch(`/api/opportunities/${opportunity._id || opportunity.id}/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        alert('Application submitted successfully!');
      } catch (err) {
        alert('Failed to submit application. Please try again.');
      }
    },
    className: "w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
  }, "Apply Now"), /*#__PURE__*/React.createElement(Button, {
    onClick: resetAnalysis,
    variant: "outline",
    className: "w-full mt-2"
  }, "Check Another Resume")) : /*#__PURE__*/React.createElement(Button, {
    onClick: resetAnalysis,
    variant: "outline",
    className: "w-full"
  }, "Check Another Resume"))))));
};

// Progress Bar Component
const ProgressBar = ({
  percentage
}) => {
  const getColorClass = percentage => {
    if (percentage >= 80) return 'high';
    if (percentage >= 60) return 'medium';
    return 'low';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `eligibility-progress-bar ${getColorClass(percentage)}`,
    "data-width": percentage
  });
};