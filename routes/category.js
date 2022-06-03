var express = require('express');
var router = express.Router();
const categoryC = require('../controllers/category.controller');
var auth = require('../middleware/auth.midllware');

var multer = require('multer');
const upload = multer({dest:'./tmp/'})
/* GET users listing. */
router.get('/add',auth.YeuCauDangNhap, categoryC.getFormAdd);
router.post('/add',auth.YeuCauDangNhap,upload.single("anh") ,categoryC.postAdd);
router.get('/list',auth.YeuCauDangNhap, categoryC.getListLoai);
router.get('/edit/:id',auth.YeuCauDangNhap, categoryC.getFormEdit);
router.post('/edit/:id',auth.YeuCauDangNhap,upload.single("anh"), categoryC.postEdit);
router.get('/delete/:id',auth.YeuCauDangNhap, categoryC.postDelete);

module.exports = router;
