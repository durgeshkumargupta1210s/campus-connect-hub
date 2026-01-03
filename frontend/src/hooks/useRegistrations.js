import { useState, useCallback } from 'react';
import { registrationService } from '@/services/registrationService';
export const useRegistrations = eventId => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadRegistrations = useCallback(() => {
    registrationService.initialize();
    if (eventId) {
      setRegistrations(registrationService.getEventRegistrations(eventId));
    } else {
      setRegistrations(registrationService.getAllRegistrations());
    }
  }, [eventId]);
  const register = useCallback(data => {
    try {
      setError(null);
      setLoading(true);
      const newRegistration = registrationService.registerForEvent(data);
      setRegistrations([...registrations, newRegistration]);
      console.log('Registration successful:', newRegistration);
      return {
        success: true,
        registration: newRegistration
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      return {
        success: false,
        error: message
      };
    } finally {
      setLoading(false);
    }
  }, [registrations]);
  const cancelRegistration = useCallback(registrationId => {
    const success = registrationService.cancelRegistration(registrationId);
    if (success) {
      setRegistrations(registrations.map(r => r.id === registrationId ? {
        ...r,
        status: 'Cancelled'
      } : r));
    }
    return success;
  }, [registrations]);
  const isRegistered = useCallback(email => {
    if (!eventId) return false;
    return registrationService.isUserRegistered(eventId, email);
  }, [eventId]);
  return {
    registrations,
    loading,
    error,
    loadRegistrations,
    register,
    cancelRegistration,
    isRegistered,
    getEventRegistrationCount: id => registrationService.getEventRegistrationCount(id)
  };
};