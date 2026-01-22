import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useClubs } from '@/hooks/useClubs';
import { ArrowLeft, Users, Mail, Phone, Calendar, Instagram, Linkedin, MessageCircle, Trophy, Image as ImageIcon, User } from 'lucide-react';
import React from "react";
export default function ClubDetail() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  const {
    getClubById,
    loadClubs,
    clubs
  } = useClubs();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);
  useEffect(() => {
    if (clubs.length > 0 && id) {
      const foundClub = getClubById(id);
      setClub(foundClub || null);
    }
  }, [id, clubs, getClubById]);

  // Check if user is already a member
  useEffect(() => {
    if (userId && club?.members) {
      const isUserMember = club.members.some(
        member => {
          const memberClerkId = member?.clerkId || member;
          return memberClerkId === userId;
        }
      );
      console.log('Checking membership:', { userId, members: club.members, isUserMember });
      setIsMember(isUserMember);
    }
  }, [userId, club]);
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
    onClick: () => navigate('/community'),
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    className: "w-4 h-4"
  }), "Back to Communities"))), /*#__PURE__*/React.createElement("section", {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-6 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl font-bold mb-3"
  }, club.name), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 flex-wrap"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-white/20 text-white text-lg px-4 py-2"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "w-4 h-4 mr-2 inline"
  }), club.memberCount || 0, " Members"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-white/20 text-white text-lg px-4 py-2 capitalize"
  }, club.category || "General")))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-white/90 mb-6"
  }, club.description || "No description available")))), /*#__PURE__*/React.createElement("section", {
    className: "py-12 px-4 bg-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-8"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(User, {
    className: "w-5 h-5 text-primary"
  }), "Contact Information")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, club.email && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${club.email}`,
    className: "hover:text-primary"
  }, club.email)), club.phone && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("a", {
    href: `tel:${club.phone}`
  }, club.phone)), club.location && /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement("strong", null, "Location:"), " ", club.location), club.website && /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement("a", {
    href: club.website,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-primary hover:underline"
  }, "Visit Website"))))), club.socialLinks && (club.socialLinks.instagram || club.socialLinks.linkedin || club.socialLinks.twitter || club.socialLinks.facebook) && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl flex items-center gap-2"
  }, "Social Media")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, club.socialLinks.instagram && /*#__PURE__*/React.createElement("a", {
    href: club.socialLinks.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(Instagram, {
    className: "w-5 h-5 text-pink-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "Instagram")), club.socialLinks.linkedin && /*#__PURE__*/React.createElement("a", {
    href: club.socialLinks.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(Linkedin, {
    className: "w-5 h-5 text-blue-700"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "LinkedIn")), club.socialLinks.twitter && /*#__PURE__*/React.createElement("a", {
    href: club.socialLinks.twitter,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(MessageCircle, {
    className: "w-5 h-5 text-blue-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "Twitter")), club.socialLinks.facebook && /*#__PURE__*/React.createElement("a", {
    href: club.socialLinks.facebook,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(MessageCircle, {
    className: "w-5 h-5 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "Facebook"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg"
  }, "Club Status")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: `text-lg px-4 py-2 ${club.status === 'active' ? 'bg-green-500' : club.status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'}`
  }, club.status?.toUpperCase() || 'ACTIVE')))), /*#__PURE__*/React.createElement(Button, {
    onClick: () => !isMember && navigate(`/club/${club._id || club.id}/join`),
    className: `w-full py-6 text-lg font-semibold ${isMember ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'} text-white`,
    disabled: club.status !== 'active' || isMember
  }, isMember ? '✓ Already Joined' : club.status === 'active' ? `Join ${club.name}` : 'Club Inactive'), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center pb-4 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-primary"
  }, club.memberCount || 0), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, "Members")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-accent capitalize"
  }, club.category || "General"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, "Category")))))))))), /*#__PURE__*/React.createElement(Footer, null));
}