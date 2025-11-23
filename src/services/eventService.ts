// Event Management Service
// Stores and retrieves events by category
// Uses localStorage for persistence

export interface Event {
  id: string;
  title: string;
  eventName?: string;
  date: string;
  time?: string;
  endTime?: string;
  location?: string;
  description: string;
  category: string;
  duration?: string;
  prize?: string;
  difficulty?: string;
  participants?: number;
  tags: string[];
  status: string;
  capacity?: number;
  registrationFee?: string;
  organizer?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt?: Date;
  // Hackathon specific
  problemStatements?: string;
  judgesCriteria?: string;
  // Workshop specific
  mentor?: string;
  prerequisites?: string;
  materials?: string;
  // Placement specific
  company?: string;
  ctc?: string;
  positions?: number;
  jobProfile?: string;
  eligibility?: string;
}

const EVENTS_KEY = 'campus_connect_events';

// Default sample events
const DEFAULT_EVENTS: Event[] = [
  {
    id: '1',
    title: "AI/ML Innovation Challenge",
    date: "March 20-21, 2024",
    duration: "24 hours",
    prize: "₹50,000",
    participants: 120,
    difficulty: "Advanced",
    tags: ["AI", "Machine Learning", "Deep Learning"],
    status: "Open",
    description: "Build intelligent solutions using cutting-edge AI and ML technologies",
    category: "Hackathon"
  },
  {
    id: '2',
    title: "Web3 Hackathon",
    date: "April 5-6, 2024",
    duration: "36 hours",
    prize: "₹75,000",
    participants: 85,
    difficulty: "Intermediate",
    tags: ["Blockchain", "Smart Contracts", "DeFi"],
    status: "Open",
    description: "Create decentralized applications and explore blockchain possibilities",
    category: "Hackathon"
  },
  {
    id: '3',
    title: "Mobile App Challenge",
    date: "April 15-16, 2024",
    duration: "48 hours",
    prize: "₹60,000",
    participants: 65,
    difficulty: "All Levels",
    tags: ["React Native", "Flutter", "Mobile Dev"],
    status: "Open",
    description: "Develop innovative mobile applications for iOS and Android",
    category: "Hackathon"
  }
];

export const eventService = {
  // Initialize localStorage with default events if empty
  initialize: () => {
    const stored = localStorage.getItem(EVENTS_KEY);
    if (!stored) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(DEFAULT_EVENTS));
    }
  },

  // Get all events
  getAllEvents: (): Event[] => {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_EVENTS;
  },

  // Get events by category
  getEventsByCategory: (category: string): Event[] => {
    const allEvents = eventService.getAllEvents();
    return allEvents.filter(
      event => event.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Get specific event by ID
  getEventById: (id: string): Event | undefined => {
    const allEvents = eventService.getAllEvents();
    return allEvents.find(event => event.id === id);
  },

  // Add new event
  addEvent: (eventData: Omit<Event, 'id' | 'createdAt'>): Event => {
    const allEvents = eventService.getAllEvents();
    
    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      status: eventData.status || "Open",
      participants: eventData.participants || 0,
      tags: eventData.tags || []
    };

    allEvents.push(newEvent);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(allEvents));
    
    console.log(`✅ Event created: ${newEvent.title} (Category: ${newEvent.category})`);
    return newEvent;
  },

  // Update event
  updateEvent: (id: string, updates: Partial<Event>): Event | null => {
    const allEvents = eventService.getAllEvents();
    const index = allEvents.findIndex(event => event.id === id);
    
    if (index === -1) return null;
    
    allEvents[index] = { ...allEvents[index], ...updates };
    localStorage.setItem(EVENTS_KEY, JSON.stringify(allEvents));
    
    console.log(`✅ Event updated: ${allEvents[index].title}`);
    return allEvents[index];
  },

  // Delete event
  deleteEvent: (id: string): boolean => {
    const allEvents = eventService.getAllEvents();
    const filtered = allEvents.filter(event => event.id !== id);
    
    if (filtered.length === allEvents.length) return false;
    
    localStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
    console.log(`✅ Event deleted: ${id}`);
    return true;
  },

  // Get events count by category
  getEventCountByCategory: (category: string): number => {
    return eventService.getEventsByCategory(category).length;
  },

  // Get all categories with event counts
  getCategoriesWithCounts: (): { category: string; count: number }[] => {
    const allEvents = eventService.getAllEvents();
    const categories = new Set(allEvents.map(e => e.category));
    
    return Array.from(categories).map(category => ({
      category,
      count: allEvents.filter(e => e.category === category).length
    }));
  },

  // Clear all events (for testing/reset)
  clearAll: () => {
    localStorage.removeItem(EVENTS_KEY);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(DEFAULT_EVENTS));
    console.log("✅ All events cleared and reset to defaults");
  }
};
