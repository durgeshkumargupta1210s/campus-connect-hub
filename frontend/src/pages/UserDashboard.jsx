import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Ticket, Heart, LogOut, Settings, Bell, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { APIClient, API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, userName, userEmail, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await APIClient.get(API_ENDPOINTS.REGISTRATIONS_LIST);
      
      let regsData = [];
      if (Array.isArray(data)) {
        regsData = data;
      } else if (data.registrations && Array.isArray(data.registrations)) {
        regsData = data.registrations;
      }

      setRegistrations(regsData);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError("Failed to load registrations");
      toast({
        title: "Error",
        description: "Failed to load your registrations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return registrations.filter(reg => {
      if (!reg.event || !reg.event.date) return false;
      const eventDate = new Date(reg.event.date);
      return eventDate > today;
    });
  };

  const getPastEvents = () => {
    const today = new Date();
    return registrations.filter(reg => {
      if (!reg.event || !reg.event.date) return false;
      const eventDate = new Date(reg.event.date);
      return eventDate <= today;
    });
  };

  const upcomingCount = getUpcomingEvents().length;
  const pastCount = getPastEvents().length;

  const getInitials = () => {
    const name = userName || userEmail || "User";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-hero py-12 px-4 border-b border-white/10">
          <div className="container mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white text-gradient-hero rounded-full flex items-center justify-center font-bold text-xl">
                  {getInitials()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">{userName || "User"}</h1>
                  <p className="text-white/80">{userEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                  title="Settings"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 px-4 bg-background border-b border-border">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{registrations.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">events registered</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{upcomingCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">coming up</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Attended Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">{pastCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">completed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Registered Events</TabsTrigger>
                <TabsTrigger value="saved">Event Details</TabsTrigger>
              </TabsList>

              {/* Registered Events Tab */}
              <TabsContent value="overview" className="space-y-6 mt-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : error ? (
                    <Card className="border-destructive/50 bg-destructive/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                          <AlertCircle className="w-5 h-5" />
                          Error Loading Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-destructive/90">{error}</p>
                        <Button onClick={fetchRegistrations} variant="outline" className="mt-4">
                          Retry
                        </Button>
                      </CardContent>
                    </Card>
                  ) : getUpcomingEvents().length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getUpcomingEvents().map((reg) => (
                        <Card key={reg._id || reg.id} className="hover:shadow-lg transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <Badge className="bg-accent/20 text-accent capitalize">
                                {reg.event?.category || "Event"}
                              </Badge>
                              <Badge variant="outline">Registered</Badge>
                            </div>
                            <CardTitle className="text-lg">{reg.event?.title || "Event"}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : "Date TBA"}
                            </div>
                            {reg.event?.location && (
                              <p className="text-sm text-muted-foreground">📍 {reg.event.location}</p>
                            )}
                            <Button
                              className="w-full"
                              onClick={() => navigate(`/events/${reg.event._id || reg.event.id}`)}
                            >
                              View Event Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">No upcoming events registered</p>
                        <Button onClick={() => navigate("/events")}>Browse Events</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Attended Events</h3>
                  {getPastEvents().length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getPastEvents().map((reg) => (
                        <Card key={reg._id || reg.id} className="opacity-75">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <Badge className="bg-gray-500/20 text-gray-600 capitalize">
                                {reg.event?.category || "Event"}
                              </Badge>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                            <CardTitle className="text-lg">{reg.event?.title || "Event"}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : "Date TBA"}
                            </div>
                            {reg.event?.location && (
                              <p className="text-sm text-muted-foreground">📍 {reg.event.location}</p>
                            )}
                            <Button variant="outline" className="w-full">
                              View Certificate
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No attended events yet</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Event Details Tab */}
              <TabsContent value="saved" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Information</CardTitle>
                    <CardDescription>Details about your event registrations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {registrations.length > 0 ? (
                      registrations.map((reg) => (
                        <div key={reg._id || reg.id} className="border-b pb-6 last:border-b-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Event</p>
                              <p className="text-lg font-semibold">{reg.event?.title || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Registration Date</p>
                              <p className="text-lg font-semibold">
                                {reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString() : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Event Date</p>
                              <p className="text-lg font-semibold">
                                {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : "TBA"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Location</p>
                              <p className="text-lg font-semibold">{reg.event?.location || "TBA"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Category</p>
                              <Badge className="capitalize">{reg.event?.category || "Event"}</Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge variant="outline">{reg.status || "Registered"}</Badge>
                            </div>
                          </div>
                          <Button variant="outline" className="mt-2">
                            Download Details
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No registrations yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
