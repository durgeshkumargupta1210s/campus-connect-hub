import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Clock, CheckCircle2 } from "lucide-react";
import EventCard from "@/components/EventCard";

const benefits = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Save Time",
    description: "Register in seconds instead of waiting in long queues",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Friendly",
    description: "Register from anywhere using your smartphone",
  },
  {
    icon: <QrCode className="w-8 h-8" />,
    title: "Instant Confirmation",
    description: "Get your QR code immediately after registration",
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "Secure & Verified",
    description: "Your registration is verified and secure",
  },
];

const upcomingEvents = [
  {
    title: "Tech Fest 2024",
    date: "March 15, 2024",
    location: "Main Auditorium",
    attendees: 250,
    category: "Fest",
    imageColor: "bg-gradient-to-br from-primary to-primary/70",
  },
  {
    title: "AI/ML Hackathon",
    date: "March 20-21, 2024",
    location: "Computer Lab",
    attendees: 120,
    category: "Hackathon",
    imageColor: "bg-gradient-to-br from-accent to-accent/70",
  },
  {
    title: "Cultural Night",
    date: "March 18, 2024",
    location: "Open Arena",
    attendees: 500,
    category: "Cultural",
    imageColor: "bg-gradient-to-br from-primary to-accent",
  },
];

const QRRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Instant QR Registration
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  No more long queues! Register for events in seconds with our smart QR code technology.
                </p>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Registering
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                <div className="bg-white p-8 rounded-2xl flex items-center justify-center">
                  <QrCode className="w-64 h-64 text-primary" />
                </div>
                <p className="text-white text-center mt-4">Sample QR Code</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { step: "1", title: "Browse Events", desc: "Find events you want to attend" },
                { step: "2", title: "Click Register", desc: "Hit the register button" },
                { step: "3", title: "Get QR Code", desc: "Receive your unique QR code" },
                { step: "4", title: "Show & Enter", desc: "Show at gate for instant entry" },
              ].map((item, index) => (
                <Card key={index} className="bg-gradient-card border-border text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Use QR Registration?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="text-primary mb-4 group-hover:animate-float">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Events Available for Registration */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Events Open for Registration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QRRegistration;
