const router = require('express').Router();

const ques = require('../controller/assessments');
const auth = require('../auth/authenticate');

router.post('/createassessment', auth.authenticateRequest, ques.createAssessment);
router.get('/getassessments', auth.authenticateRequest, ques.getAssessments);

module.exports = router;
