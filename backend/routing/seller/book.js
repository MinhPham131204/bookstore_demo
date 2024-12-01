const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

const bookController = require('../../controller/seller/book');

router.get('/create', bookController.create)
router.get('/list', bookController.showBookList)
router.get('/rating', bookController.showRating)
router.post('/store', upload.single('image'), bookController.storeBook)
router.get('/:id', bookController.showBookInfo)

module.exports = router