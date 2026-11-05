import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { bookService } from '../../services/bookService';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  X,
  RotateCcw,
  BookMarked,
  Pencil,
  Trash2,
  RefreshCw,
  Loader2,
  Check,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Software Engineering',
  'Computer Science',
  'Web Development',
  'Technology',
  'Database Systems',
  'Artificial Intelligence',
  'Networking',
  'General',
];

const INITIAL_FORM_STATE = {
  title: '',
  author: '',
  category: 'Software Engineering',
  isbn: '',
  copies: 1,
  status: 'Available',
};

export default function Books() {
  // Data and UI states
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form states (Sprint 16: Connect Form to POST/PUT)
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // null = Create, object = Edit
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formApiError, setFormApiError] = useState('');

  // Exercise 2, 5 & 6: Fetch books from MongoDB through Express REST API
  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await bookService.getAllBooks();
      if (response && response.data) {
        setBooksList(response.data);
      } else if (Array.isArray(response)) {
        setBooksList(response);
      } else {
        setBooksList([]);
      }
    } catch (err) {
      console.error('Error fetching books from backend:', err);
      const msg =
        err.response?.data?.message ||
        'Unable to load books from backend server (http://localhost:5000/api/books). Please ensure the Express server is running and MongoDB is connected.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      try {
        const response = await bookService.getAllBooks();
        if (isMounted) {
          if (response && response.data) {
            setBooksList(response.data);
          } else if (Array.isArray(response)) {
            setBooksList(response);
          } else {
            setBooksList([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
            'Unable to load books from backend server (http://localhost:5000/api/books). Please ensure Express server is running.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitial();
    return () => {
      isMounted = false;
    };
  }, []);

  // Controlled input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (formApiError) {
      setFormApiError('');
    }
  };

  // Validation rules matching backend Mongoose schema
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Book title is required.';
    } else if (formData.title.trim().length < 2) {
      errors.title = 'Title must be at least 2 characters long.';
    }

    if (!formData.author.trim()) {
      errors.author = 'Author name is required.';
    } else if (formData.author.trim().length < 2) {
      errors.author = 'Author name must be at least 2 characters long.';
    }

    const isbnClean = formData.isbn.replace(/[-\s]/g, '');
    const isbnRegex = /^(?:\d{9}[\dx]|\d{13})$/i;
    if (!formData.isbn.trim()) {
      errors.isbn = 'ISBN identifier is required.';
    } else if (!isbnRegex.test(isbnClean)) {
      errors.isbn = 'Must be a valid 10 or 13-digit ISBN (e.g., 978-0132350884).';
    }

    const copiesNum = parseInt(formData.copies, 10);
    if (!formData.copies && formData.copies !== 0) {
      errors.copies = 'Number of copies is required.';
    } else if (isNaN(copiesNum) || copiesNum < 1) {
      errors.copies = 'Number of copies must be at least 1.';
    }

    return errors;
  };

  // Exercise 9 & 10: Handle Create (POST) and Update (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitting(true);
    setFormApiError('');

    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      isbn: formData.isbn.trim(),
      copies: parseInt(formData.copies, 10),
      status: formData.status || 'Available',
    };

    try {
      if (editingBook) {
        // Exercise 10: PUT /api/books/:id
        const bookId = editingBook._id || editingBook.id;
        await bookService.updateBook(bookId, payload);
        setSuccessMessage(`"${payload.title}" updated successfully in database!`);
      } else {
        // Exercise 9: POST /api/books
        await bookService.createBook(payload);
        setSuccessMessage(`"${payload.title}" registered successfully in MongoDB!`);
      }

      handleCloseForm();
      await loadBooks(); // Refresh list with updated data
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Failed to submit book:', err);
      const apiMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(', ') ||
        'Server failed to process the request. Please check required fields and uniqueness.';
      setFormApiError(apiMsg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Exercise 11: Handle Delete (DELETE /api/books/:id)
  const handleDelete = async (book) => {
    const bookId = book._id || book.id;
    const confirmMessage = `Are you sure you want to delete "${book.title}" by ${book.author} from the library database?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await bookService.deleteBook(bookId);
      setSuccessMessage(`"${book.title}" was permanently removed from MongoDB.`);
      await loadBooks();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Failed to delete book:', err);
      alert(
        err.response?.data?.message ||
        'Failed to delete book. Please verify server connection.'
      );
    }
  };

  // Open edit modal/form populated with existing values
  const handleEditClick = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      category: book.category || 'General',
      isbn: book.isbn || '',
      copies: book.copies || 1,
      status: book.status || 'Available',
    });
    setFormErrors({});
    setFormApiError('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAddForm = () => {
    setEditingBook(null);
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setFormApiError('');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setFormApiError('');
  };

  const handleReset = () => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || '',
        author: editingBook.author || '',
        category: editingBook.category || 'General',
        isbn: editingBook.isbn || '',
        copies: editingBook.copies || 1,
        status: editingBook.status || 'Available',
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
    setFormErrors({});
    setFormApiError('');
  };

  // Filter books in UI
  const filteredBooks = booksList.filter((book) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (book.title && book.title.toLowerCase().includes(term)) ||
      (book.author && book.author.toLowerCase().includes(term)) ||
      (book.isbn && book.isbn.toLowerCase().includes(term));
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageTitle
        title="Book Inventory & Catalog"
        subtitle={`Connected to MongoDB Atlas API • Displaying ${filteredBooks.length} of ${booksList.length} database records`}
        badge={`${filteredBooks.length} Live Titles`}
        icon={BookOpen}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            icon={RefreshCw}
            variant="secondary"
            onClick={loadBooks}
            disabled={loading}
            title="Refresh from MongoDB"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>

          <Button
            icon={showForm ? X : Plus}
            variant={showForm ? 'secondary' : 'primary'}
            onClick={showForm ? handleCloseForm : handleOpenAddForm}
          >
            {showForm ? 'Close Form' : 'Register New Book'}
          </Button>
        </div>
      </PageTitle>

      {/* Success Notification */}
      {successMessage && (
        <div
          style={{
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            border: '1px solid #a7f3d0',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500,
          }}
        >
          <CheckCircle size={18} />
          {successMessage}
        </div>
      )}

      {/* Exercise 8: Error Banner */}
      {error && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} />
            <div>
              <strong>Backend Connection Issue: </strong>
              <span>{error}</span>
            </div>
          </div>
          <Button size="sm" variant="secondary" onClick={loadBooks} icon={RefreshCw}>
            Retry
          </Button>
        </div>
      )}

      {/* Exercise 9 & 10: Connected Create & Update Form */}
      {showForm && (
        <Card
          title={editingBook ? `Edit Book: "${editingBook.title}"` : 'Register New Book in MongoDB'}
          subtitle={
            editingBook
              ? 'Submitting this form executes a PUT request to update the document in MongoDB Atlas.'
              : 'Submitting this form executes a POST request to persist a new document in MongoDB Atlas.'
          }
          badge={editingBook ? 'PUT /api/books/:id' : 'POST /api/books'}
          headerIcon={BookMarked}
        >
          {formApiError && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '16px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertTriangle size={16} />
              <span>{formApiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Title Input */}
              <Input
                id="book-title"
                name="title"
                label="Book Title"
                placeholder="e.g. Clean Architecture"
                value={formData.title}
                onChange={handleInputChange}
                error={formErrors.title}
                required
              />

              {/* Author Input */}
              <Input
                id="book-author"
                name="author"
                label="Author Name"
                placeholder="e.g. Robert C. Martin"
                value={formData.author}
                onChange={handleInputChange}
                error={formErrors.author}
                required
              />

              {/* Category Select */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="book-category"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '6px',
                    color: 'var(--text-main)',
                  }}
                >
                  Category <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  id="book-category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.875rem',
                  }}
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* ISBN Input */}
              <Input
                id="book-isbn"
                name="isbn"
                label="ISBN Number (10 or 13 digits)"
                placeholder="e.g. 978-0134494164"
                value={formData.isbn}
                onChange={handleInputChange}
                error={formErrors.isbn}
                required
                disabled={!!editingBook} // ISBN is unique immutable identifier
              />

              {/* Number of Copies */}
              <Input
                id="book-copies"
                name="copies"
                type="number"
                min="1"
                label="Inventory Copies"
                placeholder="e.g. 5"
                value={formData.copies}
                onChange={handleInputChange}
                error={formErrors.copies}
                required
              />

              {/* Status Select */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="book-status"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '6px',
                    color: 'var(--text-main)',
                  }}
                >
                  Availability Status <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  id="book-status"
                  name="status"
                  className="form-input"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.875rem',
                  }}
                >
                  <option value="Available">Available</option>
                  <option value="Issued">Issued</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-light)',
                flexWrap: 'wrap',
              }}
            >
              <Button
                type="submit"
                variant="primary"
                icon={editingBook ? Check : Plus}
                disabled={formSubmitting}
              >
                {formSubmitting
                  ? editingBook
                    ? 'Updating in MongoDB...'
                    : 'Saving to MongoDB...'
                  : editingBook
                  ? 'Update Book'
                  : 'Register Book'}
              </Button>
              <Button type="button" variant="secondary" icon={RotateCcw} onClick={handleReset}>
                Reset
              </Button>
              <Button type="button" variant="ghost" onClick={handleCloseForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Filter and Search Bar */}
      <Card>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              style={{ margin: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Filter size={15} /> Category:
            </span>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? 'primary' : 'secondary'}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Books Table with Loading State and CRUD Actions */}
      <Card
        title={`Live Database Holdings (${filteredBooks.length} records)`}
        subtitle={
          selectedCategory !== 'All'
            ? `Category filter applied: ${selectedCategory}`
            : 'All documents streamed directly from MongoDB Atlas books collection'
        }
        badge={loading ? 'Fetching...' : `${filteredBooks.length} Available`}
      >
        {/* Exercise 7: Loading State Indicator */}
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)',
            }}
          >
            <Loader2
              size={36}
              style={{
                animation: 'spin 1s linear infinite',
                color: 'var(--primary)',
                margin: '0 auto 12px',
              }}
            />
            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
              Loading books from MongoDB Atlas...
            </h4>
            <p style={{ fontSize: '0.875rem' }}>Communicating via Express REST API service layer</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Copies</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => {
                  const id = book._id || book.id;
                  return (
                    <tr key={id}>
                      <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                        {book.title}
                      </td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{book.isbn}</td>
                      <td style={{ fontWeight: 600 }}>{book.copies}</td>
                      <td>
                        <span
                          className={`badge ${
                            book.status === 'Available'
                              ? 'badge-success'
                              : 'badge-warning'
                          }`}
                        >
                          {book.status || 'Available'}
                        </span>
                      </td>
                      {/* Exercise 10 & 11: Edit and Delete Buttons */}
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Pencil}
                            onClick={() => handleEditClick(book)}
                            title="Edit book details (PUT)"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            icon={Trash2}
                            onClick={() => handleDelete(book)}
                            title="Delete book document (DELETE)"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: 'var(--bg-body)',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border-color)',
            }}
          >
            <AlertTriangle size={36} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Books Found</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
              {booksList.length === 0
                ? 'Your MongoDB books collection is currently empty. Click "Register New Book" above to add your first book!'
                : `No books match "${searchTerm}" in category "${selectedCategory}".`}
            </p>
            {booksList.length > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Reset Search & Filters
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
