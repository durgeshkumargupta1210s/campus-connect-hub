import { useState, useEffect } from 'react';
import { eventService, Event } from '@/services/eventService';

export const useEvents = (category?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Try to load from backend API first
        const response = await fetch('http://localhost:5000/api/events', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          let backendEvents: Event[] = [];
          
          // Handle different response structures
          if (Array.isArray(data)) {
            backendEvents = data;
          } else if (data.events && Array.isArray(data.events)) {
            backendEvents = data.events;
          } else if (data.data && Array.isArray(data.data)) {
            backendEvents = data.data;
          }
          
          // Convert backend format to frontend format
          const convertedEvents = backendEvents.map((event: any) => ({
            id: event._id || event.id,
            title: event.title,
            date: event.date ? new Date(event.date).toLocaleDateString() : '',
            time: event.time,
            location: event.location,
            description: event.description,
            category: event.category,
            duration: event.duration,
            status: event.status || 'upcoming',
            capacity: event.capacity,
            tags: event.tags || [],
            participants: event.registeredCount || 0,
            difficulty: 'All Levels',
            prize: '₹0'
          }));
          
          // Filter by category if provided
          if (category) {
            const filtered = convertedEvents.filter(e => 
              e.category.toLowerCase() === category.toLowerCase()
            );
            setEvents(filtered);
          } else {
            setEvents(convertedEvents);
          }
        } else {
          // Fallback to localStorage if API fails
          eventService.initialize();
          if (category) {
            setEvents(eventService.getEventsByCategory(category));
          } else {
            setEvents(eventService.getAllEvents());
          }
        }
      } catch (error) {
        console.error('Error loading events:', error);
        // Fallback to localStorage
        eventService.initialize();
        if (category) {
          setEvents(eventService.getEventsByCategory(category));
        } else {
          setEvents(eventService.getAllEvents());
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
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
