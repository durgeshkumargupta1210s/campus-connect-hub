import express from 'express';
import { createTicket, getTickets, getTicketById, checkInTicket } from '../controllers/ticketController.js';
import { authenticate, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, syncClerkUser, createTicket);
router.get('/', authenticate, syncClerkUser, getTickets);
router.get('/:id', authenticate, syncClerkUser, getTicketById);
router.put('/:id/check-in', authenticate, syncClerkUser, checkInTicket);

export default router;
