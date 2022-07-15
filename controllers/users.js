const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
require("dotenv").config();

// const auth = require("./routes/auth");

const salt = +process.env.SALT;


module.exports.getProfile = (userId) => {
	return User.findById(userId)
		.then((user) => {
			user.password = "";
			return user;
		})
		.catch((err) => err.message);
};