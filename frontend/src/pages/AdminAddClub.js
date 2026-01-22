import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useClubs } from "@/hooks/useClubs";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import React from "react";
const clubColors = ["bg-gradient-to-br from-primary to-primary/70", "bg-gradient-to-br from-accent to-accent/70", "bg-gradient-to-br from-purple-500 to-pink-500", "bg-gradient-to-br from-blue-500 to-cyan-500", "bg-gradient-to-br from-orange-500 to-red-500", "bg-gradient-to-br from-green-500 to-emerald-500"];
export default function AdminAddClub() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    getClubById,
    addClub,
    updateClub,
    loadClubs,
    clubs
  } = useClubs();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    icon: "Code2",
    members: 0,
    description: "",
    tags: [],
    color: clubColors[0],
    about: "",
    establishedYear: new Date().getFullYear(),
    president: {
      id: "1",
      name: "",
      role: "President",
      email: "",
      phone: "",
      image: "",
      bio: ""
    },
    vicePresident: {
      id: "2",
      name: "",
      role: "Vice President",
      email: "",
      phone: "",
      image: "",
      bio: ""
    },
    teamMembers: [],
    gallery: [],
    achievements: [],
    events: [],
    contactEmail: "",
    contactPhone: "",
    social: {
      instagram: "",
      linkedin: "",
      discord: ""
    }
  });
  const [newTag, setNewTag] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [newTeamMember, setNewTeamMember] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    image: "",
    bio: ""
  });
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);
  useEffect(() => {
    if (id && clubs.length > 0) {
      const club = getClubById(id);
      if (club) {
        setFormData(club);
      }
    } else if (!id) {
      setFormData(prev => ({
        ...prev,
        id: `club-${Date.now()}`
      }));
    }
  }, [id, clubs, getClubById]);
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "members" || name === "establishedYear" ? parseInt(value) : value
    }));
  };
  const handlePresidentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      president: {
        ...prev.president,
        [field]: value
      }
    }));
  };
  const handleVicePresidentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      vicePresident: {
        ...prev.vicePresident,
        [field]: value
      }
    }));
  };
  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };
  const removeTag = tag => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement("");
    }
  };
  const removeAchievement = index => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };
  const addEvent = () => {
    if (newEvent.trim()) {
      setFormData(prev => ({
        ...prev,
        events: [...prev.events, newEvent.trim()]
      }));
      setNewEvent("");
    }
  };
  const removeEvent = index => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };
  const addTeamMember = () => {
    if (newTeamMember.name.trim() && newTeamMember.role.trim()) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, {
          ...newTeamMember,
          id: `member-${Date.now()}`
        }]
      }));
      setNewTeamMember({
        id: "",
        name: "",
        role: "",
        email: "",
        phone: "",
        image: "",
        bio: ""
      });
    }
  };
  const removeTeamMember = id => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Transform form data to match backend schema
      const clubData = {
        name: formData.name,
        description: formData.description || formData.about,
        email: formData.contactEmail || formData.president?.email,
        phone: formData.contactPhone,
        category: formData.tags?.[0] || 'other',
        imageUrl: formData.gallery?.[0],
        website: formData.social?.linkedin,
        location: '',
        socialLinks: {
          instagram: formData.social?.instagram,
          linkedin: formData.social?.linkedin,
          discord: formData.social?.discord
        }
      };
      
      console.log('Submitting club data:', clubData);
      
      let result;
      if (id) {
        result = await updateClub(id, clubData);
      } else {
        result = await addClub(clubData);
      }
      
      if (result.success) {
        console.log('Club saved successfully:', result);
        navigate("/admin?tab=clubs");
      } else {
        console.error('Failed to save club:', result.error);
        alert('Failed to save club: ' + result.error);
      }
    } catch (error) {
      console.error("Error saving club:", error);
      alert('Error saving club: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto py-8 px-4"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => navigate("/admin?tab=clubs"),
    className: "mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4"
  }), "Back to Clubs"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Club Information"), /*#__PURE__*/React.createElement(CardDescription, null, "Basic details about the club")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Club Name *"), /*#__PURE__*/React.createElement(Input, {
    name: "name",
    value: formData.name,
    onChange: handleInputChange,
    placeholder: "Enter club name",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Members Count *"), /*#__PURE__*/React.createElement(Input, {
    name: "members",
    type: "number",
    value: formData.members,
    onChange: handleInputChange,
    placeholder: "250",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Established Year *"), /*#__PURE__*/React.createElement(Input, {
    name: "establishedYear",
    type: "number",
    value: formData.establishedYear,
    onChange: handleInputChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Color Theme *"), /*#__PURE__*/React.createElement("select", {
    title: "Select color theme",
    value: formData.color,
    onChange: e => setFormData(prev => ({
      ...prev,
      color: e.target.value
    })),
    className: "w-full border rounded-lg p-2 bg-background"
  }, clubColors.map((color, idx) => /*#__PURE__*/React.createElement("option", {
    key: idx,
    value: color
  }, "Color ", idx + 1))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Description *"), /*#__PURE__*/React.createElement("textarea", {
    name: "description",
    value: formData.description,
    onChange: handleInputChange,
    placeholder: "Short description of the club",
    className: "w-full border rounded-lg p-3 h-24 bg-background",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "About (Detailed) *"), /*#__PURE__*/React.createElement("textarea", {
    name: "about",
    value: formData.about,
    onChange: handleInputChange,
    placeholder: "Detailed information about the club",
    className: "w-full border rounded-lg p-3 h-32 bg-background",
    required: true
  })))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Tags")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Input, {
    value: newTag,
    onChange: e => setNewTag(e.target.value),
    onKeyPress: e => e.key === "Enter" && (e.preventDefault(), addTag()),
    placeholder: "Add tag and press Enter"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: addTag,
    variant: "outline",
    title: "Add tag"
  }, "Add")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, formData.tags.map(tag => /*#__PURE__*/React.createElement(Badge, {
    key: tag,
    className: "bg-primary text-primary-foreground flex items-center gap-2"
  }, tag, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeTag(tag),
    className: "ml-1 hover:text-red-300",
    title: "Remove tag"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-3 h-3"
  }))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Leadership")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-primary/20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-primary"
  }, "President"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "President Name",
    value: formData.president.name,
    onChange: e => handlePresidentChange("name", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Email",
    type: "email",
    value: formData.president.email,
    onChange: e => handlePresidentChange("email", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Phone",
    value: formData.president.phone,
    onChange: e => handlePresidentChange("phone", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Bio",
    value: formData.president.bio,
    onChange: e => handlePresidentChange("bio", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-accent/20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-accent"
  }, "Vice President"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Vice President Name",
    value: formData.vicePresident.name,
    onChange: e => handleVicePresidentChange("name", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Email",
    type: "email",
    value: formData.vicePresident.email,
    onChange: e => handleVicePresidentChange("email", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Phone",
    value: formData.vicePresident.phone,
    onChange: e => handleVicePresidentChange("phone", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Bio",
    value: formData.vicePresident.bio,
    onChange: e => handleVicePresidentChange("bio", e.target.value)
  }))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Core Team Members")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Add Team Member"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name",
    value: newTeamMember.name,
    onChange: e => setNewTeamMember(prev => ({
      ...prev,
      name: e.target.value
    }))
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Role",
    value: newTeamMember.role,
    onChange: e => setNewTeamMember(prev => ({
      ...prev,
      role: e.target.value
    }))
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Email",
    type: "email",
    value: newTeamMember.email,
    onChange: e => setNewTeamMember(prev => ({
      ...prev,
      email: e.target.value
    }))
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Phone",
    value: newTeamMember.phone,
    onChange: e => setNewTeamMember(prev => ({
      ...prev,
      phone: e.target.value
    }))
  })), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: addTeamMember,
    variant: "outline",
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Plus, {
    className: "w-4 h-4 mr-2"
  }), "Add Member")), formData.teamMembers.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, formData.teamMembers.map(member => /*#__PURE__*/React.createElement("div", {
    key: member.id,
    className: "flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, member.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, member.role)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeTeamMember(member.id),
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all",
    title: "Remove team member"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  }))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Achievements & Milestones")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Input, {
    value: newAchievement,
    onChange: e => setNewAchievement(e.target.value),
    onKeyPress: e => e.key === "Enter" && (e.preventDefault(), addAchievement()),
    placeholder: "Add achievement"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: addAchievement,
    variant: "outline",
    title: "Add achievement"
  }, "Add")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, formData.achievements.map((achievement, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: "flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border"
  }, /*#__PURE__*/React.createElement("span", null, achievement), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeAchievement(idx),
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all",
    title: "Remove achievement"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  }))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Regular Events & Activities")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Input, {
    value: newEvent,
    onChange: e => setNewEvent(e.target.value),
    onKeyPress: e => e.key === "Enter" && (e.preventDefault(), addEvent()),
    placeholder: "Add event/activity"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: addEvent,
    variant: "outline",
    title: "Add event"
  }, "Add")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, formData.events.map((event, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: "flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border"
  }, /*#__PURE__*/React.createElement("span", null, event), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeEvent(idx),
    className: "p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all",
    title: "Remove event"
  }, /*#__PURE__*/React.createElement(Trash2, {
    className: "w-4 h-4 text-red-500"
  }))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Contact Information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Email *"), /*#__PURE__*/React.createElement(Input, {
    name: "contactEmail",
    type: "email",
    value: formData.contactEmail,
    onChange: handleInputChange,
    placeholder: "club@campus.edu",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Phone"), /*#__PURE__*/React.createElement(Input, {
    name: "contactPhone",
    value: formData.contactPhone,
    onChange: handleInputChange,
    placeholder: "+91-XXXXXXXXXX"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Social Media Links"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Instagram URL",
    value: formData.social.instagram,
    onChange: e => handleSocialChange("instagram", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "LinkedIn URL",
    value: formData.social.linkedin,
    onChange: e => handleSocialChange("linkedin", e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Discord URL",
    value: formData.social.discord,
    onChange: e => handleSocialChange("discord", e.target.value)
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isLoading,
    className: "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white flex-1"
  }, isLoading ? "Saving..." : id ? "Update Club" : "Create Club"), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    variant: "outline",
    onClick: () => navigate("/admin?tab=clubs"),
    className: "flex-1"
  }, "Cancel")))));
}