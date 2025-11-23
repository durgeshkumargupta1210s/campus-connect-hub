import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Hackathons from "./pages/Hackathons";
import Workshops from "./pages/Workshops";
import Placements from "./pages/Placements";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminAddEvent from "./pages/AdminAddEvent";
import AdminAddOpportunity from "./pages/AdminAddOpportunity";
import AdminAddCampusDrive from "./pages/AdminAddCampusDrive";
import EventDetails from "./pages/EventDetails";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import CampusDrives from "./pages/CampusDrives";
import CampusDriveDetail from "./pages/CampusDriveDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAccountNow from "./pages/CreateAccountNow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-account" element={<CreateAccountNow />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/hackathons/:eventId" element={<EventDetails />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:eventId" element={<EventDetails />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunity/:id" element={<OpportunityDetail />} />
          <Route path="/campus-drives" element={<CampusDrives />} />
          <Route path="/campus-drive/:id" element={<CampusDriveDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin/add-event" element={<AdminAddEvent />} />
          <Route path="/admin/add-opportunity" element={<AdminAddOpportunity />} />
          <Route path="/admin/add-campus-drive" element={<AdminAddCampusDrive />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
