import express from 'express';
import {logAttendance,clearAttendance,showAttendance, showMonthAttendance} from '../controllers/Attendance.js';


const router =express.Router();

router.post('/log/:id', logAttendance);
router.post('/clear/:id/', clearAttendance);
router.post('/show/:id', showAttendance);
router.post('/view/:id', showMonthAttendance)

export default router;