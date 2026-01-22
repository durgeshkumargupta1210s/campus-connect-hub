import { useState, useCallback } from 'react';
import { APIClient, API_ENDPOINTS } from '@/config/api';

export const useClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadClubs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching clubs from:', API_ENDPOINTS.CLUBS_LIST);
      const response = await APIClient.get(API_ENDPOINTS.CLUBS_LIST);
      console.log('Clubs response:', response);
      // Handle both array and object with clubs property
      let clubsData = [];
      if (Array.isArray(response)) {
        clubsData = response;
      } else if (response && response.clubs) {
        clubsData = Array.isArray(response.clubs) ? response.clubs : [];
      } else if (response && typeof response === 'object') {
        // If it's an object but not an array, try to extract clubs
        clubsData = [];
      }
      console.log('Processed clubs data:', clubsData);
      setClubs(clubsData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load clubs';
      setError(errorMsg);
      console.error('Load clubs error:', errorMsg, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getClubById = useCallback((id) => {
    return clubs.find(club => club._id === id || club.id === id);
  }, [clubs]);

  const addClub = useCallback(async (clubData) => {
    try {
      setError(null);
      setLoading(true);
      
      console.log('Creating club with data:', clubData);
      
      // Call backend API to create club
      const response = await APIClient.post(API_ENDPOINTS.CLUBS_CREATE, clubData);
      console.log('Club creation response:', response);
      
      // Add the created club to local state
      if (response.club) {
        setClubs(prev => [...prev, response.club]);
      }
      
      return {
        success: true,
        club: response.club,
        message: response.message
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add club';
      setError(errorMsg);
      console.error('Add club error:', err);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClub = useCallback(async (id, updates) => {
    try {
      setError(null);
      setLoading(true);
      
      console.log('Updating club:', id, 'with data:', updates);
      
      // Call backend API to update club
      const response = await APIClient.put(API_ENDPOINTS.CLUBS_UPDATE(id), updates);
      console.log('Club update response:', response);
      
      // Update local state
      if (response.club) {
        setClubs(prev => prev.map(club => 
          (club._id === id || club.id === id) ? response.club : club
        ));
      }
      
      return {
        success: true,
        club: response.club,
        message: response.message
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update club';
      setError(errorMsg);
      console.error('Update club error:', err);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteClub = useCallback((id) => {
    try {
      setError(null);
      const filtered = clubs.filter(club => club._id !== id && club.id !== id);
      if (filtered.length < clubs.length) {
        setClubs(filtered);
        return {
          success: true
        };
      }
      return {
        success: false,
        error: 'Club not found'
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete club';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }
  }, [clubs]);

  return {
    clubs,
    loading,
    error,
    loadClubs,
    getClubById,
    addClub,
    updateClub,
    deleteClub
  };
};