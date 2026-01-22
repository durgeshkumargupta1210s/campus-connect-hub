import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { APIClient } from '@/config/api';

export const useUserRole = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isLoaded) return;
      
      if (!isSignedIn) {
        setRole('user');
        setLoading(false);
        return;
      }

      try {
        console.log('🔄 Fetching user role from backend...');
        const response = await APIClient.get('/user-metadata/me');
        console.log('📥 User role response:', response);
        if (response.success) {
          console.log('✅ Setting role to:', response.user.role);
          setRole(response.user.role);
        }
      } catch (error) {
        console.error('❌ Error fetching user role:', error);
        console.error('Error details:', error.response?.data);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [isSignedIn, isLoaded]);

  return { role, loading };
};
