const express = require('express');
const router = express.Router();

const DiscountController = require('../../controller/seller/discount')

router.get('/all', async (req, res) => {
    DiscountController.showDiscountList
})

module.exports = router