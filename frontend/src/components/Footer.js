import { Heart, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { emailService } from "@/services/emailService";
import React from "react";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleSubscribe = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const result = await emailService.subscribe(email);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message
    });
    if (result.success) {
      setEmail("");
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
    setLoading(false);
  };
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-gradient-hero relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("section", {
    className: "py-16 px-4 border-b border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-4xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-white mb-2"
  }, "Stay Updated"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80"
  }, "Get the latest news about events, hackathons, and opportunities")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubscribe,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "Enter your email",
    value: email,
    onChange: e => setEmail(e.target.value),
    className: "bg-white/20 border-white/20 text-white placeholder:text-white/50",
    disabled: loading,
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: loading,
    className: "bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap"
  }, loading ? "Subscribing..." : "Subscribe")), message && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 p-3 rounded-lg ${message.type === "success" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`
  }, message.type === "success" ? /*#__PURE__*/React.createElement(CheckCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }) : /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-5 h-5 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, message.text)))))), /*#__PURE__*/React.createElement("div", {
    className: "py-16 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-5 gap-12 mb-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-white font-bold text-2xl mb-4"
  }, "CampusConnect"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm mb-6"
  }, "Where Every Student Stays Connected! Your ultimate campus companion."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-white/60 hover:text-white transition-colors",
    title: "Facebook"
  }, /*#__PURE__*/React.createElement(Facebook, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-white/60 hover:text-white transition-colors",
    title: "Twitter"
  }, /*#__PURE__*/React.createElement(Twitter, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-white/60 hover:text-white transition-colors",
    title: "Linkedin"
  }, /*#__PURE__*/React.createElement(Linkedin, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-white/60 hover:text-white transition-colors",
    title: "Instagram"
  }, /*#__PURE__*/React.createElement(Instagram, {
    className: "w-5 h-5"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-semibold mb-6 text-lg"
  }, "Features"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-white/80 text-sm"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/qr-registration",
    className: "hover:text-white transition-colors"
  }, "QR Registration")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/fast-entry",
    className: "hover:text-white transition-colors"
  }, "Fast Entry")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/events",
    className: "hover:text-white transition-colors"
  }, "Events")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/placements",
    className: "hover:text-white transition-colors"
  }, "Placements")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/resources",
    className: "hover:text-white transition-colors"
  }, "Resources")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-semibold mb-6 text-lg"
  }, "Community"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-white/80 text-sm"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/community",
    className: "hover:text-white transition-colors"
  }, "Join Clubs")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/resources",
    className: "hover:text-white transition-colors"
  }, "Study Resources")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/community",
    className: "hover:text-white transition-colors"
  }, "Discussion Forum")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Events Calendar")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Announcements")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-semibold mb-6 text-lg"
  }, "Support"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-white/80 text-sm"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Help Center")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Contact Us")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "FAQ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Privacy Policy")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Terms of Service")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-white font-semibold mb-6 text-lg"
  }, "Get In Touch"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-white/80 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 items-start"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-white"
  }, "Email"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@campusconnect.edu",
    className: "hover:text-white transition-colors"
  }, "hello@campusconnect.edu"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 items-start"
  }, /*#__PURE__*/React.createElement(Phone, {
    className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-white"
  }, "Phone"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+919876543210",
    className: "hover:text-white transition-colors"
  }, "+91 9876 543 210"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 items-start"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-white"
  }, "Location"), /*#__PURE__*/React.createElement("div", null, "Campus, City, Country")))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-white/10 pt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm flex items-center justify-center gap-2"
  }, "Built with ", /*#__PURE__*/React.createElement(Heart, {
    className: "w-4 h-4 text-accent fill-accent"
  }), " for a connected campus"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/60 text-sm"
  }, "\xA9 2024 CampusConnect. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 text-white/60 text-xs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white transition-colors"
  }, "Cookies")))))));
};
export default Footer;