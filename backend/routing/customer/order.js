const express = require('express');
const router = express.Router();

const OrderController = require('../../controller/customer/order')

router.get('/orderInfo', OrderController.getInfo)
router.post('/confirmOrder', OrderController.confirmOrder)
router.get('/orderList', OrderController.showOrderList);
router.get('/orderList/:id', OrderController.showOrderList);
router.post('/rating', OrderController.rating)
router.delete('/orderList/:orderID', OrderController.cancelOrder);

module.exports = router