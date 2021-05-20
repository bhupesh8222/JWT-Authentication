const express = require('express');
const router = express.Router();
const userModel = require('../database/user');
const productModel = require('../database/product');
const jwt = require('jsonwebtoken');

const isRequestValid = require('../middleware/isRequestValid');
const isAdmin = require('../middleware/isAdmin');

router.post('/add', isRequestValid, isAdmin, async (req, res) => {
	try {
		let product = new productModel(req.body);
		await product.save();
		return res.status(200).send(product);
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.put('/update/:id', isRequestValid, isAdmin, async (req, res) => {
	try {
		const UpdatedProduct = await productModel.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		res.status(200).send(UpdatedProduct);
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.delete('/delele/:id', isRequestValid, isAdmin, async (req, res) => {
	try {
		await productModel.findByIdAndDelete(req.params.id);
		res.status(200).send({ status: 'Done' });
	} catch (err) {
		return res.status(500).send(err);
	}
});

module.exports = router;
