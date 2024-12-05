const express = require('express');
const router = express.Router();

const changeInfoController = require ('../../controller/customer/changeInfo')

router.get('/', changeInfoController.showInfo);
router.put('/edit', changeInfoController.changeInfo);
router.get('/change-password-form', changeInfoController.passwordUI)
router.put('/confirm-change-password', changeInfoController.changePassword);

module.exports = router;