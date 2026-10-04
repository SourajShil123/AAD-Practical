const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// Routes for /api/books
router
  .route('/')
  .get(getAllBooks)
  .post(createBook);

// Routes for /api/books/:id
router
  .route('/:id')
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;
