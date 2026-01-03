// Registration Service
// Manages user registrations for events

const REGISTRATIONS_KEY = 'campus_connect_registrations';
export const registrationService = {
  // Initialize service
  initialize: () => {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    if (!stored) {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([]));
    }
  },
  // Register user for event
  registerForEvent: data => {
    const registrations = registrationService.getAllRegistrations();

    // Check if already registered
    const alreadyRegistered = registrations.some(r => r.eventId === data.eventId && r.userEmail === data.userEmail);
    if (alreadyRegistered) {
      throw new Error('You are already registered for this event');
    }
    const newRegistration = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      registeredAt: new Date(),
      status: "Confirmed"
    };
    registrations.push(newRegistration);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
    console.log(`✅ Registration successful: ${data.userName} for ${data.eventTitle}`);
    return newRegistration;
  },
  // Get all registrations
  getAllRegistrations: () => {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  // Get registrations for specific event
  getEventRegistrations: eventId => {
    const allRegistrations = registrationService.getAllRegistrations();
    return allRegistrations.filter(reg => reg.eventId === eventId);
  },
  // Get user's registrations
  getUserRegistrations: email => {
    const allRegistrations = registrationService.getAllRegistrations();
    return allRegistrations.filter(reg => reg.userEmail === email);
  },
  // Get registration count for event
  getEventRegistrationCount: eventId => {
    return registrationService.getEventRegistrations(eventId).length;
  },
  // Cancel registration
  cancelRegistration: registrationId => {
    const registrations = registrationService.getAllRegistrations();
    const index = registrations.findIndex(reg => reg.id === registrationId);
    if (index === -1) return false;
    registrations[index].status = "Cancelled";
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
    console.log(`✅ Registration cancelled: ${registrationId}`);
    return true;
  },
  // Check if user already registered
  isUserRegistered: (eventId, email) => {
    const registrations = registrationService.getAllRegistrations();
    return registrations.some(r => r.eventId === eventId && r.userEmail === email);
  },
  // Clear all registrations (for testing)
  clearAll: () => {
    localStorage.removeItem(REGISTRATIONS_KEY);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([]));
    console.log("✅ All registrations cleared");
  }
};