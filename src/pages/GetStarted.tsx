import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up with your college email to get started. It only takes 30 seconds!",
    features: ["Secure authentication", "Email verification", "Profile customization"],
  },
  {
    number: "02",
    title: "Complete Your Profile",
    description: "Add your department, year, and interests to personalize your experience.",
    features: ["Academic details", "Interest selection", "Profile picture"],
  },
  {
    number: "03",
    title: "Explore & Connect",
    description: "Start registering for events, joining clubs, and accessing resources.",
    features: ["Browse events", "Join communities", "Access resources"],
  },
];

const GetStarted = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get Started with CampusConnect
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of students already using CampusConnect to stay connected with campus life
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Create Account Now
            </Button>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Three Simple Steps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="text-6xl font-bold text-primary/20 mb-4">{step.number}</div>
                    <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What You'll Get Access To</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: "QR-Based Event Registration", link: "/qr-registration" },
                { title: "Fast Gate Entry Scanning", link: "/fast-entry" },
                { title: "Hackathon Updates", link: "/hackathons" },
                { title: "Placement Opportunities", link: "/placements" },
                { title: "Clubs & Communities", link: "/community" },
                { title: "Study Resources Hub", link: "/resources" },
              ].map((item, index) => (
                <Link key={index} to={item.link}>
                  <Card className="bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                    <CardContent className="p-6 flex items-center justify-between">
                      <span className="font-semibold">{item.title}</span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Connected?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join CampusConnect today and never miss another campus opportunity
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Sign Up Free
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GetStarted;
