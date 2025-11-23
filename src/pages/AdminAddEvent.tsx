import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, CheckCircle } from "lucide-react";
import { useEventNotifications } from "@/hooks/useEventNotifications";
import { useEvents } from "@/hooks/useEvents";
import { eventService } from "@/services/eventService";

const AddEventPage = () => {
  const navigate = useNavigate();
  const { notifyNewEvent } = useEventNotifications();
  const { addEvent } = useEvents();
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    endTime: "",
    duration: "",
    location: "",
    description: "",
    category: "Hackathon",
    capacity: "",
    registrationFee: "",
    prize: "",
    difficulty: "All Levels",
    poster: null,
    tags: [],
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    // Hackathon specific
    problemStatements: "",
    judgesCriteria: "",
    // Placement specific
    company: "",
    ctc: "",
    positions: "",
    eligibility: "",
    jobProfile: "",
    // Workshop specific
    mentor: "",
    materials: "",
    prerequisites: "",
  });

  const [tagInput, setTagInput] = useState("");
  
  // All supported event categories
  const categories = [
    { name: "Hackathon", icon: "⚡", description: "Coding competition" },
    { name: "Workshop", icon: "📚", description: "Learning session" },
    { name: "Placement", icon: "💼", description: "Job opportunity" },
    { name: "Seminar", icon: "🎤", description: "Knowledge sharing" },
    { name: "Fest", icon: "🎉", description: "Cultural event" },
    { name: "Talk", icon: "💬", description: "Speaker session" },
    { name: "Competition", icon: "🏆", description: "Contest" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, poster: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Build event data with category-specific fields
    const eventData = {
      title: formData.eventName,
      eventName: formData.eventName,
      date: formData.date,
      time: formData.time,
      endTime: formData.endTime,
      duration: formData.duration,
      location: formData.location,
      description: formData.description,
      category: formData.category,
      capacity: parseInt(formData.capacity) || 0,
      registrationFee: formData.registrationFee,
      prize: formData.prize,
      difficulty: formData.difficulty,
      tags: formData.tags,
      organizer: formData.organizer,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      status: "Open",
      participants: 0,
      // Category-specific fields
      ...(formData.category === "Hackathon" && {
        problemStatements: formData.problemStatements,
        judgesCriteria: formData.judgesCriteria
      }),
      ...(formData.category === "Workshop" && {
        mentor: formData.mentor,
        prerequisites: formData.prerequisites,
        materials: formData.materials
      }),
      ...(formData.category === "Placement" && {
        company: formData.company,
        ctc: formData.ctc,
        positions: parseInt(formData.positions) || 0,
        jobProfile: formData.jobProfile,
        eligibility: formData.eligibility
      })
    };
    
    // Add event to storage service
    const newEvent = addEvent(eventData);

    console.log("Event Data:", newEvent);
    
    // Notify subscribers about the new event
    const notificationResult = await notifyNewEvent({
      name: formData.eventName,
      date: formData.date,
      description: formData.description,
      category: formData.category
    });

    // Show success message with subscriber count
    const subscriberMessage = notificationResult.count > 0 
      ? ` Notification sent to ${notificationResult.count} subscribers!`
      : '';
    
    setSuccessMessage(`Event created successfully!${subscriberMessage}`);
    
    // Reset form and navigate after 2 seconds
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/admin");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-6 px-4 border-b border-white/10">
        <div className="container mx-auto">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white">Create New Event</h1>
          <p className="text-white/80 mt-2">Fill in the details to create a new campus event</p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500/20 border-t-2 border-green-500 px-4 py-4">
          <div className="container mx-auto flex items-center gap-2 text-green-300">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-white dark:bg-slate-900 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Basic Information</CardTitle>
                <CardDescription>Event name, date, and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-foreground font-semibold mb-2 block">Event Name *</Label>
                  <Input
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="e.g., Tech Fest 2024"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Date *</Label>
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-background border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Start Time *</Label>
                    <Input
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="bg-background border-border"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">End Time *</Label>
                    <Input
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="bg-background border-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground font-semibold mb-2 block">Location *</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Main Auditorium, Campus Ground"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Duration</Label>
                    <Input
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 24 hours, 2 days, 3 weeks"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Prize Pool</Label>
                    <Input
                      name="prize"
                      value={formData.prize}
                      onChange={handleInputChange}
                      placeholder="e.g., ₹50,000"
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground font-semibold mb-2 block">Description *</Label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event in detail..."
                    className="w-full min-h-32 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="bg-white dark:bg-slate-900 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Event Details</CardTitle>
                <CardDescription>Category, capacity, and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Category *</Label>
                    <select
                      name="category"
                      title="Select event category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {categories.find(c => c.name === formData.category)?.description}
                    </p>
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Difficulty Level</Label>
                    <select
                      name="difficulty"
                      title="Select difficulty level"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="All Levels">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Capacity *</Label>
                    <Input
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                      className="bg-background border-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground font-semibold mb-2 block">Registration Fee (₹)</Label>
                  <Input
                    name="registrationFee"
                    type="number"
                    value={formData.registrationFee}
                    onChange={handleInputChange}
                    placeholder="Leave blank for free event"
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <Label className="text-foreground font-semibold mb-2 block">Tags</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="Add tags (press Enter)"
                      className="bg-background border-border flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddTag}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <Badge key={tag} className="bg-primary text-primary-foreground flex items-center gap-2">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:opacity-70"
                          title={`Remove ${tag} tag`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category-Specific Fields */}
            {formData.category === "Hackathon" && (
              <Card className="bg-white dark:bg-slate-900 border-border border-accent/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Hackathon Details</CardTitle>
                  <CardDescription>Hackathon-specific information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Problem Statements</Label>
                    <textarea
                      name="problemStatements"
                      value={formData.problemStatements}
                      onChange={handleInputChange}
                      placeholder="List the problem statements or themes (one per line)..."
                      className="w-full min-h-24 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Judging Criteria</Label>
                    <textarea
                      name="judgesCriteria"
                      value={formData.judgesCriteria}
                      onChange={handleInputChange}
                      placeholder="Describe how projects will be judged..."
                      className="w-full min-h-24 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {formData.category === "Workshop" && (
              <Card className="bg-white dark:bg-slate-900 border-border border-accent/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Workshop Details</CardTitle>
                  <CardDescription>Workshop-specific information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Mentor/Instructor Name</Label>
                    <Input
                      name="mentor"
                      value={formData.mentor}
                      onChange={handleInputChange}
                      placeholder="Name of the workshop instructor"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Prerequisites</Label>
                    <textarea
                      name="prerequisites"
                      value={formData.prerequisites}
                      onChange={handleInputChange}
                      placeholder="Skills or knowledge required to attend..."
                      className="w-full min-h-20 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Materials Provided</Label>
                    <textarea
                      name="materials"
                      value={formData.materials}
                      onChange={handleInputChange}
                      placeholder="Learning materials, resources, or tools provided..."
                      className="w-full min-h-20 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {formData.category === "Placement" && (
              <Card className="bg-white dark:bg-slate-900 border-border border-accent/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Placement Details</CardTitle>
                  <CardDescription>Job opportunity information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Company Name *</Label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Recruiting company name"
                      className="bg-background border-border"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-semibold mb-2 block">CTC (Package)</Label>
                      <Input
                        name="ctc"
                        value={formData.ctc}
                        onChange={handleInputChange}
                        placeholder="e.g., 8-12 LPA"
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground font-semibold mb-2 block">Number of Positions</Label>
                      <Input
                        name="positions"
                        type="number"
                        value={formData.positions}
                        onChange={handleInputChange}
                        placeholder="e.g., 50"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Job Profile</Label>
                    <Input
                      name="jobProfile"
                      value={formData.jobProfile}
                      onChange={handleInputChange}
                      placeholder="e.g., Software Engineer, Data Analyst"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Eligibility Criteria</Label>
                    <textarea
                      name="eligibility"
                      value={formData.eligibility}
                      onChange={handleInputChange}
                      placeholder="GPA requirements, branch eligibility, etc..."
                      className="w-full min-h-20 p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizer Information */}
            <Card className="bg-white dark:bg-slate-900 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Organizer Information</CardTitle>
                <CardDescription>Your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-foreground font-semibold mb-2 block">Organizer Name *</Label>
                  <Input
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    placeholder="Your name or organization"
                    className="bg-background border-border"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Email *</Label>
                    <Input
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="contact@example.com"
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold mb-2 block">Phone *</Label>
                    <Input
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXXXXXXX"
                      className="bg-background border-border"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Poster */}
            <Card className="bg-white dark:bg-slate-900 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Event Poster</CardTitle>
                <CardDescription>Upload a poster image for your event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary transition-all cursor-pointer">
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <p className="text-foreground font-semibold">Click to upload poster</p>
                        <p className="text-muted-foreground text-sm">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      {formData.poster && (
                        <div className="mt-4">
                          <Badge className="bg-accent text-accent-foreground">
                            {formData.poster.name}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-end pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-accent hover:opacity-90 text-white px-8"
              >
                Create Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;
