import { Router } from 'express';
import {
  getAllMoments,
  createMoment,
  updateMoment,
  deleteMoment,
} from '../controllers/momentsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getAllMoments);
router.post('/', requireAuth, createMoment);
router.put('/:id', requireAuth, updateMoment);
router.delete('/:id', requireAuth, deleteMoment);

export default router;
