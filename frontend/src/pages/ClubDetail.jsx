import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, Phone, MapPin, Loader2, ArrowLeft, Heart, Share2 } from "lucide-react";
import { APIClient, API_ENDPOINTS } from "@/config/api";

const ClubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    fetchClubDetails();
    
    return () => {
      // Cleanup on unmount
      setClub(null);
      setError(null);
    };
  }, [id]);

  const fetchClubDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await APIClient.get(API_ENDPOINTS.CLUBS_GET(id));
      setClub(response);
      
      // Check if user is a member
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          const userResponse = await APIClient.get(API_ENDPOINTS.USERS_PROFILE);
          const userId = userResponse._id || userResponse.id;
          setIsMember(response.members?.some(m => (m._id || m.id || m) === userId) || false);
        } catch (err) {
          console.log("User profile fetch skipped");
        }
      }
    } catch (err) {
      console.error("Error fetching club:", err);
      setError(err.message || "Failed to load club details");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast({
        title: "Not Logged In",
        description: "Please log in to join a club",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    try {
      setIsJoining(true);
      await APIClient.post(API_ENDPOINTS.CLUBS_JOIN(id));
      setIsMember(true);
      // Refresh club details
      await fetchClubDetails();
      toast({
        title: "Success",
        description: "You have successfully joined the club!",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to join club",
        variant: "destructive"
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeavClub = async () => {
    try {
      setIsJoining(true);
      await APIClient.post(API_ENDPOINTS.CLUBS_LEAVE(id));
      setIsMember(false);
      // Refresh club details
      await fetchClubDetails();
      toast({
        title: "Success",
        description: "You have left the club",
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to leave club",
        variant: "destructive"
      });
    } finally {
      setIsJoining(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      technical: "bg-blue-500",
      cultural: "bg-purple-500",
      sports: "bg-green-500",
      academic: "bg-orange-500",
      professional: "bg-red-500",
      other: "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading club details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || "Club not found"}</p>
            <Button onClick={() => navigate("/community")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clubs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate("/community")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clubs
          </Button>

          {/* Hero Section */}
          <div className={`h-48 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden ${getCategoryColor(club.category)}`}>
            <div className="text-white text-8xl opacity-20">#{club.category?.[0]?.toUpperCase() || 'C'}</div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Title and Category */}
              <div>
                <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${getCategoryColor(club.category)} text-white capitalize`}>
                    {club.category}
                  </Badge>
                  <Badge variant="outline">
                    {club.members?.length || 0} Members
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{club.description}</p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {club.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${club.email}`} className="text-primary hover:underline">
                          {club.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {club.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a href={`tel:${club.phone}`} className="text-primary hover:underline">
                          {club.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {club.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="text-foreground">{club.location}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Members Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Members ({club.members?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {club.members && club.members.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {club.members.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {(member.name || member.email || `Member ${index + 1}`).substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{member.name || member.email}</p>
                            {member.email && <p className="text-xs text-muted-foreground truncate">{member.email}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No members yet. Be the first to join!</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4">
              {/* Join/Leave Button */}
              <Card>
                <CardHeader>
                  <CardTitle>Join this Club</CardTitle>
                </CardHeader>
                <CardContent>
                  {isMember ? (
                    <Button
                      className="w-full bg-destructive hover:bg-destructive/90"
                      onClick={handleLeavClub}
                      disabled={isJoining}
                    >
                      {isJoining ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Leaving...
                        </>
                      ) : (
                        "Leave Club"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleJoinClub}
                      disabled={isJoining}
                    >
                      {isJoining ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        "Join Club"
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Members</p>
                    <p className="text-2xl font-bold">{club.members?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-lg font-semibold capitalize">{club.category}</p>
                  </div>
                  {club.createdAt && (
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="text-sm">{new Date(club.createdAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Share Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url);
                      toast({
                        title: "Copied",
                        description: "Club link copied to clipboard!",
                        variant: "default"
                      });
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClubDetail;
