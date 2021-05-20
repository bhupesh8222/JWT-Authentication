module.exports = (req, res, next) => {
	if (req.user.isAdmin) {
		return next();
	} else {
		res.status(403), send({ error: 'Permission denied' });
	}
};
