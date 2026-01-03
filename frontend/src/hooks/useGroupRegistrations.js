import { useState, useCallback } from 'react';
import { groupRegistrationService } from '@/services/groupRegistrationService';
export const useGroupRegistrations = eventId => {
  const [groupRegistrations, setGroupRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadGroupRegistrations = useCallback(() => {
    groupRegistrationService.initialize();
    if (eventId) {
      setGroupRegistrations(groupRegistrationService.getEventTeamRegistrations(eventId));
    } else {
      setGroupRegistrations(groupRegistrationService.getAllGroupRegistrations());
    }
  }, [eventId]);
  const registerTeam = useCallback(data => {
    try {
      setError(null);
      setLoading(true);
      const existingTeam = groupRegistrationService.isTeamRegistered(data.eventId, data.teamLeaderEmail);
      if (existingTeam) {
        return {
          success: false,
          error: 'Your team is already registered for this event'
        };
      }
      const newRegistration = groupRegistrationService.registerTeam(data);
      setGroupRegistrations(prev => [...prev, newRegistration]);
      return {
        success: true,
        registration: newRegistration
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Team registration failed';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);
  const cancelTeamRegistration = useCallback(registrationId => {
    setLoading(true);
    setError(null);
    try {
      groupRegistrationService.cancelTeamRegistration(registrationId);
      setGroupRegistrations(prev => prev.filter(r => r.id !== registrationId));
      return {
        success: true
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Cancellation failed';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);
  const isTeamRegistered = useCallback(email => {
    if (!eventId) return false;
    return groupRegistrationService.isTeamRegistered(eventId, email);
  }, [eventId]);
  return {
    groupRegistrations,
    registerTeam,
    cancelTeamRegistration,
    loadGroupRegistrations,
    isTeamRegistered,
    loading,
    error,
    getEventTeamCount: id => groupRegistrationService.getEventTeamCount(id),
    getEventParticipantsCount: id => groupRegistrationService.getEventParticipantsCount(id)
  };
};