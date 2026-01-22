import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { setClerkTokenGetter } from "@/config/api";
import Index from "./pages/Index";
import Events from "./pages/Events.jsx";
import Workshops from "./pages/Workshops.jsx";
import BootCamps from "./pages/BootCamps.jsx";
import GuestLectures from "./pages/GuestLectures.jsx";
import Placements from "./pages/Placements";
import Community from "./pages/Community.jsx";
import Resources from "./pages/Resources";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminAddEvent from "./pages/AdminAddEvent";
import AdminAddOpportunity from "./pages/AdminAddOpportunity";
import EventDetails from "./pages/EventDetails";
import PaymentCheckout from "./pages/PaymentCheckout";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyPayments from "./pages/MyPayments";
import MyTickets from "./pages/MyTickets";
import OpportunityDetail from "./pages/OpportunityDetail";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import ClubDetail from "./pages/ClubDetail.jsx";
import JoinClub from "./pages/JoinClub";
import CreateClub from "./pages/CreateClub.jsx";
import AdminAddClub from "./pages/AdminAddClub";
import NotFound from "./pages/NotFound";
import React from "react";

const queryClient = new QueryClient();
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Component to setup Clerk token getter
const ClerkTokenSetup = ({ children }) => {
  const { getToken } = useAuth();
  
  React.useEffect(() => {
    setClerkTokenGetter(getToken);
  }, [getToken]);
  
  return children;
};

const App = () => /*#__PURE__*/React.createElement(ClerkProvider, {
  publishableKey: clerkPubKey
}, /*#__PURE__*/React.createElement(QueryClientProvider, {
  client: queryClient
}, /*#__PURE__*/React.createElement(TooltipProvider, null, /*#__PURE__*/React.createElement(ClerkTokenSetup, null, /*#__PURE__*/React.createElement(Toaster, null), /*#__PURE__*/React.createElement(Sonner, null), /*#__PURE__*/React.createElement(BrowserRouter, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}, /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
  path: "/",
  element: /*#__PURE__*/React.createElement(Index, null)
}), /*#__PURE__*/React.createElement(Route, {
  path: "/events",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Events, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/events/:eventId",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(EventDetails, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/event/:eventId/checkout",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "user"
  }, /*#__PURE__*/React.createElement(PaymentCheckout, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/event/:eventId/payment-success",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "user"
  }, /*#__PURE__*/React.createElement(PaymentSuccess, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/hackathons",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Events, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/hackathons/:eventId",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(EventDetails, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/workshops",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Workshops, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/workshops/:eventId",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(EventDetails, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/bootcamps",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(BootCamps, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/bootcamps/:eventId",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(EventDetails, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/guest-lectures",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(GuestLectures, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/guest-lectures/:eventId",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(EventDetails, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/placements",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Placements, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/opportunities",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Placements, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/resume-analysis",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(ResumeAnalysis, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/opportunity/:id",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(OpportunityDetail, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/community",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Community, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/create-club",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "user"
  }, /*#__PURE__*/React.createElement(CreateClub, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/club/:id",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(ClubDetail, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/club/:id/join",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(JoinClub, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/resources",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, null, /*#__PURE__*/React.createElement(Resources, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/my-payments",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "user"
  }, /*#__PURE__*/React.createElement(MyPayments, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/my-tickets",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "user"
  }, /*#__PURE__*/React.createElement(MyTickets, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/user",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "user"
  }, /*#__PURE__*/React.createElement(UserDashboard, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminDashboard, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin/dashboard",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminDashboard, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin/add-event",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminAddEvent, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin/edit-event/:id",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminAddEvent, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin/add-opportunity",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminAddOpportunity, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin/add-club",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminAddClub, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "/admin/edit-club/:id",
  element: /*#__PURE__*/React.createElement(ProtectedRoute, {
    requiredUserType: "admin"
  }, /*#__PURE__*/React.createElement(AdminAddClub, null))
}), /*#__PURE__*/React.createElement(Route, {
  path: "*",
  element: /*#__PURE__*/React.createElement(NotFound, null)
})))))));
export default App;