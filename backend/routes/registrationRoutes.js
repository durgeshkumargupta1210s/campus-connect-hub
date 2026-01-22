import express from 'express';
import { registerEvent, getRegistrations, cancelRegistration } from '../controllers/registrationController.js';
import { authenticate, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, syncClerkUser, registerEvent);
router.get('/', authenticate, syncClerkUser, getRegistrations);
router.put('/:id/cancel', authenticate, syncClerkUser, cancelRegistration);

export default router;
