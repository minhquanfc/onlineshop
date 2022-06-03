var express = require('express');
var router = express.Router();
const userapiC = require('../controllers/api.user.controller');
const auth_api = require('../middleware/api.auth.middleware');

/* GET users listing. */

router.post('/login', userapiC.postLogin);
router.post('/register', userapiC.postReg);
router.get('/profile',auth_api,userapiC.getProfile);
router.post('/logout',auth_api,userapiC.postLogout);
router.post('/logoutall',auth_api,userapiC.postLogoutAll);


module.exports = router;
