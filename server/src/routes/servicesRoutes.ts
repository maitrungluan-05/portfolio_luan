import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/servicesController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', getServices);

// Protected routes (Admin only)
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

export default router;
