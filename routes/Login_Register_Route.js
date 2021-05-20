const express = require('express');
const router = express.Router();
const userModel = require('../database/user');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const generateToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		secretKey,
		{ expiresIn: '2h' }
	);
};

router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		let emailAlreadyExist = await userModel.findOne({ email });
		if (emailAlreadyExist)
			return res.status(403).send({ error: 'Email already exist' });

		let userNameAlreadyExist = await userModel.findOne({ name });
		if (userNameAlreadyExist)
			return res.status(403).send({ error: 'User already exist' });

		let user = new userModel({
			name,
			email,
			password,
		});

		await user.save();

		//generating token after saving
		const token = generateToken(user);
		return res.status(200).send({ token });
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await userModel.findOne({ email: email });

		if (!user) return res.status(403).send({ error: 'Invalid email' });

		const isPasswordCorrect = await user.CheckPassword(password);
		if (!isPasswordCorrect)
			return res.status(403).send({ error: 'Incorrect password' });

		//generating token if everything went fine
		const token = generateToken(user);
		return res.status(200).send({ token });
	} catch (err) {
		return res.status(500).send(err);
	}
});

module.exports = router;
