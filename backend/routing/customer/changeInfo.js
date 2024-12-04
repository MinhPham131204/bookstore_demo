const express = require('express');
const router = express.Router();

const changeInfoController = require ('../../controller/customer/changeInfo')

router.get('/:id', changeInfoController.showInfo);
router.put('/:id/edit', changeInfoController.changeInfo);
router.put('/:id/changePassword', changeInfoController.changePassword);

module.exports = router;