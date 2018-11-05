const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const assessmentSchema = new mongoose.Schema({
	creationDate:{type: Date, default: Date.now},
	topic: {type: String, required: true},
	questions:[{
		question: { type: String, required: true},
		options: [{ 
			option: {type:String, required: true}
		}],
		answer: { type: Number ,required: true}
	}],
	duration:Number //in minutes
});

const assessmentsModel = mongoose.model("assessment",assessmentSchema);
module.exports = assessmentsModel;
