import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Code2, Palette, Music, Camera, Mic, BookOpen } from "lucide-react";

const clubs = [
  {
    name: "Coding Club",
    icon: <Code2 className="w-8 h-8" />,
    members: "250+ members",
    description: "Learn, code, and build amazing projects together",
    tags: ["Programming", "Web Dev", "AI/ML"],
    color: "bg-gradient-to-br from-primary to-primary/70",
  },
  {
    name: "Design Society",
    icon: <Palette className="w-8 h-8" />,
    members: "180+ members",
    description: "Where creativity meets technology in UI/UX design",
    tags: ["UI/UX", "Graphic Design", "Figma"],
    color: "bg-gradient-to-br from-accent to-accent/70",
  },
  {
    name: "Music Club",
    icon: <Music className="w-8 h-8" />,
    members: "320+ members",
    description: "Express yourself through melodies and rhythms",
    tags: ["Singing", "Instruments", "Band"],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    name: "Photography Club",
    icon: <Camera className="w-8 h-8" />,
    members: "150+ members",
    description: "Capture moments, tell stories through lenses",
    tags: ["Photography", "Videography", "Editing"],
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    name: "Debate Society",
    icon: <Mic className="w-8 h-8" />,
    members: "200+ members",
    description: "Sharpen your oratory and critical thinking skills",
    tags: ["Public Speaking", "Debate", "MUN"],
    color: "bg-gradient-to-br from-orange-500 to-red-500",
  },
  {
    name: "Literary Club",
    icon: <BookOpen className="w-8 h-8" />,
    members: "140+ members",
    description: "For the love of words, stories, and literature",
    tags: ["Writing", "Poetry", "Book Club"],
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
];

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Clubs Grid */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">Active Clubs</h2>
              <Badge className="bg-accent text-accent-foreground">{clubs.length} Communities</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all hover:scale-105 group overflow-hidden">
                  <div className={`h-32 ${club.color} relative flex items-center justify-center`}>
                    <div className="text-white group-hover:animate-float">
                      {club.icon}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{club.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {club.members}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{club.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {club.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Join Club
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Join a Club?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Users className="w-12 h-12" />,
                  title: "Build Your Network",
                  description: "Connect with students who share your passions and interests across all years.",
                },
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: "Pursue Your Passion",
                  description: "Dedicate time to what you love while balancing academics and personal growth.",
                },
                {
                  icon: <BookOpen className="w-12 h-12" />,
                  title: "Learn New Skills",
                  description: "Develop leadership, teamwork, and technical skills through hands-on experience.",
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

        {/* Upcoming Events */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12">Upcoming Club Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { club: "Coding Club", event: "Web Dev Workshop", date: "March 22, 2024" },
                { club: "Music Club", event: "Open Mic Night", date: "March 25, 2024" },
                { club: "Design Society", event: "Figma Masterclass", date: "March 27, 2024" },
                { club: "Photography Club", event: "Campus Photo Walk", date: "March 30, 2024" },
              ].map((item, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{item.club}</Badge>
                    <CardTitle className="text-xl">{item.event}</CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                  </CardHeader>
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

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Start Your Club Journey</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't see a club that matches your interest? Start your own community!
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Create a Club
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
