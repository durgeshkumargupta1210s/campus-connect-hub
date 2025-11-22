import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Trophy, Users, BookOpen, Briefcase } from "lucide-react";

const features = [
  {
    icon: <QrCode className="w-8 h-8" />,
    title: "Instant QR Registration",
    description: "Register for events in seconds with smart QR code technology. No more long queues!",
    color: "text-primary",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Fast Gate Entry",
    description: "Secure and lightning-fast entry scanning for all campus events and facilities.",
    color: "text-accent",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Hackathons & Contests",
    description: "Never miss a hackathon or competition. Get instant updates on all opportunities.",
    color: "text-primary",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Placement Updates",
    description: "Stay ahead with real-time placement drives, company visits, and career opportunities.",
    color: "text-accent",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Clubs & Communities",
    description: "Join clubs, connect with like-minded students, and build your campus network.",
    color: "text-primary",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Study Resources",
    description: "Access curated study materials, training programs, and skill development resources.",
    color: "text-accent",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need, One Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No more missing out on opportunities. CampusConnect brings everything to your fingertips.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 cursor-pointer group"
            >
              <CardHeader>
                <div className={`${feature.color} mb-4 group-hover:animate-float`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
