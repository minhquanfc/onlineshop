var express = require('express');
var router = express.Router();
const apiGioHang = require('../controllers/api.giohang.controller');

/* GET users listing. */

router.post('/themgiohang', apiGioHang.postThemGioHang);
router.get('/giohang', apiGioHang.getGioHang);


module.exports = router;
