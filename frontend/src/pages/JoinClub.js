import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useClubs } from '@/hooks/useClubs';
import { useClubApplications } from '@/hooks/useClubApplications';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import React from "react";
export default function JoinClub() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    getClubById,
    loadClubs,
    clubs
  } = useClubs();
  const {
    addApplication
  } = useClubApplications();
  const [club, setClub] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    universityRollNumber: '',
    year: 'First Year',
    teamInterest: '',
    resume: null
  });
  const [resumeFileName, setResumeFileName] = useState('');
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);
  useEffect(() => {
    if (clubs.length > 0 && id) {
      const foundClub = getClubById(id);
      setClub(foundClub || null);
    }
  }, [id, clubs, getClubById]);
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Please upload a PDF file');
        return;
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setResumeFileName(file.name);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!club) return;
    setIsLoading(true);
    try {
      // Convert file to base64
      let resumeBase64 = '';
      if (formData.resume) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.resume);
        await new Promise(resolve => {
          reader.onload = () => {
            resumeBase64 = reader.result;
            resolve(null);
          };
        });
      }
      const application = {
        clubId: club.id,
        clubName: club.name,
        userId: `user-${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        universityRollNumber: formData.universityRollNumber,
        year: formData.year,
        teamInterest: formData.teamInterest,
        resume: resumeBase64 || '',
        status: 'pending'
      };
      const result = addApplication(application);
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/community');
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  if (!club) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement(Card, {
      className: "max-w-md"
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "pt-6 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 mb-4"
    }, "Club not found"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate('/community')
    }, "Back to Communities")))), /*#__PURE__*/React.createElement(Footer, null));
  }
  if (submitted) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex flex-col"
    }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 flex items-center justify-center px-4"
    }, /*#__PURE__*/React.createElement(Card, {
      className: "max-w-md bg-white dark:bg-slate-900"
    }, /*#__PURE__*/React.createElement(CardContent, {
      className: "pt-12 pb-12 text-center"
    }, /*#__PURE__*/React.createElement(CheckCircle, {
      className: "w-16 h-16 text-green-500 mx-auto mb-4"
    }), /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-bold text-slate-900 dark:text-white mb-2"
    }, "Application Submitted!"), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 dark:text-slate-400 mb-6"
    }, "Thank you for applying to ", club.name, ". Your application has been received and will be reviewed by the club administration."), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-500 mb-6"
    }, "Redirecting to communities in a moment..."), /*#__PURE__*/React.createElement(Button, {
      onClick: () => navigate('/community'),
      className: "w-full"
    }, "Back to Communities")))), /*#__PURE__*/React.createElement(Footer, null));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 border-b border-slate-200 sticky top-16 z-40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => navigate(`/club/${id}`),
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4"
  }), "Back to ", club.name))), /*#__PURE__*/React.createElement("section", {
    className: `${club.color} text-white py-12`
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-bold mb-2"
  }, "Join ", club.name), /*#__PURE__*/React.createElement("p", {
    className: "text-white/90"
  }, "Apply to join our club community"))), /*#__PURE__*/React.createElement("section", {
    className: "py-12 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-2xl"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Application Form"), /*#__PURE__*/React.createElement(CardDescription, null, "Please fill in your details to apply for this club")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Full Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "fullName",
    value: formData.fullName,
    onChange: handleInputChange,
    placeholder: "Enter your full name",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Email Address *"), /*#__PURE__*/React.createElement(Input, {
    name: "email",
    type: "email",
    value: formData.email,
    onChange: handleInputChange,
    placeholder: "your@email.com",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Phone Number *"), /*#__PURE__*/React.createElement(Input, {
    name: "phone",
    type: "tel",
    value: formData.phone,
    onChange: handleInputChange,
    placeholder: "+91-XXXXXXXXXX",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "University Roll Number *"), /*#__PURE__*/React.createElement(Input, {
    name: "universityRollNumber",
    value: formData.universityRollNumber,
    onChange: handleInputChange,
    placeholder: "e.g., 2023001",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Current Year *"), /*#__PURE__*/React.createElement("select", {
    name: "year",
    value: formData.year,
    onChange: handleInputChange,
    title: "Select your current year",
    className: "w-full border rounded-lg p-2 bg-background",
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "First Year"
  }, "First Year"), /*#__PURE__*/React.createElement("option", {
    value: "Second Year"
  }, "Second Year"), /*#__PURE__*/React.createElement("option", {
    value: "Third Year"
  }, "Third Year"), /*#__PURE__*/React.createElement("option", {
    value: "Fourth Year"
  }, "Fourth Year"), /*#__PURE__*/React.createElement("option", {
    value: "Other"
  }, "Other"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Which team/role are you interested in? *"), /*#__PURE__*/React.createElement(Input, {
    name: "teamInterest",
    value: formData.teamInterest,
    onChange: handleInputChange,
    placeholder: "e.g., Web Development, Design, Content, etc.",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Resume (PDF) *"), /*#__PURE__*/React.createElement("div", {
    className: "border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".pdf",
    onChange: handleFileChange,
    className: "hidden",
    id: "resume-input",
    required: true
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "resume-input",
    className: "cursor-pointer"
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "w-8 h-8 text-primary mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-slate-900"
  }, "Click to upload resume"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-1"
  }, "PDF files only"), resumeFileName && /*#__PURE__*/React.createElement(Badge, {
    className: "mt-3 bg-green-100 text-green-800"
  }, resumeFileName)))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 pt-6"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isLoading,
    className: "flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
  }, isLoading ? 'Submitting...' : 'Submit Application'), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "outline",
    onClick: () => navigate(`/club/${id}`),
    className: "flex-1"
  }, "Cancel"))))), /*#__PURE__*/React.createElement(Card, {
    className: "mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("strong", null, "Note:"), " By submitting this form, you agree to the club's terms and conditions. The club administration will review your application and contact you within 3-5 working days.")))))), /*#__PURE__*/React.createElement(Footer, null));
}