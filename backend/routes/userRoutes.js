import express from 'express';
import { getProfile, updateProfile, uploadResume, getAllUsers, getUserById, deleteUser } from '../controllers/userController.js';
import { authenticate, authorize, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticate, syncClerkUser, getProfile);
router.put('/profile', authenticate, syncClerkUser, updateProfile);
router.post('/resume', authenticate, syncClerkUser, uploadResume);

// Admin routes
router.get('/', authenticate, syncClerkUser, authorize('admin'), getAllUsers);
router.get('/:id', authenticate, syncClerkUser, getUserById);
router.delete('/:id', authenticate, syncClerkUser, authorize('admin'), deleteUser);

export default router;
