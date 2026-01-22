import { useAuth } from '@clerk/clerk-react';

// API Configuration and helper functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGOUT: `${API_BASE_URL}/auth/logout`,
  // Users
  USERS_PROFILE: `${API_BASE_URL}/users/profile`,
  USERS_UPDATE: `${API_BASE_URL}/users/profile`,
  USERS_LIST: `${API_BASE_URL}/users`,
  USERS_DELETE: id => `${API_BASE_URL}/users/${id}`,
  USERS_UPLOAD_RESUME: `${API_BASE_URL}/users/upload-resume`,
  // Events
  EVENTS_LIST: `${API_BASE_URL}/events`,
  EVENTS_CREATE: `${API_BASE_URL}/events`,
  EVENTS_GET: id => `${API_BASE_URL}/events/${id}`,
  EVENTS_UPDATE: id => `${API_BASE_URL}/events/${id}`,
  EVENTS_DELETE: id => `${API_BASE_URL}/events/${id}`,
  EVENTS_UPCOMING: `${API_BASE_URL}/events/upcoming`,
  EVENTS_MY: `${API_BASE_URL}/events/my-events`,
  // Clubs
  CLUBS_LIST: `${API_BASE_URL}/clubs`,
  CLUBS_CREATE: `${API_BASE_URL}/clubs`,
  CLUBS_GET: id => `${API_BASE_URL}/clubs/${id}`,
  CLUBS_UPDATE: id => `${API_BASE_URL}/clubs/${id}`,
  CLUBS_DELETE: id => `${API_BASE_URL}/clubs/${id}`,
  CLUBS_JOIN: id => `${API_BASE_URL}/clubs/${id}/join`,
  CLUBS_LEAVE: id => `${API_BASE_URL}/clubs/${id}/leave`,
  // Opportunities
  OPPORTUNITIES_LIST: `${API_BASE_URL}/opportunities`,
  OPPORTUNITIES_CREATE: `${API_BASE_URL}/opportunities`,
  OPPORTUNITIES_GET: id => `${API_BASE_URL}/opportunities/${id}`,
  OPPORTUNITIES_UPDATE: id => `${API_BASE_URL}/opportunities/${id}`,
  OPPORTUNITIES_DELETE: id => `${API_BASE_URL}/opportunities/${id}`,
  OPPORTUNITIES_APPLY: id => `${API_BASE_URL}/opportunities/${id}/apply`,
  OPPORTUNITIES_MY_APPLICATIONS: `${API_BASE_URL}/opportunities/my-applications`,
  // Registrations
  REGISTRATIONS_LIST: `${API_BASE_URL}/registrations`,
  REGISTRATIONS_CREATE: `${API_BASE_URL}/registrations`,
  REGISTRATIONS_GET: id => `${API_BASE_URL}/registrations/${id}`,
  REGISTRATIONS_CANCEL: id => `${API_BASE_URL}/registrations/${id}`,
  // Tickets
  TICKETS_CREATE: `${API_BASE_URL}/tickets`,
  TICKETS_GET: id => `${API_BASE_URL}/tickets/${id}`,
  TICKETS_CHECK_IN: id => `${API_BASE_URL}/tickets/${id}/check-in`,
  // Payments
  PAYMENTS_LIST: `${API_BASE_URL}/payments`,
  PAYMENTS_CREATE: `${API_BASE_URL}/payments`,
  PAYMENTS_GET: id => `${API_BASE_URL}/payments/${id}`,
  PAYMENTS_COMPLETE: id => `${API_BASE_URL}/payments/${id}/complete`,
  PAYMENTS_REFUND: id => `${API_BASE_URL}/payments/${id}/refund`,
  // Campus Drives
  CAMPUS_DRIVES_LIST: `${API_BASE_URL}/campus-drives`,
  CAMPUS_DRIVES_CREATE: `${API_BASE_URL}/campus-drives`,
  CAMPUS_DRIVES_GET: id => `${API_BASE_URL}/campus-drives/${id}`,
  CAMPUS_DRIVES_REGISTER: id => `${API_BASE_URL}/campus-drives/${id}/register`,
  // Health check
  HEALTH: `${API_BASE_URL}/health`
};

// API Helper class
let getClerkToken = null;

export const setClerkTokenGetter = (getter) => {
  getClerkToken = getter;
};

export class APIClient {
  static async getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    // Get Clerk token
    if (getClerkToken) {
      try {
        const token = await getClerkToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting Clerk token:', error);
      }
    }
    
    return headers;
  }

  // Generic fetch method
  static async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    try {
      const headers = await this.getHeaders();
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        console.error('Unauthorized request');
        throw new Error('Unauthorized');
      }
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `API Error: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  static get(endpoint) {
    return this.request(endpoint, {
      method: 'GET'
    });
  }

  // POST request
  static post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  // PUT request
  static put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  // DELETE request
  static delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Upload file
  static async uploadFile(endpoint, file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const headers = await this.getHeaders();
      // Remove Content-Type for FormData
      delete headers['Content-Type'];
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Upload failed: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('File Upload Error:', error);
      throw error;
    }
  }
}

// Response types

// Export API_BASE_URL for components that need it
export default API_BASE_URL;