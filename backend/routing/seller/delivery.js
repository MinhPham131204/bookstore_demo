const express = require('express');
const router = express.Router();

const DeliveryController = require('../../controller/seller/deliveryFee')

router.get('/', async (req, res) => {
    const innerCity = await DeliveryController.InnerCityFee();
    const outerCity = await DeliveryController.OuterCityFee();

    // Construct the response object
    const response = {
        innerCity,
        outerCity,
    };

    res.json(response);
})

module.exports = router