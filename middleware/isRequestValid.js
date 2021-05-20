const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const isRequestValid = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		try {
			const user = jwt.verify(token, secretKey);
			req.user = user;
			return next();
		} catch (error) {
			return res.status(403).send({ error: 'Invalid Token' });
		}
	} else {
		return res.status(403).send({ error: 'No authorization header present' });
	}
};

module.exports = isRequestValid;
