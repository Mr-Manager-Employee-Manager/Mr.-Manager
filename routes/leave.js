import express from 'express';
import { leaveRequest } from '../controllers/Leave.js';

const router =express.Router();
router.post('/leaveRequest', leaveRequest)

export default router;