const express = require('express');
const router = express.Router();

const Dashboard = require('../../controller/seller/dashboard')

router.get('/', async (req, res) => {
    const todayRev = await Dashboard.revenueByDay();
    const monthRev = await Dashboard.revenueByMonth();
    const yearRev = await Dashboard.revenueByYear();

    const topSold = await Dashboard.topSoldBook();
    const newOrder = await Dashboard.topNewOrder()

    // Construct the response object
    const response = {
        todayRev,
        monthRev,
        yearRev,
        topSold,
        newOrder,
    };

    res.json(response);
})

module.exports = router