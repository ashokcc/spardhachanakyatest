const config    = require('../config/config');
const response  = require('../config/response');
const userModel = require('../models/userSchema');
const bcrypt    = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendmail = require('sendmail')();

exports.register = (req,res)=>{
	if(req.body.email != null){
		userModel.findOne({email:req.body.email},(err,docs)=>{
			if(err){
				res.json(response(true,err,"","Query Error"));
			}else if(docs != null){
				res.json(response(true,"Email already exist","",""));			
			}else{
				bcrypt.hash(req.body.password, 8, (err, hash)=>{
					const newUser = new userModel({
						name: req.body.username,
						phone: req.body.phone,
						email: req.body.email,
						password: hash, // Hashed password from bCrypt
						type: req.body.type
					});
					newUser.save((error)=>{
						if(error){
							res.json(response(true,error,"","Error in Schema"));
						}else{
							sendResponse(res, docs, 'Successfully registered', {email:req.body.email, type:req.body.type});
						}
					});						
				});
			}
		});
	}else{
		errorResponse(true,"Email id not sent","","", res);
	}
}
exports.updateDetails = (req,res)=>{
	let existingEmail = req.body.existingEmail;
	let changingEmail = req.body.email;
	if(changingEmail != null){

		bcrypt.hash(req.body.password, 8, (err, hash)=>{
			let recordToUpdate = {
				name: req.body.username,
				phone: req.body.phone,
				email: changingEmail,
				password: hash,
				type: req.body.type				
			};
			userModel.findOneAndUpdate({email:existingEmail},recordToUpdate)
			.then((_data)=>{
				res.json(response(false,"","Updated with new details successfully Please Re-login",true));
			}, (error)=>{
				res.json(response(true,"Email already exist","",""));
			});
		});

	}else{
		res.json(response(true,"No updates required","",""));
	} 
}
exports.login = (req,res)=>{
	if(req.body.email != null && req.body.password != null){
		userModel.findOne({email:req.body.email},(err,docs)=>{
			if(err || docs==null){
				res.json(response(true,"User not found","",""));
			}else{
				bcrypt.compare(req.body.password, docs.password, (err, isPwdTrue)=>{
					if(isPwdTrue){
						sendResponse(res, docs, 'Successfully logged in', {email:req.body.email, type:docs.type});
					}else{
						res.json(response(true,"Password does not match","",""));
					}
				});
			}
		});
	}else{
		res.json(response(true,"Enter valid Email","",""));
	}
}
exports.logout = (req,res)=>{
	res.json(response(false,"","Logged Out Successfully",true));
};
exports.forgotPwd = (req, res)=>{
	if(req.body.email != null){
		userModel.findOne({email:req.body.email}).then((data)=>{
			if(data){
				sendForgotPwdCode(data.email, res);
				//errorResponse(false,"No Error","","", res);
			}else{
				errorResponse(true,"email does not exist..","","", res)
			}
		}, (err)=>{
			errorResponse(true,"Error in Schema find one","","", res)
		});
	}else{
		errorResponse(true,"Email id not sent","","", res)
	}
}

function resetPwdToken(token, email){
	
}

function sendForgotPwdCode(email, res){

	let code = Math.floor(573195 + Math.random() * 217545);
	  sendmail({
		from: 'ashokbcc007@gmail.com',
		to: email,
		subject: 'Password reset code from Spardha Chanakya Test',
		html: `<b> ${code} </b> Use this code to reset your password.` ,
	  }, function(err, reply) {
		console.log(err && err.stack);
		console.dir(reply);
		res.json(response(false,'sent',true,reply));
	});
	
}


function errorResponse(isError, msg, isSuccess, data, res){
	res.json(response(isError,msg,isSuccess,data));
}
function sendResponse(res, docs, msg, reqData){
	const token = jwt.sign(JSON.stringify(docs),config.secretKey);
	if(docs){
		res.json(response(false,"",msg,{email:reqData.email,token:token,userId:docs._id,type:docs.type}));
	}else{
		res.json(response(false,"",msg,{email:reqData.email,token:token, type:reqData.type}));
	}
}