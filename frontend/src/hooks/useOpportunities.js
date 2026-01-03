import { useState, useCallback } from 'react';
import { opportunityService } from '@/services/opportunityService';
export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [campusDrives, setCampusDrives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadOpportunities = useCallback(() => {
    opportunityService.initialize();
    setOpportunities(opportunityService.getAllOpportunities());
  }, []);
  const loadCampusDrives = useCallback(() => {
    opportunityService.initialize();
    setCampusDrives(opportunityService.getAllCampusDrives());
  }, []);
  const addOpportunity = useCallback(data => {
    try {
      setError(null);
      setLoading(true);
      const newOpp = opportunityService.addOpportunity(data);
      setOpportunities(prev => [...prev, newOpp]);
      return {
        success: true,
        opportunity: newOpp
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add opportunity';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);
  const addCampusDrive = useCallback(data => {
    try {
      setError(null);
      setLoading(true);
      const newDrive = opportunityService.addCampusDrive(data);
      setCampusDrives(prev => [...prev, newDrive]);
      return {
        success: true,
        drive: newDrive
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add campus drive';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);
  const updateOpportunity = useCallback((id, updates) => {
    try {
      setError(null);
      const updated = opportunityService.updateOpportunity(id, updates);
      if (updated) {
        setOpportunities(prev => prev.map(opp => opp.id === id ? updated : opp));
        return {
          success: true,
          opportunity: updated
        };
      }
      return {
        success: false,
        error: 'Opportunity not found'
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update opportunity';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }
  }, []);
  const updateCampusDrive = useCallback((id, updates) => {
    try {
      setError(null);
      const updated = opportunityService.updateCampusDrive(id, updates);
      if (updated) {
        setCampusDrives(prev => prev.map(drive => drive.id === id ? updated : drive));
        return {
          success: true,
          drive: updated
        };
      }
      return {
        success: false,
        error: 'Campus drive not found'
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update campus drive';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }
  }, []);
  const deleteOpportunity = useCallback(id => {
    try {
      setError(null);
      const deleted = opportunityService.deleteOpportunity(id);
      if (deleted) {
        setOpportunities(prev => prev.filter(opp => opp.id !== id));
        return {
          success: true
        };
      }
      return {
        success: false,
        error: 'Opportunity not found'
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete opportunity';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }
  }, []);
  const deleteCampusDrive = useCallback(id => {
    try {
      setError(null);
      const deleted = opportunityService.deleteCampusDrive(id);
      if (deleted) {
        setCampusDrives(prev => prev.filter(drive => drive.id !== id));
        return {
          success: true
        };
      }
      return {
        success: false,
        error: 'Campus drive not found'
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete campus drive';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }
  }, []);
  return {
    opportunities,
    campusDrives,
    loading,
    error,
    loadOpportunities,
    loadCampusDrives,
    addOpportunity,
    addCampusDrive,
    updateOpportunity,
    updateCampusDrive,
    deleteOpportunity,
    deleteCampusDrive,
    getActiveOpportunities: () => opportunityService.getActiveOpportunities(),
    getUpcomingOpportunities: () => opportunityService.getUpcomingOpportunities(),
    getUpcomingCampusDrives: () => opportunityService.getUpcomingCampusDrives(),
    getOpportunityById: id => opportunityService.getOpportunityById(id)
  };
};