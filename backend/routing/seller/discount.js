const express = require('express');
const router = express.Router();

const DiscountController = require('../../controller/seller/discount')

router.get('/', async (req, res) => {
    const result = await DiscountController.showDiscountList()
    res.json(result)
})

module.exports = router