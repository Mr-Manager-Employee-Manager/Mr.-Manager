import express from 'express';
import { leaveRequest, markLeave, getLeaves, declineLeave, checkIfExists } from '../controllers/Leave.js';

const router =express.Router();
router.post('/leave/request', leaveRequest);
router.post('/leave/mark', markLeave);
router.post('/leave/decline', declineLeave);
router.post('/leave/checkIfExists', checkIfExists);
router.get('/leaves/:id',getLeaves);

export default router;