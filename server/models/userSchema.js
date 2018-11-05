const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
	name: { type: String, required: true},
	phone: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	type: {type: String, required: true},
	resetPwdToken:{type:String},
	resetPwdTokenDate:{type: Date, default: Date.now},
});
const userModel = mongoose.model("user",userSchema);
exports.schema = userSchema;
module.exports = userModel;
