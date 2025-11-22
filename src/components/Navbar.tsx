import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Get Started", path: "/get-started" },
    { name: "QR Registration", path: "/qr-registration" },
    { name: "Fast Entry", path: "/fast-entry" },
    { name: "Hackathons", path: "/hackathons" },
    { name: "Placements", path: "/placements" },
    { name: "Community", path: "/community" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            CampusConnect
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
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

          <div className="hidden lg:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
