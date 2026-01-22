import express from 'express';
import { createPayment, getPayments, getPaymentById, completePayment, refundPayment } from '../controllers/paymentController.js';
import { authenticate, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, syncClerkUser, createPayment);
router.get('/', authenticate, syncClerkUser, getPayments);
router.get('/:id', authenticate, syncClerkUser, getPaymentById);
router.put('/:id/complete', authenticate, syncClerkUser, completePayment);
router.put('/:id/refund', authenticate, syncClerkUser, refundPayment);

export default router;
