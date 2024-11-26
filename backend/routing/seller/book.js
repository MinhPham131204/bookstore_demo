const express = require('express');
const router = express.Router();

const bookController = require('../../controller/seller/book');

router.get('/list', bookController.showBookList)
router.get('/rating', bookController.showRating)
router.get('/:id', bookController.showBookInfo)

module.exports = router