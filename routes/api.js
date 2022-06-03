var express = require('express');
var router = express.Router();
const apiProduct = require('../controllers/api.product.controller');

/* GET users listing. */

router.get('/getproduct', apiProduct.getProduct);
router.get('/getcategory', apiProduct.getCategory);
router.get('/getbanner', apiProduct.getBanner);


module.exports = router;
