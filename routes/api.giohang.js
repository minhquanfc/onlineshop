var express = require('express');
var router = express.Router();
const apiGioHang = require('../controllers/api.giohang.controller');
var auth = require('../middleware/api.auth.middleware');
/* GET users listing. */

router.post('/themgiohang', apiGioHang.postThemGioHang);
router.get('/giohang', apiGioHang.getGioHang);
router.delete('/delete', auth, apiGioHang.postDel);



module.exports = router;
