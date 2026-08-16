import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/servicesController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.get('/', getServices);

// Protected routes (Admin only)
router.post('/', authenticateToken, createService);
router.put('/:id', authenticateToken, updateService);
router.delete('/:id', authenticateToken, deleteService);

export default router;
