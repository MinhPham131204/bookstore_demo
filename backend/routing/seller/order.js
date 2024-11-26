const express = require('express');
const router = express.Router();

const OrderController = require('../../controller/seller/order')

router.get('/', async (req, res) => {
    const allOrder = await OrderController.allOrder();
    const allOrderInMonth = await OrderController.allOrderInMonth();

    // Construct the response object
    const response = {
        allOrder,
        allOrderInMonth,
    };

    res.json(response);
})

module.exports = router