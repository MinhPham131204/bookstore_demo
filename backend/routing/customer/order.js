const express = require('express');
const router = express.Router();

const orderController = require ('../../controller/customer/orderList')

router.get('/:id', orderController.showOrderList);
router.put('/:id', orderController.cancelOrder);

module.exports = router;