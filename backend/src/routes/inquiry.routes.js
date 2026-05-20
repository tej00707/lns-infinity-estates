import express from 'express';
import {
	createInquiry,
	getAllInquiries,
	updateInquiry
} from '../controllers/inquiry.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getAllInquiries);
router.put('/:id', authMiddleware, adminMiddleware, updateInquiry);

export default router;
