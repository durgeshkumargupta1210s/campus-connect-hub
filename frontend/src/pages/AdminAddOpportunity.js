import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useOpportunities } from '@/hooks/useOpportunities';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import React from "react";
export default function AdminAddOpportunity() {
  const navigate = useNavigate();
  const {
    addOpportunity,
    loading,
    error
  } = useOpportunities();
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Internship',
    ctc: '',
    positions: '',
    jobProfile: '',
    description: '',
    eligibility: '',
    applyLink: '',
    deadline: '',
    location: '',
    skills: '',
    tags: '',
    contactEmail: '',
    contactPhone: '',
    status: 'Active'
  });
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
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Ensure description is provided
    if (!formData.description) {
      alert('Please provide a description');
      return;
    }
    
    const opportunityData = {
      title: formData.title,
      company: formData.company,
      type: formData.type.toLowerCase().replace(/\s+/g, '_'), // Convert 'Campus Drive' to 'campus_drive'
      description: formData.description, // Required field
      position: formData.jobProfile,
      salary: formData.ctc,
      deadline: formData.deadline,
      location: formData.location,
      requirements: formData.eligibility ? formData.eligibility.split(',').map(s => s.trim()).filter(s => s) : [],
      status: formData.status.toLowerCase()
    };
    
    console.log('Submitting opportunity:', opportunityData);
    
    const result = await addOpportunity(opportunityData);
    
    if (result.success) {
      setSuccessMessage(`Opportunity "${formData.title}" added successfully!`);
      setFormData({
        title: '',
        company: '',
        type: 'Internship',
        ctc: '',
        positions: '',
        jobProfile: '',
        description: '',
        eligibility: '',
        applyLink: '',
        deadline: '',
        location: '',
        skills: '',
        tags: '',
        contactEmail: '',
        contactPhone: '',
        status: 'Active'
      });
      setTimeout(() => {
        navigate('/admin/dashboard?tab=opportunities');
      }, 2000);
    }
  };
  const getTypeLabel = () => {
    switch (formData.type) {
      case 'Job':
        return 'Annual CTC';
      case 'Internship':
        return 'Monthly Stipend';
      case 'Fellowship':
        return 'Monthly Fellowship';
      default:
        return 'CTC/Stipend';
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-bold text-slate-900 mb-2"
  }, "Add Opportunity"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600"
  }, "Create a new job opportunity, internship, or fellowship")), error && /*#__PURE__*/React.createElement(Alert, {
    variant: "destructive",
    className: "mb-6"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "h-4 w-4"
  }), /*#__PURE__*/React.createElement(AlertDescription, null, error)), successMessage && /*#__PURE__*/React.createElement(Alert, {
    className: "mb-6 border-green-200 bg-green-50"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "h-4 w-4 text-green-600"
  }), /*#__PURE__*/React.createElement(AlertDescription, {
    className: "text-green-800"
  }, successMessage)), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Basic Information"), /*#__PURE__*/React.createElement(CardDescription, null, "Job title, company, and opportunity type")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "title",
    className: "text-slate-700 font-semibold"
  }, "Job Title *"), /*#__PURE__*/React.createElement(Input, {
    id: "title",
    name: "title",
    value: formData.title,
    onChange: handleInputChange,
    placeholder: "e.g., Software Engineer",
    className: "mt-1",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "company",
    className: "text-slate-700 font-semibold"
  }, "Company Name *"), /*#__PURE__*/React.createElement(Input, {
    id: "company",
    name: "company",
    value: formData.company,
    onChange: handleInputChange,
    placeholder: "e.g., Google",
    className: "mt-1",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "type",
    className: "text-slate-700 font-semibold"
  }, "Opportunity Type"), /*#__PURE__*/React.createElement(Select, {
    value: formData.type,
    onValueChange: value => handleSelectChange('type', value)
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "type",
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "Internship"
  }, "Internship"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Placement"
  }, "Placement"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Campus Drive"
  }, "Campus Drive"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Workshop"
  }, "Workshop"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Hackathon"
  }, "Hackathon"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Other"
  }, "Other")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "status",
    className: "text-slate-700 font-semibold"
  }, "Status"), /*#__PURE__*/React.createElement(Select, {
    value: formData.status,
    onValueChange: value => handleSelectChange('status', value)
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "status",
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "Active"
  }, "Active"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Upcoming"
  }, "Upcoming"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Closed"
  }, "Closed"))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Opportunity Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Compensation, positions, and key information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "ctc",
    className: "text-slate-700 font-semibold"
  }, getTypeLabel()), /*#__PURE__*/React.createElement(Input, {
    id: "ctc",
    name: "ctc",
    value: formData.ctc,
    onChange: handleInputChange,
    placeholder: "e.g., 12 LPA",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "positions",
    className: "text-slate-700 font-semibold"
  }, "Number of Positions"), /*#__PURE__*/React.createElement(Input, {
    id: "positions",
    name: "positions",
    type: "number",
    value: formData.positions,
    onChange: handleInputChange,
    placeholder: "e.g., 5",
    className: "mt-1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "jobProfile",
    className: "text-slate-700 font-semibold"
  }, "Job Profile/Role"), /*#__PURE__*/React.createElement(Input, {
    id: "jobProfile",
    name: "jobProfile",
    value: formData.jobProfile,
    onChange: handleInputChange,
    placeholder: "e.g., Full Stack Developer",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "location",
    className: "text-slate-700 font-semibold"
  }, "Location"), /*#__PURE__*/React.createElement(Input, {
    id: "location",
    name: "location",
    value: formData.location,
    onChange: handleInputChange,
    placeholder: "e.g., Bangalore, India",
    className: "mt-1"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "deadline",
    className: "text-slate-700 font-semibold"
  }, "Application Deadline *"), /*#__PURE__*/React.createElement(Input, {
    id: "deadline",
    name: "deadline",
    type: "date",
    value: formData.deadline,
    onChange: handleInputChange,
    className: "mt-1",
    required: true
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Description & Requirements"), /*#__PURE__*/React.createElement(CardDescription, null, "Job description, eligibility criteria, and required skills")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "description",
    className: "text-slate-700 font-semibold"
  }, "Job Description"), /*#__PURE__*/React.createElement(Textarea, {
    id: "description",
    name: "description",
    value: formData.description,
    onChange: handleInputChange,
    placeholder: "Describe the job role, responsibilities, and what we're looking for...",
    rows: 4,
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "eligibility",
    className: "text-slate-700 font-semibold"
  }, "Eligibility Criteria"), /*#__PURE__*/React.createElement(Textarea, {
    id: "eligibility",
    name: "eligibility",
    value: formData.eligibility,
    onChange: handleInputChange,
    placeholder: "e.g., B.Tech in Computer Science, CGPA >= 7.0, No backlog",
    rows: 3,
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "skills",
    className: "text-slate-700 font-semibold"
  }, "Required Skills"), /*#__PURE__*/React.createElement(Input, {
    id: "skills",
    name: "skills",
    value: formData.skills,
    onChange: handleInputChange,
    placeholder: "e.g., React, Node.js, MongoDB (comma-separated)",
    className: "mt-1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-1"
  }, "Separate skills with commas")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Application & Contact"), /*#__PURE__*/React.createElement(CardDescription, null, "How candidates can apply and contact information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "applyLink",
    className: "text-slate-700 font-semibold"
  }, "Apply Link/URL"), /*#__PURE__*/React.createElement(Input, {
    id: "applyLink",
    name: "applyLink",
    type: "url",
    value: formData.applyLink,
    onChange: handleInputChange,
    placeholder: "e.g., https://careers.company.com/job/123",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "contactEmail",
    className: "text-slate-700 font-semibold"
  }, "Contact Email"), /*#__PURE__*/React.createElement(Input, {
    id: "contactEmail",
    name: "contactEmail",
    type: "email",
    value: formData.contactEmail,
    onChange: handleInputChange,
    placeholder: "e.g., recruitment@company.com",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "contactPhone",
    className: "text-slate-700 font-semibold"
  }, "Contact Phone"), /*#__PURE__*/React.createElement(Input, {
    id: "contactPhone",
    name: "contactPhone",
    value: formData.contactPhone,
    onChange: handleInputChange,
    placeholder: "e.g., +91-9876543210",
    className: "mt-1"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "tags",
    className: "text-slate-700 font-semibold"
  }, "Tags"), /*#__PURE__*/React.createElement(Input, {
    id: "tags",
    name: "tags",
    value: formData.tags,
    onChange: handleInputChange,
    placeholder: "e.g., Fresher-Friendly, Remote, Visa-Sponsorship (comma-separated)",
    className: "mt-1"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 mt-1"
  }, "Separate tags with commas")))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 justify-end"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "outline",
    onClick: () => navigate(-1),
    className: "border-slate-300 hover:bg-slate-100"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: loading,
    className: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
  }, loading ? 'Creating...' : 'Create Opportunity')))));
}