const express = require('express');
const router = express.Router();

const passwordController = require ('../../controller/customer/passwordForgot')

router.get('/:id', passwordController.passwordForget);
router.put('/changePassword', passwordController.changePassword);

module.exports = router;