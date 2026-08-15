import { Router } from 'express';
import {
  submitContactMessage,
  getAllMessages,
  toggleMessageRead,
  deleteMessage,
} from '../controllers/contactController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public route to submit message
router.post('/', submitContactMessage);

// Protected routes for Admin
router.get('/messages', requireAuth, getAllMessages);
router.patch('/messages/:id/read', requireAuth, toggleMessageRead);
router.delete('/messages/:id', requireAuth, deleteMessage);

export default router;
