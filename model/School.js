var mongoose = require('mongoose');

var SchoolSchema = mongoose.Schema({
	UserID: Number,
	Password: String,
	UserName: String,
	PhoneNum: Number
});

module.exports = SchoolSchema;
