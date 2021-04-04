import express from 'express';
const router = express.Router();

import { registerUser, loginUser, logoutUser, empLogin} from '../controllers/User.js';
import passport from 'passport';
//push
router.post("/register", registerUser);

router.post("/login", passport.authenticate('local'), loginUser);
router.post("/empLogin",empLogin);
router.get("/logout", logoutUser);

export default router;