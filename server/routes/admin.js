const router = require('express').Router();
const admin = require('../controller/admin');
const auth = require('../auth/authenticate');

router.get('/allstudents',auth.authenticateRequest,admin.getStudents);
module.exports = router;