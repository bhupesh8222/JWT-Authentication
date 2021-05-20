const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	isAdmin: { type: Boolean, default: false },
});

//don't use arrow function
userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods.CheckPassword = async function (p) {
	try {
		return await bcrypt.compare(p, this.password);
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = mongoose.model('user', userSchema);
