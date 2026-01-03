const STORAGE_KEY = 'campus_connect_club_applications';
export const clubApplicationService = {
  initialize: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  },
  getAllApplications: () => {
    clubApplicationService.initialize();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  getApplicationsByClubId: clubId => {
    const applications = clubApplicationService.getAllApplications();
    return applications.filter(app => app.clubId === clubId);
  },
  getApplicationById: id => {
    const applications = clubApplicationService.getAllApplications();
    return applications.find(app => app.id === id) || null;
  },
  addApplication: application => {
    const applications = clubApplicationService.getAllApplications();
    const newApplication = {
      ...application,
      id: `app-${Date.now()}`,
      applicationDate: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return newApplication;
  },
  updateApplicationStatus: (id, status) => {
    const applications = clubApplicationService.getAllApplications();
    const application = applications.find(app => app.id === id);
    if (!application) return null;
    application.status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return application;
  },
  deleteApplication: id => {
    const applications = clubApplicationService.getAllApplications();
    const filtered = applications.filter(app => app.id !== id);
    if (filtered.length === applications.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};