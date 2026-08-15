import { Router } from 'express';
import {
  getAllJourneySteps,
  createJourneyStep,
  updateJourneyStep,
  deleteJourneyStep,
} from '../controllers/journeyController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getAllJourneySteps);
router.post('/', requireAuth, createJourneyStep);
router.put('/:id', requireAuth, updateJourneyStep);
router.delete('/:id', requireAuth, deleteJourneyStep);

export default router;
