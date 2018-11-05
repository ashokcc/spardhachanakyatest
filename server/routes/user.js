const router = require('express').Router();
const user = require('../controller/user');
const auth = require('../auth/authenticate');

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout',auth.authenticateRequest,user.logout);
router.post('/forgotpwd',user.forgotPwd);
router.post('/updateuser',auth.authenticateRequest,user.updateDetails);
module.exports = router;