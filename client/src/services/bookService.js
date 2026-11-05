import api from './api';

/**
 * Frontend API Service for Books Resource
 * Handles all HTTP REST communication between React and Express backend
 * adhering to the CRUD operations developed in Sprint 15.
 */
export const bookService = {
  /**
   * GET /api/books
   * Fetch all books from MongoDB via Express API
   */
  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  /**
   * GET /api/books/:id
   * Fetch a single book by ID or ISBN
   */
  getBookById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  /**
   * POST /api/books
   * Register a new book document in MongoDB
   */
  createBook: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  /**
   * PUT /api/books/:id
   * Update an existing book's details in MongoDB
   */
  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  /**
   * DELETE /api/books/:id
   * Remove a book document from MongoDB
   */
  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
};

export default bookService;
