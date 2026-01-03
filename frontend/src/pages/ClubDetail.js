import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const {
    getClubById,
    loadClubs,
    clubs
  } = useClubs();
  const [club, setClub] = useState(null);
  useEffect(() => {
    loadClubs();
  }, [loadClubs]);
  useEffect(() => {
    if (clubs.length > 0 && id) {
      const foundClub = getClubById(id);
      setClub(foundClub || null);
    }
  }, [id, clubs, getClubById]);
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
    className: `${club.color} text-white py-16`
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
  }), club.members, "+ Members"), /*#__PURE__*/React.createElement(Badge, {
    className: "bg-white/20 text-white text-lg px-4 py-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 mr-2 inline"
  }), "Est. ", club.establishedYear)))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-white/90 mb-6"
  }, club.about), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, club.tags.map((tag, idx) => /*#__PURE__*/React.createElement(Badge, {
    key: idx,
    className: "bg-white/30 text-white text-sm"
  }, tag)))))), /*#__PURE__*/React.createElement("section", {
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
  }), "Leadership")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 font-semibold mb-2"
  }, "PRESIDENT"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 mb-1"
  }, club.president.name), club.president.bio && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mb-3"
  }, club.president.bio), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, club.president.email && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${club.president.email}`,
    className: "hover:text-primary"
  }, club.president.email)), club.president.phone && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-4 h-4 text-primary"
  }), /*#__PURE__*/React.createElement("a", {
    href: `tel:${club.president.phone}`
  }, club.president.phone)))), club.vicePresident && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/20"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 font-semibold mb-2"
  }, "VICE PRESIDENT"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-slate-900 mb-1"
  }, club.vicePresident.name), club.vicePresident.bio && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mb-3"
  }, club.vicePresident.bio), club.vicePresident.email && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-4 h-4 text-accent"
  }), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${club.vicePresident.email}`,
    className: "hover:text-accent"
  }, club.vicePresident.email))), club.teamMembers.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-slate-900 mb-4"
  }, "Core Team Members"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-3"
  }, club.teamMembers.map((member, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "p-3 bg-slate-50 rounded-lg border border-slate-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-slate-900"
  }, member.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, member.role), member.email && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-primary mt-1"
  }, member.email))))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Trophy, {
    className: "w-5 h-5 text-yellow-600"
  }), "Achievements & Milestones")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, club.achievements.map((achievement, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-600 font-bold mt-1"
  }, "\u2605"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-700"
  }, achievement)))))), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-5 h-5 text-blue-600"
  }), "Regular Events & Activities")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, club.events.map((event, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx,
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-600 font-bold mt-1"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-700"
  }, event)))))), club.gallery.length > 0 && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-2xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(ImageIcon, {
    className: "w-5 h-5 text-purple-600"
  }), "Gallery")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4"
  }, club.gallery.map((image, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "aspect-square rounded-lg overflow-hidden bg-slate-200 hover:scale-105 transition-transform cursor-pointer"
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: `${club.name} gallery ${idx + 1}`,
    className: "w-full h-full object-cover"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg"
  }, "Get In Touch")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 text-primary flex-shrink-0"
  }), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${club.contactEmail}`,
    className: "text-sm text-primary hover:underline break-all"
  }, club.contactEmail)), club.contactPhone && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-5 h-5 text-primary flex-shrink-0"
  }), /*#__PURE__*/React.createElement("a", {
    href: `tel:${club.contactPhone}`,
    className: "text-sm hover:text-primary"
  }, club.contactPhone)))), club.social && Object.keys(club.social).length > 0 && /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-lg"
  }, "Follow Us")), /*#__PURE__*/React.createElement(CardContent, {
    className: "space-y-3"
  }, club.social.instagram && /*#__PURE__*/React.createElement("a", {
    href: club.social.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(Instagram, {
    className: "w-5 h-5 text-pink-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "Instagram")), club.social.linkedin && /*#__PURE__*/React.createElement("a", {
    href: club.social.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(Linkedin, {
    className: "w-5 h-5 text-blue-700"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "LinkedIn")), club.social.discord && /*#__PURE__*/React.createElement("a", {
    href: club.social.discord,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all"
  }, /*#__PURE__*/React.createElement(MessageCircle, {
    className: "w-5 h-5 text-indigo-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-slate-700"
  }, "Discord")))), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate(`/club/${id}/join`),
    className: "w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white py-6 text-lg font-semibold"
  }, "Join ", club.name), /*#__PURE__*/React.createElement(Card, {
    className: "bg-white dark:bg-slate-900 border-slate-200"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center pb-4 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-primary"
  }, club.members, "+"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, "Active Members")), /*#__PURE__*/React.createElement("div", {
    className: "text-center pb-4 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-accent"
  }, club.events.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, "Annual Events")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-yellow-600"
  }, club.achievements.length), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600"
  }, "Major Achievements")))))))))), /*#__PURE__*/React.createElement(Footer, null));
}