const express = require('express');
const router = express.Router();

const BookController = require('../../controller/customer/book')

router.get('/', BookController.showBook)
router.get('/:categoryID', BookController.showAllBookByCategory)
router.get('/book-info/:id', BookController.showBookInfo)

module.exports = router