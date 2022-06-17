var express = require('express');
var router = express.Router();
const userC = require('../controllers/user.controller');
var auth = require('../middleware/auth.midllware');
var auth_api = require('../middleware/api.auth.middleware');


/* GET users listing. */
router.get('/',auth.YeuCauDangNhap, userC.getListUsers);
router.get('/add',auth.YeuCauDangNhap, userC.getFromAddUsers);
router.post('/add',auth.YeuCauDangNhap, userC.postAdd);
router.get('/edit/:id',auth.YeuCauDangNhap, userC.getFormEditUsers);
router.post('/edit/:id',auth.YeuCauDangNhap,userC.postEdit);
router.get('/delete/:id',auth.YeuCauDangNhap, userC.postDel);
router.put('/edits', auth_api, userC.putEdit);



module.exports = router;
