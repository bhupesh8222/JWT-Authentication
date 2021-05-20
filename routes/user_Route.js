const express = require('express');
const router = express.Router();
const userModel = require('../database/user');
const productModel = require('../database/product');
const jwt = require('jsonwebtoken');

const isRequestValid = require('../middleware/isRequestValid');

//Get product by ID
router.get('/:id', isRequestValid, async (req, res) => {
	try {
		const id = req.params.id;
		const product = await productModel.findById(id);
		return res.status(200).send(product);
	} catch (err) {
		return res.status(500).send(err);
	}
});

//get all products
router.get('/all', isRequestValid, async (req, res) => {
	try {
		const products = await productModel.find();
		return res.status(200).send(products);
	} catch (err) {
		return res.status(500).send(err);
	}
});

module.exports = router;
