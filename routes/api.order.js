var express = require('express');
var router = express.Router();
const apiOrder = require('../controllers/order.controller');
var auth = require('../middleware/api.auth.middleware');

router.post('/add',auth, apiOrder.postOrder);
router.get('/list',auth, apiOrder.getOrder);
router.delete('/delete', auth, apiOrder.postDel);



module.exports = router;
