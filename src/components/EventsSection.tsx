import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";

const events = [
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
    title: "Placement Drive - TCS",
    date: "March 25, 2024",
    location: "Block A",
    attendees: 180,
    category: "Placement",
    imageColor: "bg-gradient-to-br from-primary to-accent",
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't miss out on exciting campus activities
            </p>
          </div>
          <Button variant="outline" className="hidden md:block">
            View All Events
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full sm:w-auto">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
