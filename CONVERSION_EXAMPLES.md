# TypeScript to JavaScript: Before & After Examples

This file shows real examples of how different TypeScript code is converted to JavaScript.

## Example 1: Component with Props Type

### ❌ BEFORE (TypeScript)
```typescript
// MyButton.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

export const MyButton: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false,
  className = ''
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {label}
    </button>
  );
};

export default MyButton;
```

### ✅ AFTER (JavaScript)
```javascript
// MyButton.jsx
import React from 'react';

/**
 * MyButton component
 * @param {Object} props - Button properties
 * @param {string} props.label - Button text
 * @param {function} props.onClick - Click handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className=''] - CSS classes
 * @returns {JSX.Element}
 */
export const MyButton = ({ 
  label, 
  onClick, 
  disabled = false,
  className = ''
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {label}
    </button>
  );
};

export default MyButton;
```

---

## Example 2: Hook with State

### ❌ BEFORE (TypeScript)
```typescript
// useCounter.ts
import { useState, useCallback } from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};
```

### ✅ AFTER (JavaScript)
```javascript
// useCounter.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for counter functionality
 * @param {number} [initialValue=0] - Initial count value
 * @returns {Object} Counter object with count and methods
 * @returns {number} return.count - Current count
 * @returns {function} return.increment - Increment count
 * @returns {function} return.decrement - Decrement count
 * @returns {function} return.reset - Reset to initial value
 */
export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};
```

---

## Example 3: Service with API Calls

### ❌ BEFORE (TypeScript)
```typescript
// eventService.ts
interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  isPaid: boolean;
  price?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const response = await fetch('/api/events');
    const data: ApiResponse<Event[]> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch events');
    }
    
    return data.data;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await fetch(`/api/events/${id}`);
    const data: ApiResponse<Event> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch event');
    }
    
    return data.data;
  },

  createEvent: async (event: Omit<Event, 'id'>): Promise<Event> => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    
    const data: ApiResponse<Event> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create event');
    }
    
    return data.data;
  },
};
```

### ✅ AFTER (JavaScript)
```javascript
// eventService.js

/**
 * @typedef {Object} Event
 * @property {string} id - Event ID
 * @property {string} title - Event title
 * @property {string} date - Event date
 * @property {string} description - Event description
 * @property {boolean} isPaid - Whether event requires payment
 * @property {number} [price] - Event price if paid
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Request success status
 * @property {any} data - Response data
 * @property {string} [error] - Error message if failed
 */

export const eventService = {
  /**
   * Fetch all events
   * @returns {Promise<Event[]>} Array of events
   */
  getEvents: async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch events');
    }
    
    return data.data;
  },

  /**
   * Fetch event by ID
   * @param {string} id - Event ID
   * @returns {Promise<Event>} Event object
   */
  getEventById: async (id) => {
    const response = await fetch(`/api/events/${id}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch event');
    }
    
    return data.data;
  },

  /**
   * Create a new event
   * @param {Omit<Event, 'id'>} event - Event data
   * @returns {Promise<Event>} Created event
   */
  createEvent: async (event) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create event');
    }
    
    return data.data;
  },
};
```

---

## Example 4: Context with Authentication

### ❌ BEFORE (TypeScript)
```typescript
// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### ✅ AFTER (JavaScript)
```javascript
// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {'user' | 'admin'} role - User role
 */

const AuthContext = createContext(undefined);

/**
 * AuthProvider component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use Auth context
 * @returns {Object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## Example 5: Complex Component with Form

### ❌ BEFORE (TypeScript)
```typescript
// EventForm.tsx
import React, { useState, FormEvent } from 'react';
import { eventService } from '../services/eventService';

interface FormData {
  title: string;
  date: string;
  description: string;
  isPaid: boolean;
  price: number;
}

export const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    description: '',
    isPaid: false,
    price: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await eventService.createEvent(formData);
      setFormData({
        title: '',
        date: '',
        description: '',
        isPaid: false,
        price: 0,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event title"
        required
      />
      {/* ... more inputs ... */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

### ✅ AFTER (JavaScript)
```javascript
// EventForm.jsx
import React, { useState } from 'react';
import { eventService } from '../services/eventService';

/**
 * @typedef {Object} FormData
 * @property {string} title - Event title
 * @property {string} date - Event date
 * @property {string} description - Event description
 * @property {boolean} isPaid - Is paid event
 * @property {number} price - Event price
 */

/**
 * EventForm component for creating events
 * @returns {JSX.Element}
 */
export const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    isPaid: false,
    price: 0,
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle form input changes
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  /**
   * Handle form submission
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await eventService.createEvent(formData);
      setFormData({
        title: '',
        date: '',
        description: '',
        isPaid: false,
        price: 0,
      });
    } catch (err) {
      setError(err.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event title"
        required
      />
      {/* ... more inputs ... */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

---

## Key Transformations Summary

| TypeScript | JavaScript | Notes |
|-----------|-----------|-------|
| `React.FC<Props>` | Remove entirely | Just a function returning JSX |
| `useState<Type>` | `useState()` | No type parameter needed |
| `interface Props { }` | Delete it | Use JSDoc if you need hints |
| `(e: React.ChangeEvent)` | `(e)` | Types not needed |
| `Promise<Type>` | No type hint | JS infers from code |
| `as Type` type assertion | Remove it | Not needed in JS |
| `: Type` parameter types | Remove it | Just pass the value |
| `?: OptionalField` | Same syntax | Still valid in JS |

---

## Testing Your Conversion

After converting, verify with:

```javascript
// ✅ This should work
import MyComponent from './MyComponent.jsx';
const Component = MyComponent;

// ✅ This should work
import { useCounter } from './hooks/useCounter.js';
const { count } = useCounter();

// ✅ This should work
import { eventService } from './services/eventService.js';
eventService.getEvents().then(events => console.log(events));

// ✅ No TypeScript compilation needed
// Just plain JavaScript running in the browser!
```

That's it! Your TypeScript code is now plain JavaScript. 🎉
