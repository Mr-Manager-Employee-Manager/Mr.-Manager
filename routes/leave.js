import express from 'express';
import { leaveRequest } from '../controllers/Leave.js';
import { getLeaves} from '../controllers/Leave.js';

const router =express.Router();
router.post('/leaveRequest', leaveRequest)
router.get('/leaves/:id',getLeaves);

export default router;