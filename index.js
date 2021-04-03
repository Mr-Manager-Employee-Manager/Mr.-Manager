// npm run dev

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

import cookieParser from "cookie-parser";
import bcrypt from 'bcryptjs';

import employeeRoutes from './routes/Employee.js';
import attendanceRoutes from './routes/Attendance.js';
import userRoutes from './routes/user.js';

import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//push 123
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));

const sessionConfig = {
	secret: "MySecret",
	resave: false,
	saveUninitialized: false,
	// cookie: {
	// 	httpOnly: true,
	// 	expires: Date.now() + 1000*60*60*24*7,
	// 	maxAge: 1000*60*60*24*7
	// }
}
app.use(session(sessionConfig));

app.use(cookieParser("MySecret"));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/employees', employeeRoutes);
app.use('/employees/attendance', attendanceRoutes);
app.use('/', userRoutes);


const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

if(process.env.NODE_ENV==='production'){
	const publicPath = path.join(__dirname, 'client', 'build');
	app.use(express.static(publicPath));
	app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath,'index.html'));
	});
}

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('server running on port:' + PORT)))
    .catch((error) => console.log("Something fishy" + error.message));
mongoose.set('useFindAndModify', false);