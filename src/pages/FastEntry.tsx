import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <ScanLine className="w-8 h-8" />,
    title: "Lightning Fast Scanning",
    description: "Entry verification in under 2 seconds with our advanced QR scanner",
    stat: "< 2s",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Verification",
    description: "Each QR code is unique and verified against our secure database",
    stat: "100%",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "No Internet Required",
    description: "Offline mode available for uninterrupted gate operations",
    stat: "24/7",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Real-time Analytics",
    description: "Track attendance and entry patterns in real-time",
    stat: "Live",
  },
];

const FastEntry = () => {
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
                  Fast Gate Entry Scanning
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Say goodbye to long queues and slow manual checks. Our smart scanning system gets you in faster than ever.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    For Attendees
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                    For Organizers
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                <div className="bg-white p-12 rounded-2xl">
                  <ScanLine className="w-full h-64 text-primary animate-pulse" />
                </div>
                <p className="text-white text-center mt-4 font-semibold">Scan in Progress...</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Our System is Faster</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="text-primary mb-4 group-hover:animate-float">
                      {feature.icon}
                    </div>
                    <div className="text-4xl font-bold text-accent mb-2">{feature.stat}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How Fast Entry Works</h2>
            
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  title: "For Attendees",
                  steps: [
                    "Receive your QR code after event registration",
                    "Arrive at the venue and locate the scanning station",
                    "Show your QR code on your phone or printed copy",
                    "Entry approved! Walk in and enjoy the event",
                  ],
                },
                {
                  title: "For Gate Operators",
                  steps: [
                    "Open the CampusConnect scanner app",
                    "Point camera at attendee's QR code",
                    "System verifies in real-time (< 2 seconds)",
                    "Green checkmark = approved, proceed to next",
                  ],
                },
              ].map((section, idx) => (
                <Card key={idx} className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {section.steps.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                            {index + 1}
                          </div>
                          <p className="text-foreground pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">By The Numbers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: "10,000+", label: "Students Scanned" },
                { number: "500+", label: "Events Managed" },
                { number: "1.8s", label: "Average Scan Time" },
                { number: "99.9%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                  <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
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

export default FastEntry;
