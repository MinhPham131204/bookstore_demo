const express = require('express');
const router = express.Router();

const LoginController = require('../../controller/customer/login')

router.get('/', LoginController.getLoginPage)
router.post('/createUser', LoginController.register)
router.post('/validateUser', LoginController.userLogin)
router.get('/logout', LoginController.logout)

module.exports = router