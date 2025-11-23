import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  LogOut, 
  Menu, 
  X, 
  BarChart3, 
  Calendar, 
  Users, 
  Zap,
  LayoutDashboard,
  Edit2,
  Trash2,
  Eye,
  Briefcase,
  Building2
} from "lucide-react";
import { registrationService } from "@/services/registrationService";
import { eventService } from "@/services/eventService";
import { groupRegistrationService } from "@/services/groupRegistrationService";
import { useOpportunities } from "@/hooks/useOpportunities";
const eventStats = [
  { label: "Total Events", value: "24", icon: Calendar, color: "text-primary" },
  { label: "Total Bookings", value: "1,250", icon: Users, color: "text-accent" },
  { label: "Upcoming Events", value: "8", icon: Zap, color: "text-primary" },
  { label: "Revenue", value: "₹2.5L", icon: BarChart3, color: "text-accent" },
];

const sampleEvents = [
  {
    id: 1,
    title: "Tech Fest 2024",
    date: "March 15, 2024",
    location: "Main Auditorium",
    capacity: 500,
    registered: 320,
    status: "Active",
  },
  {
    id: 2,
    title: "AI/ML Hackathon",
    date: "March 20-21, 2024",
    location: "Computer Lab",
    capacity: 120,
    registered: 95,
    status: "Active",
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "March 18, 2024",
    location: "Open Arena",
    capacity: 800,
    registered: 650,
    status: "Active",
  },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "bookings", label: "Bookings", icon: Users },
    { id: "opportunities", label: "Opportunities", icon: Briefcase },
    { id: "campus-drives", label: "Campus Drives", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-gradient-hero transition-all duration-300 border-r border-white/10 flex flex-col overflow-y-auto`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
              CC
            </div>
            {sidebarOpen && <span className="text-white font-bold text-lg">CampusConnect Admin</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-white/20 text-white border border-white/30"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-border shadow-sm">
          <div className="flex items-center justify-between p-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-foreground hover:bg-secondary p-2 rounded-lg transition-all"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <h1 className="text-2xl font-bold text-foreground">
              {menuItems.find(m => m.id === activeTab)?.label || "Dashboard"}
            </h1>
            
            {activeTab === "events" && (
              <Button 
                onClick={() => navigate("/admin/add-event")}
                className="bg-gradient-accent hover:opacity-90 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            )}
            {activeTab === "opportunities" && (
              <Button 
                onClick={() => navigate("/admin/add-opportunity")}
                className="bg-gradient-accent hover:opacity-90 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Opportunity
              </Button>
            )}
            {activeTab === "campus-drives" && (
              <Button 
                onClick={() => navigate("/admin/add-campus-drive")}
                className="bg-gradient-accent hover:opacity-90 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Campus Drive
              </Button>
            )}
            {!["events", "opportunities", "campus-drives"].includes(activeTab) && <div />}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "events" && <EventsTab />}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "opportunities" && <OpportunitiesTab />}
          {activeTab === "campus-drives" && <CampusDrivesTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </main>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {eventStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white dark:bg-slate-900 border-border hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{stat.label}</CardTitle>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Events */}
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Events</CardTitle>
          <CardDescription>Your latest created events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-all">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{event.registered}/{event.capacity}</p>
                  <p className="text-xs text-muted-foreground">Registered</p>
                </div>
                <Badge className="bg-primary text-primary-foreground ml-4">{event.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Events Tab Component
const EventsTab = () => {
  return (
    <div className="p-6">
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Manage Events</CardTitle>
          <CardDescription>Create, edit, and manage campus events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Event Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Capacity</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Registered</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleEvents.map((event) => (
                  <tr key={event.id} className="border-b border-border hover:bg-secondary transition-all">
                    <td className="py-3 px-4 text-foreground font-medium">{event.title}</td>
                    <td className="py-3 px-4 text-foreground">{event.date}</td>
                    <td className="py-3 px-4 text-foreground">{event.location}</td>
                    <td className="py-3 px-4 text-foreground">{event.capacity}</td>
                    <td className="py-3 px-4 text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{event.registered}/{event.capacity}</span>
                        <Badge variant="outline">{Math.round((event.registered / event.capacity) * 100)}%</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-primary text-primary-foreground">{event.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-all" title="View">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-all" title="Edit">
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Bookings Tab Component
const BookingsTab = () => {
  registrationService.initialize();
  groupRegistrationService.initialize();
  
  const allRegistrations = registrationService.getAllRegistrations();
  const allGroupRegistrations = groupRegistrationService.getAllGroupRegistrations();
  
  const totalRegistrations = allRegistrations.length + allGroupRegistrations.length;

  return (
    <div className="p-6 space-y-6">
      {/* Individual Registrations */}
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Individual Registrations</CardTitle>
          <CardDescription>Solo participants ({allRegistrations.length} total)</CardDescription>
        </CardHeader>
        <CardContent>
          {allRegistrations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">No individual registrations yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Name</th>
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Email</th>
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Event</th>
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allRegistrations.map((registration) => (
                    <tr key={registration.id} className="border-b border-border hover:bg-secondary transition-all">
                      <td className="py-3 px-3 text-foreground font-medium">{registration.userName}</td>
                      <td className="py-3 px-3 text-foreground">{registration.userEmail}</td>
                      <td className="py-3 px-3 text-foreground">{registration.eventTitle}</td>
                      <td className="py-3 px-3 text-foreground text-xs">
                        {new Date(registration.registeredAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3">
                        <Badge 
                          className={
                            registration.status === "Confirmed" 
                              ? "bg-primary text-primary-foreground"
                              : "bg-red-500 text-white"
                          }
                        >
                          {registration.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Registrations */}
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Team Registrations</CardTitle>
          <CardDescription>Group hackathon teams ({allGroupRegistrations.length} teams, {allGroupRegistrations.reduce((sum, t) => sum + t.totalMembers, 0)} members)</CardDescription>
        </CardHeader>
        <CardContent>
          {allGroupRegistrations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">No team registrations yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {allGroupRegistrations.map((team) => (
                <div key={team.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Team Name</p>
                      <p className="font-semibold text-foreground">{team.teamName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Event</p>
                      <p className="font-semibold text-foreground">{team.eventTitle}</p>
                    </div>
                    <div className="flex items-end">
                      <Badge 
                        className={
                          team.status === "Confirmed" 
                            ? "bg-primary text-primary-foreground"
                            : "bg-red-500 text-white"
                        }
                      >
                        {team.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Team Leader</p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="text-foreground font-medium">{team.teamLeader.name}</span>
                      <span className="text-muted-foreground">{team.teamLeader.email}</span>
                      <span className="text-muted-foreground">{team.teamLeader.phone}</span>
                    </div>

                    <p className="text-xs font-semibold text-muted-foreground mb-2">Team Members ({team.totalMembers})</p>
                    <div className="space-y-1">
                      {team.teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4 text-sm bg-secondary rounded px-3 py-2">
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          <span className="text-foreground font-medium min-w-32">{member.name}</span>
                          <span className="text-muted-foreground flex-1">{member.email}</span>
                          <span className="text-muted-foreground">{member.phone}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    Registered on {new Date(team.registeredAt).toLocaleDateString()} at {new Date(team.registeredAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = () => {
  return (
    <div className="p-6 space-y-6">
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Analytics Overview</CardTitle>
          <CardDescription>Event performance and user engagement metrics</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Analytics charts will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Opportunities Tab Component
const OpportunitiesTab = () => {
  const { opportunities, loadOpportunities, deleteOpportunity } = useOpportunities();

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  return (
    <div className="p-6 space-y-6">
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Manage Opportunities</CardTitle>
          <CardDescription>Create and manage job opportunities, internships, and fellowships ({opportunities.length} total)</CardDescription>
        </CardHeader>
        <CardContent>
          {opportunities.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">No opportunities created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <div key={opp.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Title</p>
                      <p className="font-semibold text-foreground">{opp.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Company</p>
                      <p className="font-semibold text-foreground">{opp.company}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <Badge className="bg-blue-100 text-blue-800">{opp.type}</Badge>
                    </div>
                    <div className="flex items-end">
                      <Badge className={opp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                        {opp.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground grid grid-cols-3 gap-2 mb-3">
                    {opp.ctc && <span>CTC: {opp.ctc}</span>}
                    {opp.positions && <span>Positions: {opp.positions}</span>}
                    {opp.deadline && <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-all" title="Edit">
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Delete this opportunity?')) {
                          deleteOpportunity(opp.id);
                        }
                      }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Campus Drives Tab Component
const CampusDrivesTab = () => {
  const { campusDrives, loadCampusDrives, deleteCampusDrive } = useOpportunities();

  useEffect(() => {
    loadCampusDrives();
  }, [loadCampusDrives]);

  return (
    <div className="p-6 space-y-6">
      <Card className="bg-white dark:bg-slate-900 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Manage Campus Drives</CardTitle>
          <CardDescription>Create and manage campus recruitment drives ({campusDrives.length} total)</CardDescription>
        </CardHeader>
        <CardContent>
          {campusDrives.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="w-10 h-10 mx-auto mb-3 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">No campus drives created yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campusDrives.map((drive) => (
                <div key={drive.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Company</p>
                      <p className="font-semibold text-foreground">{drive.company}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Drive Date</p>
                      <p className="font-semibold text-foreground">{new Date(drive.driveDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Positions</p>
                      <p className="font-semibold text-foreground">{drive.positions}</p>
                    </div>
                    <div className="flex items-end">
                      <Badge className={
                        drive.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        drive.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-slate-100 text-slate-800'
                      }>
                        {drive.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2 mb-3">
                    {drive.ctc && <span>CTC: {drive.ctc}</span>}
                    {drive.venue && <span>Venue: {drive.venue}</span>}
                  </div>

                  {drive.roles && drive.roles.length > 0 && (
                    <div className="text-sm mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Roles:</p>
                      <div className="flex flex-wrap gap-1">
                        {drive.roles.map((role, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{role}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-all" title="Edit">
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Delete this campus drive?')) {
                          deleteCampusDrive(drive.id);
                        }
                      }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
