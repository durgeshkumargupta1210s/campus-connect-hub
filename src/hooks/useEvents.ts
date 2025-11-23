import { useState, useEffect } from 'react';
import { eventService, Event } from '@/services/eventService';

export const useEvents = (category?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize service on mount
    eventService.initialize();
    
    // Load events
    if (category) {
      setEvents(eventService.getEventsByCategory(category));
    } else {
      setEvents(eventService.getAllEvents());
    }
    setLoading(false);
  }, [category]);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent = eventService.addEvent(eventData);
    
    // Update local state
    if (category && newEvent.category.toLowerCase() === category.toLowerCase()) {
      setEvents([...events, newEvent]);
    } else if (!category) {
      setEvents([...events, newEvent]);
    }
    
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const updated = eventService.updateEvent(id, updates);
    if (updated) {
      setEvents(events.map(e => e.id === id ? updated : e));
    }
    return updated;
  };

  const deleteEvent = (id: string) => {
    const success = eventService.deleteEvent(id);
    if (success) {
      setEvents(events.filter(e => e.id !== id));
    }
    return success;
  };

  const refreshEvents = () => {
    if (category) {
      setEvents(eventService.getEventsByCategory(category));
    } else {
      setEvents(eventService.getAllEvents());
    }
  };

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
    refreshEvents
  };
};
