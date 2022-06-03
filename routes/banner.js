var express = require('express');
var router = express.Router();
const bannerC = require('../controllers/banner.controller');
var auth = require('../middleware/auth.midllware');

var multer = require('multer');
const upload = multer({dest:'./tmp/'})
/* GET users listing. */
router.get('/add',auth.YeuCauDangNhap, bannerC.getFormAdd);
router.post('/add',auth.YeuCauDangNhap,upload.single("anh") ,bannerC.postAdd);
router.get('/list',auth.YeuCauDangNhap, bannerC.getListLoai);
router.get('/edit/:id',auth.YeuCauDangNhap, bannerC.getFormEdit);
router.post('/edit/:id',auth.YeuCauDangNhap,upload.single("anh"), bannerC.postEdit);
router.get('/delete/:id',auth.YeuCauDangNhap, bannerC.postDelete);

module.exports = router;
