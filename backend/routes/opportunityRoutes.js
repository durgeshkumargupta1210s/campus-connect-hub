import express from 'express';
import { createOpportunity, getOpportunities, getOpportunityById, applyOpportunity, deleteOpportunity } from '../controllers/opportunityController.js';
import { authenticate, authorize, syncClerkUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getOpportunities);
router.post('/', authenticate, syncClerkUser, authorize('admin', 'recruiter'), createOpportunity);
router.get('/:id', getOpportunityById);
router.post('/:id/apply', authenticate, syncClerkUser, applyOpportunity);
router.delete('/:id', authenticate, syncClerkUser, authorize('admin', 'recruiter'), deleteOpportunity);

export default router;
