// Event Management Service
// Stores and retrieves events by category
// Uses localStorage for persistence

const EVENTS_KEY = 'campus_connect_events';

// Removed DEFAULT_EVENTS - all data now comes from backend API
// This service is kept for type definitions and interface compatibility
// but actual data operations should use backend API

export const eventService = {
  // Deprecated: No longer initializes localStorage
  // Use backend API instead
  initialize: () => {
    console.warn('eventService.initialize() is deprecated. Use backend API instead.');
  },
  // Deprecated: No longer returns localStorage data
  // Use backend API instead
  getAllEvents: () => {
    console.warn('eventService.getAllEvents() is deprecated. Use backend API instead.');
    return [];
  },
  // Deprecated: Use backend API instead
  getEventsByCategory: category => {
    console.warn('eventService.getEventsByCategory() is deprecated. Use backend API instead.');
    return [];
  },
  // Deprecated: Use backend API instead
  getEventById: id => {
    console.warn('eventService.getEventById() is deprecated. Use backend API instead.');
    return undefined;
  },
  // Deprecated: Use backend API instead
  addEvent: eventData => {
    console.warn('eventService.addEvent() is deprecated. Use backend API instead.');
    return {};
  },
  // Deprecated: Use backend API instead
  updateEvent: (id, updates) => {
    console.warn('eventService.updateEvent() is deprecated. Use backend API instead.');
    return null;
  },
  // Deprecated: Use backend API instead
  deleteEvent: id => {
    console.warn('eventService.deleteEvent() is deprecated. Use backend API instead.');
    return false;
  },
  // Deprecated: Use backend API instead
  getEventCountByCategory: category => {
    console.warn('eventService.getEventCountByCategory() is deprecated. Use backend API instead.');
    return 0;
  },
  // Deprecated: Use backend API instead
  getCategoriesWithCounts: () => {
    console.warn('eventService.getCategoriesWithCounts() is deprecated. Use backend API instead.');
    return [];
  },
  // Deprecated: Use backend API instead
  clearAll: () => {
    console.warn('eventService.clearAll() is deprecated. Use backend API instead.');
  }
};