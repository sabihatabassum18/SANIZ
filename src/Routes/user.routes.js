import express from 'express';
import { registerUser, authUser, getUserProfile } from '../Controllers/user.controller.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

export default router;