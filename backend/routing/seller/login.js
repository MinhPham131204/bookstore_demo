const express = require('express');
const router = express.Router();

const LoginController = require('../../controller/seller/login')

router.get('/', LoginController.getLoginPage)
router.post('/createUser', LoginController.register)
router.post('/validateUser', LoginController.userLogin)

module.exports = router