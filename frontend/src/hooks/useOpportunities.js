import { useState, useCallback } from 'react';
import { APIClient, API_ENDPOINTS } from '@/config/api';

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [campusDrives, setCampusDrives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOpportunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Request with higher limit to get all opportunities
      const response = await APIClient.get(`${API_ENDPOINTS.OPPORTUNITIES_LIST}?limit=100`);
      const oppsData = Array.isArray(response) ? response : (response.opportunities || []);
      setOpportunities(oppsData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load opportunities';
      setError(errorMsg);
      console.error('Load opportunities error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCampusDrives = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await APIClient.get(API_ENDPOINTS.CAMPUS_DRIVES_LIST);
      const drivesData = Array.isArray(response) ? response : (response.campusDrives || response.drives || []);
      setCampusDrives(drivesData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load campus drives';
      setError(errorMsg);
      console.error('Load campus drives error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addOpportunity = useCallback(async (data) => {
    try {
      setError(null);
      setLoading(true);
      
      console.log('Creating opportunity with data:', data);
      const response = await APIClient.post(API_ENDPOINTS.OPPORTUNITIES_CREATE, data);
      console.log('Opportunity creation response:', response);
      
      if (response.opportunity) {
        setOpportunities(prev => [...prev, response.opportunity]);
      }
      
      return {
        success: true,
        opportunity: response.opportunity,
        message: response.message
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add opportunity';
      setError(errorMsg);
      console.error('Add opportunity error:', err);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const addCampusDrive = useCallback(async (data) => {
    try {
      setError(null);
      setLoading(true);
      
      console.log('Creating campus drive with data:', data);
      const response = await APIClient.post(API_ENDPOINTS.CAMPUS_DRIVES_CREATE, data);
      console.log('Campus drive creation response:', response);
      
      if (response.campusDrive || response.drive) {
        const newDrive = response.campusDrive || response.drive;
        setCampusDrives(prev => [...prev, newDrive]);
      }
      
      return {
        success: true,
        drive: response.campusDrive || response.drive,
        message: response.message
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add campus drive';
      setError(errorMsg);
      console.error('Add campus drive error:', err);
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