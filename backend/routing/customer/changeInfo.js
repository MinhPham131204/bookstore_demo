const express = require('express');
const router = express.Router();

const changeInfoController = require ('../../controller/customer/changeInfo')

router.get('/', changeInfoController.showInfo);
router.put('/edit', changeInfoController.changeInfo);
router.put('/changePassword', changeInfoController.changePassword);

module.exports = router;