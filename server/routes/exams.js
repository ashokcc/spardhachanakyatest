const router = require('express').Router();
const exam = require('../controller/exams');
const auth = require('../auth/authenticate');

router.post('/submittest', auth.authenticateRequest, exam.submitTest);
router.get('/getreport/:testId', auth.authenticateRequest, exam.getReport);
router.post('/getreports', auth.authenticateRequest, exam.getReports);

module.exports = router;