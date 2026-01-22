import express from 'express';
import { authenticate, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get current user's role from database
router.get('/me', authenticate, syncClerkUser, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        clerkId: req.user.clerkId,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user data' 
    });
  }
});

export default router;
