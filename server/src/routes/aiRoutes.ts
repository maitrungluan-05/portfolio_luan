import { Router } from 'express';
import { analyzeImage } from '../controllers/aiController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Endpoint for AI image analysis (protected by admin token)
router.post('/analyze-image', requireAuth, analyzeImage);

export default router;
