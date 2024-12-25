import express from 'express';
import { imageGeneration } from '../Controllers/image.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/image-generation', protect, imageGeneration);

export default router;
