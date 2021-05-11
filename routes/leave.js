import express from 'express';
import { leaveRequest, markLeave, getLeaves, declineLeave, checkIfExists, getMarkedLeaves } from '../controllers/Leave.js';

const router =express.Router();
router.post('/leave/request', leaveRequest);
router.post('/leave/mark', markLeave);
router.post('/leave/decline', declineLeave);
router.post('/leave/checkIfExists', checkIfExists);
router.get('/leaves/:id',getLeaves);
router.post('/markedLeaves/',getMarkedLeaves);

export default router;