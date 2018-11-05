const response = require('../config/response');
const assessmentsModel = require('../models/assessmentsSchema');

exports.createAssessment = (req,res)=>{
	if(req.body!=null){
		const newQues = new assessmentsModel(req.body);
		newQues.save((error)=>{
			if(error){ 
				res.json(response(true, error, "", ""));
			}else{
				res.json(response(false,"", "assessment created", newQues._id));
			}
		});
	}else{
		res.json(response(true,"Something went wrong","",""));
	}
};
exports.getAssessments = (req, res)=>{
	assessmentsModel.find({}, (err, docs)=>{
		if(err){
			res.json(response(true, error, "", "Assessments query error"));
		}else{
			let objToSend = [];
			for(let i=0;i<docs.length;i++){
				let obj = {
					id: docs[i]._id,
					topic: docs[i].topic,
					duration: docs[i].duration,
					questions:[]		
				};
				for(let j=0;j<docs[i].questions.length;j++){
					obj.questions.push({
						id: docs[i].questions[j]._id,
						question: docs[i].questions[j].question,
						options: docs[i].questions[j].options
					});
				}
				objToSend.push(obj);
			}
			res.json(response(false,"", "all assessments", {assessments:objToSend}));				
		}
	});
};
