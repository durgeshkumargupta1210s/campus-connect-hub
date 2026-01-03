import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Users, Trophy, Calendar, Bookmark, ArrowRight, Star, Lock } from "lucide-react";
import React from "react";
const CreateAccountNow = () => {
  const navigate = useNavigate();
  const features = [{
    icon: Calendar,
    title: "Discover Events",
    description: "Find and register for exciting campus events, hackathons, and competitions",
    color: "text-blue-500"
  }, {
    icon: Trophy,
    title: "Win Rewards",
    description: "Compete, earn badges, and climb the leaderboards with other students",
    color: "text-amber-500"
  }, {
    icon: Users,
    title: "Join Community",
    description: "Connect with peers, share ideas, and build lasting network",
    color: "text-green-500"
  }, {
    icon: Zap,
    title: "Career Growth",
    description: "Access placement opportunities and career development resources",
    color: "text-purple-500"
  }, {
    icon: Bookmark,
    title: "Save Events",
    description: "Bookmark your favorite events and never miss an opportunity",
    color: "text-red-500"
  }, {
    icon: Lock,
    title: "Secure Account",
    description: "Your data is encrypted and protected with industry-standard security",
    color: "text-indigo-500"
  }];
  const benefits = [{
    text: "Free to join",
    icon: "✓"
  }, {
    text: "No hidden fees",
    icon: "✓"
  }, {
    text: "Instant verification",
    icon: "✓"
  }, {
    text: "Mobile friendly",
    icon: "✓"
  }, {
    text: "24/7 Support",
    icon: "✓"
  }, {
    text: "Advanced analytics",
    icon: "✓"
  }];
  const testimonials = [{
    name: "Rahul Sharma",
    role: "Computer Science Student",
    text: "CampusConnect helped me discover amazing opportunities. I've attended 15+ events and won 3 hackathons!",
    avatar: "RS"
  }, {
    name: "Priya Patel",
    role: "Final Year Student",
    text: "The placement resources here are incredible. Got offers from 2 amazing companies!",
    avatar: "PP"
  }, {
    name: "Aditya Singh",
    role: "Event Coordinator",
    text: "Managing events has never been easier. The admin dashboard is intuitive and powerful.",
    avatar: "AS"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-background"
  }, /*#__PURE__*/React.createElement("section", {
    className: "relative py-20 px-4 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 -z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
  })), /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-4xl text-center space-y-8"
  }, /*#__PURE__*/React.createElement(Badge, {
    className: "bg-primary/20 text-primary hover:bg-primary/30 px-4 py-1"
  }, /*#__PURE__*/React.createElement(Zap, {
    className: "w-4 h-4 mr-1 inline"
  }), "Join 10,000+ Students & Admins"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl md:text-6xl font-bold text-foreground"
  }, "Create Your Account", /*#__PURE__*/React.createElement("span", {
    className: "block bg-gradient-hero bg-clip-text text-transparent"
  }, "and Get Started Today")), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground max-w-2xl mx-auto"
  }, "Join CampusConnect to unlock exclusive events, networking opportunities, and career growth on your campus.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center pt-8"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/signup"),
    className: "bg-gradient-accent hover:opacity-90 text-white font-semibold h-12 px-8 flex items-center justify-center gap-2 text-lg"
  }, "Create Account Now", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/login"),
    variant: "outline",
    className: "border-primary text-primary hover:bg-primary/10 font-semibold h-12 px-8 text-lg"
  }, "Already have an account? Sign In")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-4 pt-8 text-sm text-muted-foreground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4 text-green-500"
  }), /*#__PURE__*/React.createElement("span", null, "Email verified")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4 text-green-500"
  }), /*#__PURE__*/React.createElement("span", null, "Secure login")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4 text-green-500"
  }), /*#__PURE__*/React.createElement("span", null, "Privacy protected"))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-secondary/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-5xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4 mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-foreground"
  }, "Why Join CampusConnect?"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-muted-foreground"
  }, "Everything you need to succeed in your college journey")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, features.map((feature, index) => {
    const Icon = feature.icon;
    return /*#__PURE__*/React.createElement(Card, {
      key: index,
      className: "bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-shadow group"
    }, /*#__PURE__*/React.createElement(CardHeader, {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform`
    }, /*#__PURE__*/React.createElement(Icon, {
      className: `w-6 h-6 ${feature.color}`
    })), /*#__PURE__*/React.createElement(CardTitle, {
      className: "text-foreground"
    }, feature.title)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
      className: "text-muted-foreground"
    }, feature.description)));
  })))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-secondary/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-5xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4 mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-foreground"
  }, "What Users Say"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-muted-foreground"
  }, "Join thousands of satisfied students and admins")), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-6"
  }, testimonials.map((testimonial, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-shadow"
  }, /*#__PURE__*/React.createElement(CardContent, {
    className: "pt-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, [...Array(5)].map((_, i) => /*#__PURE__*/React.createElement(Star, {
    key: i,
    className: "w-4 h-4 fill-amber-400 text-amber-400"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground italic"
  }, "\"", testimonial.text, "\""), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 pt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm"
  }, testimonial.avatar), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-foreground font-semibold text-sm"
  }, testimonial.name), /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground text-xs"
  }, testimonial.role))))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4 bg-secondary/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-3xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4 mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-foreground"
  }, "Frequently Asked Questions"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-muted-foreground"
  }, "Quick answers to help you get started")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, [{
    q: "Is it really free to join?",
    a: "Yes! Creating an account is completely free. You get instant access to all features without any hidden charges."
  }, {
    q: "How quickly can I start?",
    a: "You can create your account and start exploring events in less than 2 minutes. No complex setup required!"
  }, {
    q: "Can I change my account type later?",
    a: "Yes, you can contact support to upgrade from student to admin account if needed."
  }, {
    q: "Is my data secure?",
    a: "Absolutely. We use industry-standard encryption and security protocols to protect your personal information."
  }, {
    q: "What if I need help?",
    a: "Our support team is available 24/7 to help you with any questions or issues."
  }, {
    q: "Can I delete my account?",
    a: "Yes, you can delete your account anytime from your account settings. All your data will be securely removed."
  }].map((faq, index) => /*#__PURE__*/React.createElement(Card, {
    key: index,
    className: "bg-white dark:bg-slate-900 border-border hover:border-primary/30 transition-colors"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-foreground"
  }, faq.q)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "text-muted-foreground"
  }, faq.a))))))), /*#__PURE__*/React.createElement("section", {
    className: "py-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto max-w-2xl text-center space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-foreground"
  }, "Don't Miss Out!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-muted-foreground"
  }, "Thousands of students are already discovering amazing opportunities. Join them today.")), /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/signup"),
    className: "bg-gradient-accent hover:opacity-90 text-white font-semibold h-14 px-10 text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
  }, "Create Your Account Now", /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted-foreground"
  }, "Questions? ", /*#__PURE__*/React.createElement("button", {
    className: "text-primary hover:text-primary/80 font-medium"
  }, "Contact us"), " \u2022", /*#__PURE__*/React.createElement("button", {
    className: "text-primary hover:text-primary/80 font-medium ml-2"
  }, "Read our blog")))));
};
export default CreateAccountNow;