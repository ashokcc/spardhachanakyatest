const config    = require('../config/config');
const response  = require('../config/response');
const userModel = require('../models/userSchema');
const bcrypt    = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getStudents = function(req,res){
    userModel.find({type:'student'}).then((_allStudents)=>{
        res.json(response(false,"","fetched all students successfully",_allStudents));
    }, 
    (error)=>{
        res.json(response(true,error,"","Error in query"));
    });
}