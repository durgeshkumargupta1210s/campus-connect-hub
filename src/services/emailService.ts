// Email Service for sending notifications
// This is a mock implementation that simulates sending emails
// In production, integrate with EmailJS or a backend email service

export interface SubscriptionData {
  email: string;
  timestamp?: Date;
}

// Store subscribed emails in localStorage
const SUBSCRIPTIONS_KEY = 'campus_connect_subscriptions';

export const emailService = {
  // Subscribe user for notifications
  subscribe: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, message: 'Please enter a valid email address' };
      }

      // Get existing subscriptions
      const subscriptions = localStorage.getItem(SUBSCRIPTIONS_KEY);
      const subscribedEmails = subscriptions ? JSON.parse(subscriptions) : [];

      // Check if already subscribed
      if (subscribedEmails.includes(email)) {
        return { success: false, message: 'This email is already subscribed' };
      }

      // Add new subscription
      subscribedEmails.push(email);
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscribedEmails));

      // Send thank you email (in production, use actual email service)
      await sendThankYouEmail(email);

      return { success: true, message: 'Thank you for subscribing! Check your email for confirmation.' };
    } catch (error) {
      console.error('Subscription error:', error);
      return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
  },

  // Send thank you email
  sendThankYouEmail: async (email: string): Promise<boolean> => {
    try {
      // In production, integrate with EmailJS or backend API
      // Example with EmailJS:
      /*
      await emailjs.send(
        'service_id',
        'template_id',
        {
          to_email: email,
          subject: 'Welcome to Campus Connect Hub!',
          message: 'Thank you for subscribing...'
        },
        'public_key'
      );
      */

      // Mock implementation - log to console and simulate email
      console.log(`📧 Thank you email sent to: ${email}`);
      
      // Simulate email sent with delay
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`✅ Email confirmed for: ${email}`);
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  },

  // Send event notification to all subscribers
  notifyEventCreated: async (eventData: {
    name: string;
    date: string;
    description: string;
  }): Promise<{ success: boolean; count: number }> => {
    try {
      const subscriptions = localStorage.getItem(SUBSCRIPTIONS_KEY);
      const subscribedEmails = subscriptions ? JSON.parse(subscriptions) : [];

      if (subscribedEmails.length === 0) {
        return { success: true, count: 0 };
      }

      // Send notification to all subscribers
      for (const email of subscribedEmails) {
        await sendEventNotificationEmail(email, eventData);
      }

      console.log(`📧 Event notification sent to ${subscribedEmails.length} subscribers`);
      return { success: true, count: subscribedEmails.length };
    } catch (error) {
      console.error('Error notifying subscribers:', error);
      return { success: false, count: 0 };
    }
  },

  // Get all subscriptions (for admin purposes)
  getSubscriptions: (): string[] => {
    const subscriptions = localStorage.getItem(SUBSCRIPTIONS_KEY);
    return subscriptions ? JSON.parse(subscriptions) : [];
  },

  // Unsubscribe email
  unsubscribe: async (email: string): Promise<boolean> => {
    try {
      const subscriptions = localStorage.getItem(SUBSCRIPTIONS_KEY);
      const subscribedEmails = subscriptions ? JSON.parse(subscriptions) : [];
      
      const filtered = subscribedEmails.filter((e: string) => e !== email);
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(filtered));
      
      console.log(`🚫 Unsubscribed: ${email}`);
      return true;
    } catch (error) {
      console.error('Unsubscribe error:', error);
      return false;
    }
  }
};

// Helper function to send thank you email
async function sendThankYouEmail(email: string): Promise<void> {
  try {
    // In production, replace with actual email service
    // Option 1: EmailJS
    /*
    await emailjs.send('service_id', 'template_thank_you', {
      to_email: email,
      subject: 'Welcome to Campus Connect Hub!',
      user_email: email,
      message: `Thank you for subscribing to Campus Connect Hub!\n\nYou'll now receive notifications about:\n- New hackathons and competitions\n- Career opportunities and placements\n- Campus events and workshops\n- Community updates\n\nStay connected!`
    }, 'public_key');
    */

    // Option 2: Backend API
    /*
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Welcome to Campus Connect Hub!',
        template: 'thank-you',
        data: { email }
      })
    });
    */

    // Mock implementation
    console.log('📧 Sending thank you email to:', email);
  } catch (error) {
    console.error('Failed to send thank you email:', error);
    throw error;
  }
}

// Helper function to send event notification
async function sendEventNotificationEmail(email: string, eventData: {
  name: string;
  date: string;
  description: string;
}): Promise<void> {
  try {
    // In production, use actual email service
    console.log(`📧 Event notification for ${email}:`, eventData.name);
    
    // Simulate sending email
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ Event notification sent to ${email}`);
        resolve();
      }, 300);
    });
  } catch (error) {
    console.error('Failed to send event notification:', error);
    throw error;
  }
}
