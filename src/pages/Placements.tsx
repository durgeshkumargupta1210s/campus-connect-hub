import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, TrendingUp, Building2, GraduationCap } from "lucide-react";

const placements = [
  {
    company: "Google",
    role: "Software Engineer Intern",
    location: "Bangalore",
    package: "₹8 LPA",
    deadline: "March 30, 2024",
    eligibility: "2024 & 2025 Graduates",
    type: "Internship",
    logo: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    company: "Microsoft",
    role: "Full Stack Developer",
    location: "Hyderabad",
    package: "₹12-15 LPA",
    deadline: "April 5, 2024",
    eligibility: "2024 Graduates",
    type: "Full-Time",
    logo: "bg-gradient-to-br from-primary to-primary/70",
  },
  {
    company: "Amazon",
    role: "SDE I",
    location: "Mumbai",
    package: "₹18-22 LPA",
    deadline: "April 10, 2024",
    eligibility: "All Graduates",
    type: "Full-Time",
    logo: "bg-gradient-to-br from-accent to-accent/70",
  },
];

const upcomingDrives = [
  { company: "TCS", date: "March 25, 2024", roles: "15+ positions" },
  { company: "Infosys", date: "March 28, 2024", roles: "20+ positions" },
  { company: "Wipro", date: "April 1, 2024", roles: "10+ positions" },
];

const Placements = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 px-4">
          <div className="container mx-auto text-center">
            <Briefcase className="w-20 h-20 text-white mx-auto mb-6 animate-float" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Placement Opportunities
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Your gateway to dream careers! Stay updated with the latest placement drives and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                View All Openings
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                Upload Resume
              </Button>
            </div>
          </div>
        </section>

        {/* Active Opportunities */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">Active Opportunities</h2>
              <Badge className="bg-accent text-accent-foreground">{placements.length} Open</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {placements.map((placement, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 group">
                  <CardHeader>
                    <div className={`w-16 h-16 ${placement.logo} rounded-xl mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                      {placement.company.charAt(0)}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{placement.company}</CardTitle>
                      <Badge className="bg-primary text-primary-foreground">{placement.type}</Badge>
                    </div>
                    <CardDescription className="text-base font-semibold text-foreground">
                      {placement.role}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{placement.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="font-bold text-accent text-lg">{placement.package}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Apply by: {placement.deadline}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <span>{placement.eligibility}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Drives */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12">Upcoming Campus Drives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingDrives.map((drive, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <Building2 className="w-8 h-8 text-primary mb-2 group-hover:animate-float" />
                    <CardTitle className="text-2xl">{drive.company}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4" />
                      {drive.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{drive.roles}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Get Notified
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Placement Stats */}
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Placement Statistics 2024</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: "250+", label: "Students Placed" },
                { number: "50+", label: "Companies Visited" },
                { number: "₹22 LPA", label: "Highest Package" },
                { number: "95%", label: "Placement Rate" },
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                  <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation Resources */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Prepare for Success</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: "Interview Guides", desc: "Comprehensive guides for technical and HR interviews", link: "/resources" },
                { title: "Aptitude Tests", desc: "Practice tests and previous year questions", link: "/resources" },
                { title: "Resume Building", desc: "Tips and templates for creating standout resumes", link: "/resources" },
              ].map((resource, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription>{resource.desc}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Access Resources
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Placements;
