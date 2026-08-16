import { Router } from 'express';
import { analyzeImage } from '../controllers/aiController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Endpoint for AI image analysis (protected by admin token)
router.post('/analyze-image', authenticateToken, analyzeImage);

export default router;
