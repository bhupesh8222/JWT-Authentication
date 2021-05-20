const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const userModel = require('./database/user');
const Login_Register_Route = require('./routes/Login_Register_Route');
const user_Route = require('./routes/user_Route');
const admin_Route = require('./routes/admin_Route');
//----------databse bhupesh------------collection store

var mongoDB = 'mongodb://localhost:27017/bhupesh';

mongoose
	.connect(mongoDB, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then((res) => console.log('DB CONNECTED'))
	.catch((err) => console.log(err));

app.use('/user', Login_Register_Route);
app.use('/product', user_Route);
app.use('/admin', admin_Route);

//404 ROUTE
app.use((req, res) => {
	res.status(404).send({ error: 'NOT FOUND' });
});

app.listen(3000, () => {
	console.log('server started');
});
