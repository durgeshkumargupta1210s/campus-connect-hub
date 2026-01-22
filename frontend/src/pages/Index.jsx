import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserRole } from "@/hooks/useUserRole";

const Index = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { role: userRole, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect logged-in users to their dashboard
    if (isLoaded && !roleLoading && isSignedIn) {
      console.log('🔀 Redirecting to:', userRole === 'admin' ? '/admin' : '/user', 'Role:', userRole);
      navigate(userRole === 'admin' ? '/admin' : '/user', { replace: true });
    }
  }, [isLoaded, isSignedIn, userRole, roleLoading, navigate]);

  // Show loading while checking auth status or fetching role
  if (!isLoaded || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Only show home page if not logged in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    );
  }

  // Return null while redirecting
  return null;
};

export default Index;