import express from 'express';
import { createClub, getClubs, getClubById, updateClub, deleteClub, joinClub, leaveClub } from '../controllers/clubController.js';
import { authenticate, authorize, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getClubs);
router.post('/', authenticate, syncClerkUser, createClub);
router.get('/:id', getClubById);
router.put('/:id', authenticate, syncClerkUser, authorize('admin', 'club_head'), updateClub);
router.delete('/:id', authenticate, syncClerkUser, authorize('admin', 'club_head'), deleteClub);
router.post('/:id/join', authenticate, syncClerkUser, joinClub);
router.post('/:id/leave', authenticate, syncClerkUser, leaveClub);

export default router;
