const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./server/config/config');
const port = process.env.PORT || config.port
app.set('secretKey', config.secretKey);

// parse various different custom JSON types as JSON
app.use(bodyParser.urlencoded({"extended":"true"}));
app.use(bodyParser.json());
app.use(cors({origin:true}));

app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.static('www'));

//Initialize All Routes
app.use('/v1/api', require('./server/routes/user'));
app.use('/v1/api', require('./server/routes/admin'));
app.use('/v1/api', require('./server/routes/assessments'));
app.use('/v1/api', require('./server/routes/exams'));

//DB CONNECTION
const db = mongoose.connect(config.dbURL, { useNewUrlParser: true }, (err)=>{
	if(err){
		console.log("DB connection failed at "+config.dbURL);
		console.log(err.message);
	}else{
		console.log("Successfully DB connected at "+config.dbURL);
	}
});
console.log(`server started at port ${port}`);

app.listen(port, '0.0.0.0');



