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
import { AlertCircle, CheckCircle2, Plus, X } from 'lucide-react';
import React from "react";
export default function AdminAddCampusDrive() {
  const navigate = useNavigate();
  const {
    addCampusDrive,
    loading,
    error
  } = useOpportunities();
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    company: '',
    driveDate: '',
    registrationDeadline: '',
    expectedTime: '',
    venue: '',
    description: '',
    positions: '',
    ctc: '',
    eligibility: '',
    roles: [],
    registrationLink: '',
    status: 'Upcoming',
    recruitmentProcess: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [newRole, setNewRole] = useState('');
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
  const addRole = () => {
    if (newRole.trim() && !formData.roles.includes(newRole.trim())) {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, newRole.trim()]
      }));
      setNewRole('');
    }
  };
  const removeRole = role => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter(r => r !== role)
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.company || !formData.driveDate || !formData.registrationDeadline) {
      alert('Please fill in all required fields');
      return;
    }
    const driveData = {
      company: formData.company,
      driveDate: formData.driveDate,
      registrationDeadline: formData.registrationDeadline,
      expectedTime: formData.expectedTime,
      venue: formData.venue,
      description: formData.description,
      positions: parseInt(formData.positions) || 0,
      ctc: formData.ctc || '-',
      eligibility: formData.eligibility,
      roles: formData.roles.length > 0 ? formData.roles : ['General'],
      registrationLink: formData.registrationLink,
      status: formData.status,
      recruitmentProcess: formData.recruitmentProcess,
      contactPerson: formData.contactPerson,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone
    };
    const result = addCampusDrive(driveData);
    if (result.success) {
      setSuccessMessage(`Campus drive for "${formData.company}" created successfully!`);
      setFormData({
        company: '',
        driveDate: '',
        registrationDeadline: '',
        expectedTime: '',
        venue: '',
        description: '',
        positions: '',
        ctc: '',
        eligibility: '',
        roles: [],
        registrationLink: '',
        status: 'Upcoming',
        recruitmentProcess: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: ''
      });
      setTimeout(() => {
        navigate('/admin/dashboard?tab=campus-drives');
      }, 2000);
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
  }, "Add Campus Drive"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600"
  }, "Create a new campus recruitment drive for students")), error && /*#__PURE__*/React.createElement(Alert, {
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
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Basic Information"), /*#__PURE__*/React.createElement(CardDescription, null, "Company details and drive dates")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "company",
    className: "text-slate-700 font-semibold"
  }, "Company Name *"), /*#__PURE__*/React.createElement(Input, {
    id: "company",
    name: "company",
    value: formData.company,
    onChange: handleInputChange,
    placeholder: "e.g., Microsoft",
    className: "mt-1",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "status",
    className: "text-slate-700 font-semibold"
  }, "Drive Status"), /*#__PURE__*/React.createElement(Select, {
    value: formData.status,
    onValueChange: value => handleSelectChange('status', value)
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    id: "status",
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(SelectValue, null)), /*#__PURE__*/React.createElement(SelectContent, null, /*#__PURE__*/React.createElement(SelectItem, {
    value: "Upcoming"
  }, "Upcoming"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Ongoing"
  }, "Ongoing"), /*#__PURE__*/React.createElement(SelectItem, {
    value: "Completed"
  }, "Completed"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "driveDate",
    className: "text-slate-700 font-semibold"
  }, "Drive Date *"), /*#__PURE__*/React.createElement(Input, {
    id: "driveDate",
    name: "driveDate",
    type: "date",
    value: formData.driveDate,
    onChange: handleInputChange,
    className: "mt-1",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "registrationDeadline",
    className: "text-slate-700 font-semibold"
  }, "Registration Deadline *"), /*#__PURE__*/React.createElement(Input, {
    id: "registrationDeadline",
    name: "registrationDeadline",
    type: "date",
    value: formData.registrationDeadline,
    onChange: handleInputChange,
    className: "mt-1",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "expectedTime",
    className: "text-slate-700 font-semibold"
  }, "Expected Time Duration"), /*#__PURE__*/React.createElement(Input, {
    id: "expectedTime",
    name: "expectedTime",
    value: formData.expectedTime,
    onChange: handleInputChange,
    placeholder: "e.g., 2-3 hours",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "venue",
    className: "text-slate-700 font-semibold"
  }, "Venue/Location"), /*#__PURE__*/React.createElement(Input, {
    id: "venue",
    name: "venue",
    value: formData.venue,
    onChange: handleInputChange,
    placeholder: "e.g., Auditorium, Room 101",
    className: "mt-1"
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Drive Details"), /*#__PURE__*/React.createElement(CardDescription, null, "Positions, compensation, and eligibility")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "positions",
    className: "text-slate-700 font-semibold"
  }, "Number of Positions"), /*#__PURE__*/React.createElement(Input, {
    id: "positions",
    name: "positions",
    type: "number",
    value: formData.positions,
    onChange: handleInputChange,
    placeholder: "e.g., 10",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "ctc",
    className: "text-slate-700 font-semibold"
  }, "CTC / Annual Package"), /*#__PURE__*/React.createElement(Input, {
    id: "ctc",
    name: "ctc",
    value: formData.ctc,
    onChange: handleInputChange,
    placeholder: "e.g., 15 LPA",
    className: "mt-1"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "description",
    className: "text-slate-700 font-semibold"
  }, "Drive Description"), /*#__PURE__*/React.createElement(Textarea, {
    id: "description",
    name: "description",
    value: formData.description,
    onChange: handleInputChange,
    placeholder: "Describe the drive, company background, and what makes this an exciting opportunity...",
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
    placeholder: "e.g., B.Tech/B.E in CSE/IT/ECE, CGPA >= 7.0, No active backlog",
    rows: 3,
    className: "mt-1"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Roles & Recruitment Process"), /*#__PURE__*/React.createElement(CardDescription, null, "Job roles and interview/selection process")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    className: "text-slate-700 font-semibold"
  }, "Roles Available"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-2"
  }, /*#__PURE__*/React.createElement(Input, {
    value: newRole,
    onChange: e => setNewRole(e.target.value),
    placeholder: "e.g., Software Engineer",
    onKeyPress: e => e.key === 'Enter' && (e.preventDefault(), addRole())
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: addRole,
    size: "sm",
    variant: "outline",
    title: "Add role"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-3"
  }, formData.roles.map(role => /*#__PURE__*/React.createElement("div", {
    key: role,
    className: "flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium"
  }, role), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeRole(role),
    className: "hover:bg-blue-200 rounded-full p-0.5",
    title: `Remove ${role}`
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-3 h-3"
  })))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "recruitmentProcess",
    className: "text-slate-700 font-semibold"
  }, "Recruitment Process"), /*#__PURE__*/React.createElement(Textarea, {
    id: "recruitmentProcess",
    name: "recruitmentProcess",
    value: formData.recruitmentProcess,
    onChange: handleInputChange,
    placeholder: "e.g., Written Test (60 mins) -> Technical Interview (45 mins) -> HR Round (30 mins)",
    rows: 3,
    className: "mt-1"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Contact & Registration"), /*#__PURE__*/React.createElement(CardDescription, null, "Company contact information and registration link")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "contactPerson",
    className: "text-slate-700 font-semibold"
  }, "Contact Person"), /*#__PURE__*/React.createElement(Input, {
    id: "contactPerson",
    name: "contactPerson",
    value: formData.contactPerson,
    onChange: handleInputChange,
    placeholder: "e.g., John Doe - HR Manager",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
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
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "contactPhone",
    className: "text-slate-700 font-semibold"
  }, "Contact Phone"), /*#__PURE__*/React.createElement(Input, {
    id: "contactPhone",
    name: "contactPhone",
    value: formData.contactPhone,
    onChange: handleInputChange,
    placeholder: "e.g., +91-9876543210",
    className: "mt-1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "registrationLink",
    className: "text-slate-700 font-semibold"
  }, "Registration Link"), /*#__PURE__*/React.createElement(Input, {
    id: "registrationLink",
    name: "registrationLink",
    type: "url",
    value: formData.registrationLink,
    onChange: handleInputChange,
    placeholder: "e.g., https://careers.company.com/register",
    className: "mt-1"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 justify-end"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "outline",
    onClick: () => navigate(-1),
    className: "border-slate-300 hover:bg-slate-100"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: loading,
    className: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
  }, loading ? 'Creating...' : 'Create Campus Drive')))));
}