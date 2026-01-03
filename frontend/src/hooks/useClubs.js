import { useState, useCallback } from 'react';
import { clubService } from '@/services/clubService';
export const useClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadClubs = useCallback(() => {
    try {
      clubService.initialize();
      const allClubs = clubService.getAllClubs();
      setClubs(allClubs);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load clubs';
      setError(errorMsg);
    }
  }, []);
  const getClubById = useCallback(id => {
    return clubService.getClubById(id);
  }, []);
  const addClub = useCallback(clubData => {
    try {
      setError(null);
      setLoading(true);
      const newClub = clubService.addClub(clubData);
      setClubs(prev => [...prev, newClub]);
      return {
        success: true,
        club: newClub
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add club';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setLoading(false);
    }
  }, []);
  const updateClub = useCallback((id, updates) => {
    try {
      setError(null);
      const updated = clubService.updateClub(id, updates);
      if (updated) {
        setClubs(prev => prev.map(club => club.id === id ? updated : club));
        return {
          success: true,
          club: updated
        };
      }
      return {
        success: false,
        error: 'Club not found'
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update club';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }
  }, []);
  const deleteClub = useCallback(id => {
    try {
      setError(null);
      const deleted = clubService.deleteClub(id);
      if (deleted) {
        setClubs(prev => prev.filter(club => club.id !== id));
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
  }, []);
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