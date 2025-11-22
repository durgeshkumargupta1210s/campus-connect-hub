import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">CampusConnect</h3>
            <p className="text-white/80 text-sm">
              Where Every Student Stays Connected!
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Event Registration</li>
              <li>QR Scanning</li>
              <li>Hackathons</li>
              <li>Placements</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Clubs</li>
              <li>Study Resources</li>
              <li>Training Hub</li>
              <li>Connect</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 text-sm flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4 text-accent fill-accent" /> for a connected campus
          </p>
          <p className="text-white/60 text-xs mt-2">
            © 2024 CampusConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
