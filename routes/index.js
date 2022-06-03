var express = require('express');
var router = express.Router();
var  userC = require('../controllers/user.controller');
const auth = require('../middleware/auth.midllware');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',auth.ChuaDangNhap,userC.getFormLogin);
router.post('/login',auth.ChuaDangNhap,userC.postLogin);
// router.get('/register',auth.ChuaDangNhap,userC.getFormRegister);
// router.post('/register',auth.ChuaDangNhap,userC.postRegister);


module.exports = router;
