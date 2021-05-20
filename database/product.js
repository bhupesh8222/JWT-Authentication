const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
	name: { type: String, required: true, unique: true },
	price: { type: Number, required: true },
	description: { type: String },
});

module.exports = mongoose.model('product', productSchema);
