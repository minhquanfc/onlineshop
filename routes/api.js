var express = require('express');
var router = express.Router();
const apiProduct = require('../controllers/api.product.controller');

/* GET users listing. */

router.get('/getall', apiProduct.getProduct);

module.exports = router;
