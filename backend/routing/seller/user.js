const express = require('express');
const Customer = require('../../model/customer');
const Seller = require('../../model/seller');
const router = express.Router();


router.get('/', async (req, res) => {
    const allUser = await Customer.findAll()

    const allAdmin = await Seller.findAll()

    const response = {
        allUser,
        allAdmin,
    };

    res.json(response);
})

module.exports = router