/**
 * Book Controller
 * Handles business logic and request processing for Library Management books.
 * Uses in-memory data store for Sprint 12 before database integration.
 */

let books = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    category: 'Computer Science',
    copies: 5,
    status: 'Available',
  },
  {
    id: '2',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '9780262033848',
    category: 'Computer Science',
    copies: 3,
    status: 'Available',
  },
  {
    id: '3',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    isbn: '9780201616224',
    category: 'Technology',
    copies: 4,
    status: 'Available',
  },
];

// @desc    Get all books
// @route   GET /api/books
const getAllBooks = (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);

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
};

// @desc    Register a new book
// @route   POST /api/books
const createBook = (req, res) => {
  const { title, author, isbn, category, copies } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Please provide book title and author',
    });
  }

  const newBook = {
    id: String(Date.now()),
    title,
    author,
    isbn: isbn || 'N/A',
    category: category || 'General',
    copies: Number(copies) || 1,
    status: 'Available',
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book registered successfully',
    data: newBook,
  });
};

// @desc    Update book details
// @route   PUT /api/books/:id
const updateBook = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Book not found with ID ${id}`,
    });
  }

  books[index] = {
    ...books[index],
    ...req.body,
    id, // preserve ID
  };

  res.status(200).json({
    success: true,
    message: `Book with ID ${id} updated successfully`,
    data: books[index],
  });
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
const deleteBook = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Book not found with ID ${id}`,
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Book with ID ${id} deleted successfully`,
    data: deletedBook,
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
