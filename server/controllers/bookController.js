const mongoose = require('mongoose');
const Book = require('../models/Book');

/**
 * Book Controller
 * Handles business logic and request processing for Library Management books
 * using Mongoose ODM connected to MongoDB.
 */

// @desc    Get all books from MongoDB
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book by ID or ISBN from MongoDB
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let book = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      book = await Book.findById(id);
    }

    // Also support lookup by ISBN if ObjectId lookup did not match
    if (!book) {
      book = await Book.findOne({ isbn: id });
    }

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new book in MongoDB
// @route   POST /api/books
// @access  Public
const createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, category, copies, status } = req.body;

    const newBook = await Book.create({
      title,
      author,
      isbn,
      category,
      copies,
      status: status || 'Available',
    });

    res.status(201).json({
      success: true,
      message: 'Book registered successfully',
      data: newBook,
    });
  } catch (error) {
    // Handle Mongoose duplicate key error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      const val = error.keyValue ? error.keyValue[field] : '';
      return res.status(400).json({
        success: false,
        message: `Duplicate entry: A book with ${field.toUpperCase()} '${val}' already exists.`,
        error: error.message,
      });
    }

    // Handle Mongoose Schema validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
        errors: messages,
      });
    }

    next(error);
  }
};

// @desc    Update book details in MongoDB
// @route   PUT /api/books/:id
// @access  Public
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Book not found with ID ${id}`,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: `Book not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Book with ID ${id} updated successfully`,
      data: updatedBook,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
        errors: messages,
      });
    }
    next(error);
  }
};

// @desc    Delete a book from MongoDB
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Book not found with ID ${id}`,
      });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: `Book not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Book with ID ${id} deleted successfully`,
      data: deletedBook,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
