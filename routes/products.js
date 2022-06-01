var express = require('express');
var router = express.Router();
var productC = require('../controllers/product.controller');
var auth = require('../middleware/auth.midllware');

var multer = require('multer');
const upload = multer({dest:'./tmp/'})

router.get('/',auth.YeuCauDangNhap,productC.getListProduct);
router.get('/add',auth.YeuCauDangNhap,productC.getFormAddProduct);
router.post('/add',auth.YeuCauDangNhap,upload.single("anhsanpham"),productC.postAddProduct);
router.get('/edit/:id',auth.YeuCauDangNhap,productC.getFormEditProduct);
router.post('/edit/:id',auth.YeuCauDangNhap,upload.single('anhsanpham'),productC.postEdit);
router.get('/delete/:id',auth.YeuCauDangNhap,productC.postDelete);

module.exports = router;