import { Router } from 'express';
import { getAllSettings, updateSetting } from '../controllers/settingsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getAllSettings);
router.put('/:key', requireAuth, updateSetting);

export default router;
