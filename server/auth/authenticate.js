const config = require('../config/config');
const response = require('../config/response');
const jwt = require('jsonwebtoken');

exports.authenticateRequest = function(req,res,next){
	const token = req.headers['token'];
	if(token == null){
		res.json(response(true,"authorization headers not present","",""));
	}else{
		jwt.verify(token, config.secretKey, function(err, decoded) {
			if(err){
				return res.json(response(true,"Bad Token","",""));
			}else{
				req.decoded = decoded;
				next();
			}
		});
	}
};
