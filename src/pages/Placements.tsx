import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, TrendingUp, Building2, GraduationCap, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { initializeSampleOpportunities } from "@/utils/initializeSampleData";

const placements = [
  {
    id: '1',
    company: "Google",
    role: "Software Engineer Intern",
    location: "Bangalore",
    package: "₹8 LPA",
    deadline: "March 30, 2024",
    eligibility: "2024 & 2025 Graduates",
    type: "Internship",
    logo: "bg-gradient-to-br from-blue-500 to-blue-600",
    description: "Work with cutting-edge technologies at Google"
  },
  {
    id: '2',
    company: "Microsoft",
    role: "Full Stack Developer",
    location: "Hyderabad",
    package: "₹12-15 LPA",
    deadline: "April 5, 2024",
    eligibility: "2024 Graduates",
    type: "Full-Time",
    logo: "bg-gradient-to-br from-primary to-primary/70",
    description: "Build scalable solutions for millions of users"
  },
  {
    id: '3',
    company: "Amazon",
    role: "SDE I",
    location: "Mumbai",
    package: "₹18-22 LPA",
    deadline: "April 10, 2024",
    eligibility: "All Graduates",
    type: "Full-Time",
    logo: "bg-gradient-to-br from-accent to-accent/70",
    description: "Lead high-impact projects at Amazon"
  },
];

const upcomingDrives = [
  { company: "TCS", date: "March 25, 2024", roles: "15+ positions", icon: "🏢" },
  { company: "Infosys", date: "March 28, 2024", roles: "20+ positions", icon: "💼" },
  { company: "Wipro", date: "April 1, 2024", roles: "10+ positions", icon: "🎯" },
];

const Placements = () => {
  useEffect(() => {
    initializeSampleOpportunities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-hero pt-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
          </div>
          
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Build Your Career</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Placement & <br />
                <span className="bg-gradient-accent bg-clip-text text-transparent">Career Opportunities</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Your gateway to dream careers! Stay updated with the latest placement drives from top companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-glow transition-all">
                  View All Openings
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  Upload Resume
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">250+</div>
                  <div className="text-white/80 text-sm">Placed Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-accent">50+</div>
                  <div className="text-white/80 text-sm">Companies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-white/80 text-sm">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Opportunities */}
        <section className="py-24 px-4 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Active Opportunities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handpicked opportunities from top companies
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {placements.map((placement, index) => (
                <div key={index} className="group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition"></div>
                  <Card className="relative bg-white dark:bg-slate-900 border-border hover:shadow-xl transition-all group-hover:scale-105 h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-16 h-16 ${placement.logo} rounded-xl flex items-center justify-center text-white font-bold text-2xl`}>
                          {placement.company.charAt(0)}
                        </div>
                        <Badge className="bg-accent/20 text-accent hover:bg-accent/30">{placement.type}</Badge>
                      </div>
                      <CardTitle className="text-2xl text-foreground">{placement.company}</CardTitle>
                      <p className="text-lg font-semibold text-primary mt-2">{placement.role}</p>
                      <CardDescription className="text-base mt-2">{placement.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-foreground">
                          <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <div className="text-sm text-muted-foreground">Location</div>
                            <div className="font-semibold">{placement.location}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-foreground">
                          <TrendingUp className="w-5 h-5 text-accent flex-shrink-0" />
                          <div>
                            <div className="text-sm text-muted-foreground">Package</div>
                            <div className="text-2xl font-bold text-accent">{placement.package}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-foreground">
                          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <div className="text-sm text-muted-foreground">Deadline</div>
                            <div className="font-semibold">{placement.deadline}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-foreground">
                          <GraduationCap className="w-5 h-5 text-accent flex-shrink-0" />
                          <div>
                            <div className="text-sm text-muted-foreground">Eligibility</div>
                            <div className="font-semibold text-sm">{placement.eligibility}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardContent className="border-t border-border pt-4">
                      <Link to={`/opportunity/${placement.id}`}>
                        <Button className="w-full bg-gradient-accent hover:opacity-90 text-white">
                          View & Apply
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Campus Drives */}
        <section className="py-24 px-4 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Upcoming Campus Drives
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Mark your calendar for these exciting recruitment drives
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingDrives.map((drive, index) => (
                <Card key={index} className="bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="text-4xl mb-4">{drive.icon}</div>
                    <CardTitle className="text-2xl text-foreground">{drive.company}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                      <div className="font-semibold text-foreground">{drive.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Positions
                      </div>
                      <div className="font-semibold text-foreground">{drive.roles}</div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Get Notified
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Statistics */}
        <section className="py-24 px-4 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Success Story
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Numbers speak louder than words
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: "250+", label: "Students Placed" },
                { number: "50+", label: "Companies Visited" },
                { number: "₹22 LPA", label: "Highest Package" },
                { number: "95%", label: "Placement Rate" },
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all">
                    <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation Resources */}
        <section className="py-24 px-4 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Prepare for Success
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to excel in placement interviews
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Technical Interview Guide", desc: "Master DSA and coding problems", tips: ["Data Structures", "Algorithms", "System Design"] },
                { title: "HR & Behavioral Prep", desc: "Ace your HR round with confidence", tips: ["Mock Interviews", "HR Questions", "Negotiation Tips"] },
                { title: "Resume Building", desc: "Create a resume that gets you noticed", tips: ["ATS Optimization", "Format Tips", "Templates"] },
              ].map((resource, index) => (
                <Card key={index} className="bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{resource.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{resource.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {resource.tips.map((tip, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardContent className="border-t border-border pt-4">
                    <Link to="/resources">
                      <Button variant="outline" className="w-full">
                        Access Resources
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-hero">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Create your profile, upload your resume, and apply for your dream job today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-glow">
                Create Profile
              </Button>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  Prepare Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Placements;
