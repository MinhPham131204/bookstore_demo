const express = require('express');
const router = express.Router();

const CartController = require('../../controller/customer/cart')

router.get('/all', CartController.getByID)
router.post('/addBook', CartController.addBook)
router.delete('/delete/:id', CartController.removeBook)
// router.get('/:categoryID', BookController.showAllBookByCategory)
// router.get('/book-info/:id', BookController.showBookInfo)

module.exports = router