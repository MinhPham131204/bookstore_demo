const express = require('express');
const router = express.Router();

const StockController = require('../../controller/seller/stock')

router.get('/', async (req, res) => {
    const countAllBook = await StockController.countAll();
    const countByCategory = await StockController.countByCategory();

    // Construct the response object
    const response = {
        countAllBook,
        countByCategory,
    };

    res.json(response);
})

module.exports = router