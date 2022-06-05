var express = require('express');
var router = express.Router();
const apiProduct = require('../controllers/api.product.controller');

/* GET users listing. */

router.get('/getproduct', apiProduct.getProduct);
router.get('/getcategory', apiProduct.getCategory);
router.get('/getbanner', apiProduct.getBanner);
router.get('/getdienthoai', apiProduct.TypeDienthoai);
router.get('/getdongho', apiProduct.TypeDongho);
router.get('/getmaytinh', apiProduct.TypeMaytinh);
router.get('/getipad', apiProduct.TypeIpad);
router.get('/getphukien', apiProduct.TypePhukien);

module.exports = router;
