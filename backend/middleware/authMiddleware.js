import { ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const authenticate = ClerkExpressRequireAuth();

// Admin email - change this to your admin email
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@campus.com';

console.log('🔧 Loaded ADMIN_EMAIL from env:', process.env.ADMIN_EMAIL);
console.log('🔧 Using ADMIN_EMAIL:', ADMIN_EMAIL);

// Middleware to sync Clerk user with local database
export const syncClerkUser = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    
    if (!userId) {
      return res.status(401).json({ message: 'No user ID provided' });
    }

    // Fetch user data from Clerk API to get email
    const clerkUser = await clerkClient.users.getUser(userId);
    
    if (!clerkUser) {
      return res.status(404).json({ message: 'User not found in Clerk' });
    }

    // Get primary email address
    const userEmail = clerkUser.emailAddresses?.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress;
    
    if (!userEmail) {
      console.error('No email found for user:', userId);
      return res.status(400).json({ message: 'Email not found for user' });
    }

    console.log(`🔍 Checking user: ${userEmail}`);
    console.log(`🔍 Admin email: ${ADMIN_EMAIL}`);
    console.log(`🔍 Match: ${userEmail === ADMIN_EMAIL}`);
    console.log(`🔍 Email comparison - User: "${userEmail}" | Admin: "${ADMIN_EMAIL}"`);
    
    // Get or create user in local database
    let user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      // Check if user exists with this email (from previous auth system)
      user = await User.findOne({ email: userEmail });
      
      if (user) {
        // Update existing user with new Clerk ID
        user.clerkId = userId;
        const newRole = userEmail === ADMIN_EMAIL ? 'admin' : 'user';
        user.role = newRole;
        await user.save();
        
        // Update Clerk user metadata
        await clerkClient.users.updateUser(userId, {
          publicMetadata: { role: newRole }
        });
        
        console.log(`✅ Existing user updated with Clerk ID: ${userEmail} with role: ${newRole}`);
      } else {
        // Determine role based on email
        const role = userEmail === ADMIN_EMAIL ? 'admin' : 'user';
        
        // Create new user from Clerk data
        const userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User';
        
        user = await User.create({
          clerkId: userId,
          email: userEmail,
          name: userName,
          role: role
        });
        
        // Update Clerk user metadata
        await clerkClient.users.updateUser(userId, {
          publicMetadata: { role: role }
        });
        
        console.log(`✅ New user created: ${userEmail} with role: ${role}`);
      }
    } else {
      // Update role if email is admin email
      const newRole = userEmail === ADMIN_EMAIL ? 'admin' : 'user';
      console.log(`📝 Found existing user - Current role: ${user.role}, New role: ${newRole}`);
      
      if (user.role !== newRole) {
        user.role = newRole;
        await user.save();
        
        // Update Clerk user metadata
        await clerkClient.users.updateUser(userId, {
          publicMetadata: { role: newRole }
        });
        
        console.log(`✅ User role updated: ${userEmail} -> ${newRole}`);
      } else {
        console.log(`✅ User already has correct role: ${newRole}`);
      }
    }

    console.log(`🎯 Final user role in database: ${user.role}`);
    req.user = user;
    next();
  } catch (err) {
    console.error('Error syncing Clerk user:', err);
    res.status(500).json({ message: 'Error syncing user data' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
