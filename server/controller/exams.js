const response = require('../config/response');
const testsModel = require('../models/testsSchema');
const assessmentsModel = require('../models/assessmentsSchema');

exports.submitTest = (req,res)=>{
	let submittedBy = req.body.submittedBy;
	let email = req.body.email;
	let assessmentId = req.body.assessmentId;
	if(email != null){
		const testModel = new testsModel(req.body);
		testModel.save((_saveError)=>{
			if(_saveError){
				handleError(res, _saveError, "Test Model Schema save Error");
			}else{
				console.log('Test has been Completed');
				res.json(
					response(
						false,
						"", 
						"Test has been Completed",
						{
						submittedBy:submittedBy,
						email:email,
						assessmentId:assessmentId,
						testCompleted:true,
						testId:testModel._id
					})
				);
			}
		});
    }else{
        res.json(response(true,"","User email not sent",'No data found'));
    }
};
function findSubmittedUser(){

}

exports.getReport = (req, res)=>{ 
	let testId = req.params.testId;
	let _testData = null;
	testsModel.findOne({_id:testId})
		.then((_test)=>{
			_testData = _test;
			return assessmentsModel.findOne({_id:_test.assessmentId});
		}, (err)=>{
			handleError(res, err, 'Tests query failed in exams');
		})
		.then((_assessment)=>{
			handleGetReport(res, _assessment, _testData, 'Assessment query runs successfully');
		}, (err)=>{
			handleError(res, err, 'Assessment query failed in exams');
		});
};
exports.getReports = (req, res)=>{
	let email = req.body.email;
	let userType = req.body.userType;
	let objToQuery = {};
	if(userType === 'student'){
		objToQuery['email'] = email;
	}
	testsModel.find(objToQuery)
		.then((_tests)=>{
			handleGetReports(res, _tests, 'Reports query runs successfully');
		}, (err)=>{
			handleError(res, err, 'Reports query failed in exams');
		});
};

function handleGetReport(res, assessment, test, msg){
	let _assessment = assessment.questions;
	let _test = test.questions;
	let correctAnswers = 0;
	let wrongAnswers = 0;
	let finalResults = [];
	if(_assessment.length){
		for(let i=0;i<_assessment.length;i++){
			// to make it compatible with array index stored in DB of selected Option which start from 1 in UI so -1
			let answer =_assessment[i].answer-1;
			if(_test[i].selectedOption === _assessment[i].options[answer].option){
				correctAnswers++;
			}else{
				wrongAnswers++;
			}
			finalResults.push({
				question: _test[i].question,
				options: _assessment[i].options,
				correctAnswer: _assessment[i].options[answer].option,
				selectedOption: _test[i].selectedOption
			});		
		}
	}
	res.json(response(
		false,
		"",
		msg,
		{
			testResults:{
				topic: test.topic,
				assessmentId: test.assessmentId,
				testId:test._id,
				testCompletedDate:test.testCompletedDate,
				correctAnswers:correctAnswers,
				wrongAnswers:wrongAnswers,
				results:finalResults
			}
		}
	));
}

function handleGetReports(res, results, msg){
	res.json(response(false,"",msg,results));
}

function handleError(res, err, msg){
	res.json(response(true,"",msg,err));
}

