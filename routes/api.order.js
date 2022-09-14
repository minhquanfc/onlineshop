var express = require('express');
var router = express.Router();
const apiOrder = require('../controllers/api.order.controller');
var auth = require('../middleware/api.auth.middleware');
const order = require("../controllers/orders.controller");

router.post('/add',auth, apiOrder.postOrder);
router.get('/list',auth, apiOrder.getOrder);
router.delete('/delete', auth, apiOrder.postDel);
router.get('/item/:id', auth, apiOrder.getFormItemOrder);


module.exports = router;
