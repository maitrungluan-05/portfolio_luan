import { Router } from 'express';
import { handleUpload } from '../controllers/uploadController';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', requireAuth, upload.single('image'), handleUpload);

export default router;
