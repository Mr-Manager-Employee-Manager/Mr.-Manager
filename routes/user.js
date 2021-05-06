import express from 'express';
const router = express.Router();

import { registerUser, loginUser, logoutUser, empLogin} from '../controllers/User.js';
import { getLeaves} from '../controllers/Employee.js';
import passport from 'passport';
//push
router.post("/register", registerUser);

router.post("/login", passport.authenticate('local'), loginUser);
router.post("/empLogin",empLogin);
router.get("/logout", logoutUser);
router.get('/leaves/:id',getLeaves);

export default router;