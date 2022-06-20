var express = require('express');
var router = express.Router();
const order = require('../controllers/orders.controller');
var auth = require('../middleware/auth.midllware');

router.get('/', auth.YeuCauDangNhap, order.getFormlistOrder);
router.get('/edit/:id', auth.YeuCauDangNhap, order.getFormEditOrder);
router.post('/edit/:id', auth.YeuCauDangNhap, order.postEdit);
router.get('/delete/:id', auth.YeuCauDangNhap, order.postDelete);
// router.delete('/delete', auth, apiOrder.postDel);


module.exports = router;
