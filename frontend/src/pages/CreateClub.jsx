import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { APIClient, API_ENDPOINTS } from "@/config/api";
import React from "react";

const CreateClub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "other",
    email: "",
    phone: "",
    location: "",
    website: "",
    social: {
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: ""
    }
  });
  const [errors, setErrors] = useState({});

  const categories = [
    "technical",
    "cultural",
    "sports",
    "academic",
    "professional",
    "other"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Club name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Club name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[0-9\-\+\(\)\s]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Please enter a valid URL (http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSocialChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await APIClient.post(API_ENDPOINTS.CLUBS_CREATE, {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        socialLinks: formData.social
      });

      toast({
        title: "Success!",
        description: "Club created successfully. Redirecting..."
      });

      // Redirect to community page after 2 seconds
      setTimeout(() => {
        navigate("/community");
      }, 2000);
    } catch (error) {
      console.error("Error creating club:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create club. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-slate-50 border-b border-slate-200 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/community")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Communities
            </Button>
          </div>
        </div>

        <section className="bg-gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Create Your Club</h1>
            <p className="text-white/90 text-lg">
              Start a community and bring like-minded students together
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Club Information</CardTitle>
                  <CardDescription>Basic details about your club</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-semibold">
                      Club Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Tech Enthusiasts Club"
                      className="bg-background border-border"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground font-semibold">
                      Description *
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your club..."
                      className="w-full border rounded-lg p-3 h-32 bg-background border-border focus:ring-primary focus:ring-2"
                      required
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-foreground font-semibold">
                        Category *
                      </Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2 bg-background border-border focus:ring-primary focus:ring-2"
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-foreground font-semibold">
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Building A, Room 101"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How to reach your club</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="club@university.edu"
                        className="bg-background border-border"
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91-9876543210"
                        className="bg-background border-border"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-foreground font-semibold">
                      Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourclub.com"
                      className="bg-background border-border"
                    />
                    {errors.website && (
                      <p className="text-red-500 text-sm">{errors.website}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect your social media profiles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Instagram URL"
                    value={formData.social.instagram}
                    onChange={(e) => handleSocialChange("instagram", e.target.value)}
                    className="bg-background border-border"
                  />
                  <Input
                    placeholder="LinkedIn URL"
                    value={formData.social.linkedin}
                    onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                    className="bg-background border-border"
                  />
                  <Input
                    placeholder="Twitter URL"
                    value={formData.social.twitter}
                    onChange={(e) => handleSocialChange("twitter", e.target.value)}
                    className="bg-background border-border"
                  />
                  <Input
                    placeholder="Facebook URL"
                    value={formData.social.facebook}
                    onChange={(e) => handleSocialChange("facebook", e.target.value)}
                    className="bg-background border-border"
                  />
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white h-11 font-semibold"
                >
                  {isLoading ? "Creating Club..." : "Create Club"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/community")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Note:</strong> After creating your club, you will be able to add more details like club logo, team members, and achievements from your club dashboard.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CreateClub;
