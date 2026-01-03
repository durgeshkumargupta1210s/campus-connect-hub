// Opportunity & Campus Drive Service
// Manages job opportunities and campus drives

const OPPORTUNITIES_KEY = 'campus_connect_opportunities';
const CAMPUS_DRIVES_KEY = 'campus_connect_campus_drives';
export const opportunityService = {
  // Initialize service
  initialize: () => {
    const opportStored = localStorage.getItem(OPPORTUNITIES_KEY);
    const drivesStored = localStorage.getItem(CAMPUS_DRIVES_KEY);
    if (!opportStored) {
      localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify([]));
    }
    if (!drivesStored) {
      localStorage.setItem(CAMPUS_DRIVES_KEY, JSON.stringify([]));
    }
  },
  // ===== OPPORTUNITIES =====

  // Add new opportunity
  addOpportunity: data => {
    const opportunities = opportunityService.getAllOpportunities();
    const newOpportunity = {
      id: `opp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      postedDate: new Date()
    };
    opportunities.push(newOpportunity);
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(opportunities));
    console.log(`✅ Opportunity added: ${data.title}`);
    return newOpportunity;
  },
  // Get all opportunities
  getAllOpportunities: () => {
    const stored = localStorage.getItem(OPPORTUNITIES_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  // Get active opportunities
  getActiveOpportunities: () => {
    const all = opportunityService.getAllOpportunities();
    return all.filter(opp => opp.status === "Active").sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
  },
  // Get upcoming opportunities
  getUpcomingOpportunities: () => {
    const all = opportunityService.getAllOpportunities();
    return all.filter(opp => opp.status === "Upcoming").sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
  },
  // Get by type
  getOpportunitiesByType: type => {
    return opportunityService.getAllOpportunities().filter(opp => opp.type === type && opp.status === "Active");
  },
  // Get opportunity by ID
  getOpportunityById: id => {
    return opportunityService.getAllOpportunities().find(opp => opp.id === id);
  },
  // Update opportunity
  updateOpportunity: (id, updates) => {
    const opportunities = opportunityService.getAllOpportunities();
    const index = opportunities.findIndex(opp => opp.id === id);
    if (index === -1) return null;
    opportunities[index] = {
      ...opportunities[index],
      ...updates
    };
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(opportunities));
    console.log(`✅ Opportunity updated: ${id}`);
    return opportunities[index];
  },
  // Delete opportunity
  deleteOpportunity: id => {
    const opportunities = opportunityService.getAllOpportunities();
    const filtered = opportunities.filter(opp => opp.id !== id);
    if (filtered.length === opportunities.length) return false;
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(filtered));
    console.log(`✅ Opportunity deleted: ${id}`);
    return true;
  },
  // ===== CAMPUS DRIVES =====

  // Add new campus drive
  addCampusDrive: data => {
    const drives = opportunityService.getAllCampusDrives();
    const newDrive = {
      id: `drive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdDate: new Date()
    };
    drives.push(newDrive);
    localStorage.setItem(CAMPUS_DRIVES_KEY, JSON.stringify(drives));
    console.log(`✅ Campus drive added: ${data.company}`);
    return newDrive;
  },
  // Get all campus drives
  getAllCampusDrives: () => {
    const stored = localStorage.getItem(CAMPUS_DRIVES_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  // Get upcoming campus drives
  getUpcomingCampusDrives: () => {
    const all = opportunityService.getAllCampusDrives();
    return all.filter(drive => drive.status === "Upcoming").sort((a, b) => new Date(a.driveDate).getTime() - new Date(b.driveDate).getTime());
  },
  // Get ongoing campus drives
  getOngoingCampusDrives: () => {
    const all = opportunityService.getAllCampusDrives();
    return all.filter(drive => drive.status === "Ongoing");
  },
  // Get campus drive by ID
  getCampusDriveById: id => {
    return opportunityService.getAllCampusDrives().find(drive => drive.id === id);
  },
  // Update campus drive
  updateCampusDrive: (id, updates) => {
    const drives = opportunityService.getAllCampusDrives();
    const index = drives.findIndex(drive => drive.id === id);
    if (index === -1) return null;
    drives[index] = {
      ...drives[index],
      ...updates
    };
    localStorage.setItem(CAMPUS_DRIVES_KEY, JSON.stringify(drives));
    console.log(`✅ Campus drive updated: ${id}`);
    return drives[index];
  },
  // Delete campus drive
  deleteCampusDrive: id => {
    const drives = opportunityService.getAllCampusDrives();
    const filtered = drives.filter(drive => drive.id !== id);
    if (filtered.length === drives.length) return false;
    localStorage.setItem(CAMPUS_DRIVES_KEY, JSON.stringify(filtered));
    console.log(`✅ Campus drive deleted: ${id}`);
    return true;
  },
  // Clear all (for testing)
  clearAll: () => {
    localStorage.removeItem(OPPORTUNITIES_KEY);
    localStorage.removeItem(CAMPUS_DRIVES_KEY);
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify([]));
    localStorage.setItem(CAMPUS_DRIVES_KEY, JSON.stringify([]));
    console.log("✅ All opportunities and drives cleared");
  }
};