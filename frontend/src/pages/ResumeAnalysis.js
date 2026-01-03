import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, AlertCircle, CheckCircle2, XCircle, Lightbulb, Target, TrendingUp, Award, BookOpen, Briefcase } from 'lucide-react';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';
import { useOpportunities } from '@/hooks/useOpportunities';
import React from "react";
export default function ResumeAnalysis() {
  const navigate = useNavigate();
  const {
    analyzeResume,
    analyzing,
    error,
    result,
    suggestions,
    loadingSuggestions
  } = useResumeAnalysis();
  const {
    opportunities,
    loadOpportunities
  } = useOpportunities();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchedOpportunities, setMatchedOpportunities] = useState([]);
  const [analysisPerformed, setAnalysisPerformed] = useState(false);
  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  // Find matching opportunities
  useEffect(() => {
    if (result && opportunities.length > 0) {
      const matched = opportunities.map(opp => {
        // Simple matching: check if user has most of the required skills
        const requiredSkills = (opp.skills || []).slice(0, 5);
        const matchedSkills = result.matchedSkills.filter(skill => requiredSkills.some(reqSkill => skill.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(skill.toLowerCase())));
        const skillScore = requiredSkills.length > 0 ? matchedSkills.length / requiredSkills.length * 100 : 100;

        // Check CGPA eligibility if required
        let cgpaMatch = true;
        if (result.userCGPA) {
          // Assume most opportunities require minimum 7.0 CGPA
          cgpaMatch = result.userCGPA >= 7.0;
        }
        const eligibilityScore = cgpaMatch ? Math.round(skillScore * 0.9) : Math.round(skillScore * 0.6);
        return {
          ...opp,
          eligibilityScore
        };
      }).filter(opp => opp.eligibilityScore >= 50).sort((a, b) => b.eligibilityScore - a.eligibilityScore).slice(0, 6);
      setMatchedOpportunities(matched);
    }
  }, [result, opportunities]);
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };
  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Please select a resume file');
      return;
    }

    // Common job required skills for analysis
    const requiredSkills = ['java', 'python', 'javascript', 'react', 'nodejs', 'sql', 'html', 'css', 'git', 'rest api'];
    const response = await analyzeResume(selectedFile, requiredSkills, 7.0);
    if (response.success) {
      setAnalysisPerformed(true);
    }
  };
  const getScoreColor = score => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };
  const getScoreBgColor = score => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    if (score >= 40) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bg-gradient-hero py-12 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto text-center"
  }, /*#__PURE__*/React.createElement(Award, {
    className: "w-16 h-16 text-white mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-bold text-white mb-4"
  }, "Resume Analysis & Opportunity Matcher"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-white/90 max-w-2xl mx-auto"
  }, "Upload your resume, get instant analysis, and discover opportunities that match your profile"))), /*#__PURE__*/React.createElement("section", {
    className: "py-12 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-5xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Upload Your Resume"), /*#__PURE__*/React.createElement(CardDescription, null, "Support PDF and TXT formats (max 5MB)")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    onDragEnter: handleDrag,
    onDragLeave: handleDrag,
    onDragOver: handleDrag,
    onDrop: handleDrop,
    className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 bg-muted/5'}`
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "w-12 h-12 mx-auto text-muted-foreground mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-foreground mb-2"
  }, "Drag and drop your resume here"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground mb-4"
  }, "or"), /*#__PURE__*/React.createElement("input", {
    ref: input => {
      if (input) {
        window.fileInput = input;
      }
    },
    type: "file",
    accept: ".pdf,.txt",
    onChange: handleFileChange,
    className: "hidden",
    disabled: analyzing,
    id: "resume-file-input"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    disabled: analyzing,
    onClick: () => document.getElementById('resume-file-input')?.click()
  }, "Browse Files")), selectedFile && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-5 h-5 text-green-600 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-green-800 font-medium"
  }, selectedFile.name, " selected")), error && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(XCircle, {
    className: "w-5 h-5 text-red-600 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-red-800"
  }, error)), /*#__PURE__*/React.createElement(Button, {
    onClick: handleAnalyze,
    disabled: !selectedFile || analyzing,
    className: "w-full mt-4 bg-gradient-accent hover:opacity-90 text-white"
  }, analyzing ? 'Analyzing...' : 'Analyze Resume'))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg"
  }, "How It Works")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold"
  }, "1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-foreground"
  }, "Upload Resume"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Upload your resume in PDF or TXT format"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold"
  }, "2"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-foreground"
  }, "AI Analysis"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Our AI extracts skills and analyzes your profile"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold"
  }, "3"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-foreground"
  }, "Get Matched"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Discover opportunities that fit your profile")))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, analysisPerformed && result ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    className: `border ${getScoreBgColor(result.eligibilityScore)}`
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Overall Assessment")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: `text-5xl font-bold ${getScoreColor(result.eligibilityScore)} mb-2`
  }, result.eligibilityScore, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-foreground font-medium"
  }, result.feedback)), /*#__PURE__*/React.createElement(Progress, {
    value: result.eligibilityScore,
    className: "h-3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 pt-4 border-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-primary"
  }, result.matchedSkills.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Skills Matched")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-bold text-accent"
  }, result.missingSkills.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Skills To Learn"))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg"
  }, "Skills Analysis")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, result.matchedSkills.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-green-700 mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4"
  }), "Matched Skills"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, result.matchedSkills.map((skill, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    className: "bg-green-100 text-green-800 hover:bg-green-200"
  }, skill)))), result.missingSkills.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-4 h-4"
  }), "Skills To Develop"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, result.missingSkills.slice(0, 5).map((skill, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    className: "bg-amber-100 text-amber-800 hover:bg-amber-200"
  }, skill)))), result.userCGPA && /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-foreground mb-2"
  }, "Academic Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-primary"
  }, result.userCGPA, " / 10 CGPA"))))) : /*#__PURE__*/React.createElement(Card, {
    className: "h-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "text-center py-12"
  }, /*#__PURE__*/React.createElement(Briefcase, {
    className: "w-12 h-12 text-muted-foreground mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, "Upload your resume to see analysis and matched opportunities"))))), analysisPerformed && suggestions.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground mb-6"
  }, /*#__PURE__*/React.createElement(Lightbulb, {
    className: "w-6 h-6 inline-block mr-2 text-accent"
  }), "Personalized Improvement Suggestions"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-6"
  }, suggestions.map((suggestion, idx) => /*#__PURE__*/React.createElement(Card, {
    key: idx,
    className: "hover:shadow-lg transition-shadow"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-2"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg"
  }, suggestion.area), /*#__PURE__*/React.createElement(Badge, {
    className: suggestion.priority === 'high' ? 'bg-red-100 text-red-800' : suggestion.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
  }, suggestion.priority))), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, suggestion.suggestion), suggestion.timeToLearn && /*#__PURE__*/React.createElement("div", {
    className: "pt-2 border-t text-xs text-foreground font-medium flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    className: "w-4 h-4"
  }), "Time required: ", suggestion.timeToLearn)))))), analysisPerformed && matchedOpportunities.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-foreground mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Target, {
    className: "w-6 h-6 text-primary"
  }), "Opportunities For You (", matchedOpportunities.length, ")"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, matchedOpportunities.map(opp => /*#__PURE__*/React.createElement(Card, {
    key: opp.id,
    className: "hover:shadow-lg transition-shadow overflow-hidden group"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg text-foreground"
  }, opp.title), /*#__PURE__*/React.createElement(CardDescription, {
    className: "text-base"
  }, opp.company)), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: `text-2xl font-bold ${getScoreColor(opp.eligibilityScore)}`
  }, opp.eligibilityScore, "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted-foreground"
  }, "Match"))), /*#__PURE__*/React.createElement(Progress, {
    value: opp.eligibilityScore,
    className: "h-2"
  })), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, opp.location && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "\uD83D\uDCCD ", opp.location), opp.ctc && /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-accent"
  }, "\uD83D\uDCB0 ", opp.ctc), opp.deadline && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "\u23F1\uFE0F Deadline: ", new Date(opp.deadline).toLocaleDateString('en-IN'))), /*#__PURE__*/React.createElement("div", {
    className: "px-6 pb-4 border-t pt-4"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate(`/opportunity/${opp.id}`),
    className: "w-full bg-gradient-accent hover:opacity-90 text-white",
    size: "sm"
  }, "View & Apply")))))), analysisPerformed && matchedOpportunities.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-12 text-center py-12 bg-secondary/30 rounded-lg border border-border"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-12 h-12 text-muted-foreground mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-lg"
  }, "No exact matches found, but don't worry! Follow the improvement suggestions above to increase your eligibility."))))), /*#__PURE__*/React.createElement(Footer, null));
}