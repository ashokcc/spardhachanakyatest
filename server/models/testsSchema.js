var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var testSchema = new mongoose.Schema({
	testCompletedDate:{ type:Date, default: Date.now},
	topic: {type: String, required: true},
	assessmentId: {type: String, required: true},
	submittedBy:{type:String},
	email:{type:String, required:true},
	questions:[{
		question:{type: String, required: true},
		selectedOption:{type: String, required: true}
	}]
});

var testsModel = mongoose.model("tests",testSchema);
module.exports = testsModel;
