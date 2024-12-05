const express = require('express');
const router = express.Router();

const OrderController = require('../../controller/customer/order')

router.get('/orderInfo', OrderController.getInfo)
router.post('/confirmOrder', OrderController.confirmOrder)
router.get('/orderList', OrderController.showOrderList); // danh sách đơn hàng
// router.get('/orderList/:id', OrderController.showOrderList);
router.post('/rating', OrderController.rating)
router.put('/orderList/:orderID', OrderController.cancelOrder); // hủy đơn hàng

module.exports = router