import express from 'express';
import {createEmployee,updateEmployee,showEmployee,deleteEmployee,filterEmployee} from '../controllers/Employee.js';

const router =express.Router();
router.post('/',filterEmployee);
router.post('/:id/edit', updateEmployee);
router.post('/add', createEmployee);
router.get('/:id',showEmployee);
router.delete('/:id', deleteEmployee);

export default router;