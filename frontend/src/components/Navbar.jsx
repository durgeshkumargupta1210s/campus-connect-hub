import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useUser, useClerk, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useUserRole } from "@/hooks/useUserRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { role: userRole, loading: roleLoading } = useUserRole();
  
  const userName = user?.fullName || user?.firstName || 'User';

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Workshops", path: "/workshops" },
    { name: "Placements", path: "/placements" },
    { name: "Community", path: "/community" },
    { name: "Resources", path: "/resources" },
  ];

  // Filter nav items based on login status
  // When logged in: show all items except Home
  // When not logged in: only show Home (if not on home page)
  let visibleNavItems;
  if (isSignedIn) {
    visibleNavItems = navItems.filter(item => item.path !== "/");
  } else {
    visibleNavItems = location.pathname === "/" ? [] : navItems.filter(item => item.path === "/");
  }

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-0">
        <div className="flex justify-between items-center h-16">
          <NavLink 
            to="/" 
            className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent"
          >
            CampusConnect
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="text-foreground/70 hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          {isSignedIn ? (
            <div className="hidden lg:flex items-center gap-4 relative">
              <Button
                variant="outline"
                onClick={() => navigate(userRole === "admin" ? "/admin" : "/user")}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <SignInButton mode="modal">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-accent hover:opacity-90 text-white">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {visibleNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-foreground/70 hover:text-primary transition-colors py-2"
                  activeClassName="text-primary font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              {isSignedIn ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <div className="py-2">
                    <p className="font-semibold text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                  <Button
                    onClick={() => {
                      navigate(userRole === "admin" ? "/admin" : "/user");
                      setIsOpen(false);
                    }}
                    className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    My Dashboard
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start gap-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 bg-gradient-accent hover:opacity-90 text-white"
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;