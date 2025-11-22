import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Award, Code2, Rocket } from "lucide-react";

const hackathons = [
  {
    title: "AI/ML Innovation Challenge",
    date: "March 20-21, 2024",
    duration: "24 hours",
    prize: "₹50,000",
    participants: "120 registered",
    difficulty: "Advanced",
    tags: ["AI", "Machine Learning", "Deep Learning"],
    status: "Open",
  },
  {
    title: "Web3 Hackathon",
    date: "April 5-6, 2024",
    duration: "36 hours",
    prize: "₹75,000",
    participants: "85 registered",
    difficulty: "Intermediate",
    tags: ["Blockchain", "Smart Contracts", "DeFi"],
    status: "Open",
  },
  {
    title: "Mobile App Challenge",
    date: "April 15-16, 2024",
    duration: "48 hours",
    prize: "₹60,000",
    participants: "65 registered",
    difficulty: "All Levels",
    tags: ["React Native", "Flutter", "Mobile Dev"],
    status: "Open",
  },
];

const contests = [
  { title: "Coding Sprint", date: "March 25, 2024", prize: "₹20,000" },
  { title: "UI/UX Design Contest", date: "March 28, 2024", prize: "₹15,000" },
  { title: "Data Science Challenge", date: "April 2, 2024", prize: "₹30,000" },
];

const Hackathons = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 px-4">
          <div className="container mx-auto text-center">
            <Trophy className="w-20 h-20 text-white mx-auto mb-6 animate-float" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hackathons & Contests
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Compete, innovate, and win! Join exciting hackathons and coding challenges to showcase your skills.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Browse All Events
            </Button>
          </div>
        </section>

        {/* Active Hackathons */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">Active Hackathons</h2>
              <Badge className="bg-accent text-accent-foreground">3 Open</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {hackathons.map((hackathon, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-primary text-primary-foreground">{hackathon.status}</Badge>
                      <Badge variant="outline">{hackathon.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{hackathon.title}</CardTitle>
                    <CardDescription className="text-base">
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        <span>{hackathon.date}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{hackathon.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool:</span>
                      <span className="font-bold text-accent text-lg">{hackathon.prize}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{hackathon.participants}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Contests */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12">Quick Contests</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contests.map((contest, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <Code2 className="w-8 h-8 text-primary mb-2 group-hover:animate-float" />
                    <CardTitle className="text-xl">{contest.title}</CardTitle>
                    <CardDescription>{contest.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" />
                      <span className="font-bold text-accent text-lg">{contest.prize}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Participate */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Participate?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Rocket className="w-12 h-12" />,
                  title: "Build Your Portfolio",
                  description: "Create impressive projects that stand out to recruiters and showcase your skills.",
                },
                {
                  icon: <Users className="w-12 h-12" />,
                  title: "Network & Learn",
                  description: "Connect with like-minded developers, mentors, and industry professionals.",
                },
                {
                  icon: <Trophy className="w-12 h-12" />,
                  title: "Win Prizes",
                  description: "Compete for cash prizes, internships, and recognition from top companies.",
                },
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Hackathons;
