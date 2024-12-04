const express = require('express');
const router = express.Router();

const OrderController = require('../../controller/customer/order')

router.get('/', OrderController.createOrder)
router.get('/orderList', OrderController.showOrderList);
router.get('/orderList/:id', OrderController.showOrderList);
router.post('/rating', OrderController.rating)
router.delete('/orderList/:orderID', OrderController.cancelOrder);

module.exports = router