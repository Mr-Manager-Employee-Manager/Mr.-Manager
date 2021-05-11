import User from '../models/user.js';
import Employee from '../models/Employee.js';

export const registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = new User({ username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, err => {
			if (err) return next(err);
			res.status(200).json("successfully registered!")
		})
	} catch (e) {
		res.status(401).json(e);
	}
}


export const loginUser = (req, res, err) => {
	res.status(200).json(req.body.username);
}

export const empLogin = (req, res, err) => {
	Employee.find(req.body)
	.then(employee => {
		res.status(200).json(employee[0].id);
	})
	.catch(err => res.status(400).json('Error:' + err));
}



export const logoutUser = async (req, res) => {
	req.logout();
	res.status(200).json("Logged you out!");
}
