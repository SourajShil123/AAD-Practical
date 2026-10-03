import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { initialBooks as defaultBooks } from '../../data/mockData';
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
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Software Engineering',
  'Computer Science',
  'Web Development',
  'Database Systems',
  'Artificial Intelligence',
  'Distributed Systems',
  'Networking',
];

const INITIAL_FORM_STATE = {
  title: '',
  author: '',
  category: 'Software Engineering',
  isbn: '',
  copies: '',
  publishedYear: '',
};

export default function Books() {
  const [booksList, setBooksList] = useState(defaultBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Exercise 2: Controlled Component Form State
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Controlled Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Exercise 4: Client-Side Form Validation Rules
  const validateForm = () => {
    const errors = {};

    // 1. Title validation
    if (!formData.title.trim()) {
      errors.title = 'Book title is required.';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long.';
    }

    // 2. Author validation
    if (!formData.author.trim()) {
      errors.author = 'Author name is required.';
    } else if (formData.author.trim().length < 3) {
      errors.author = 'Author name must be at least 3 characters long.';
    }

    // 3. ISBN validation (e.g. 978-0132350884 or 10-13 digits)
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (!formData.isbn.trim()) {
      errors.isbn = 'ISBN identifier is required.';
    } else if (!isbnRegex.test(formData.isbn.trim())) {
      errors.isbn = 'Please enter a valid 10 or 13-digit ISBN (e.g., 978-0132350884).';
    }

    // 4. Copies validation (positive integer)
    const copiesNum = parseInt(formData.copies, 10);
    if (!formData.copies) {
      errors.copies = 'Number of copies is required.';
    } else if (isNaN(copiesNum) || copiesNum < 1 || copiesNum > 100) {
      errors.copies = 'Copies must be a positive number between 1 and 100.';
    }

    // 5. Published Year validation
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(formData.publishedYear, 10);
    if (!formData.publishedYear) {
      errors.publishedYear = 'Publication year is required.';
    } else if (isNaN(yearNum) || yearNum < 1450 || yearNum > currentYear) {
      errors.publishedYear = `Enter a valid year between 1450 and ${currentYear}.`;
    }

    return errors;
  };

  // Exercise 3: Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default browser reload
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create new book entry
    const newBook = {
      id: `BK-${100 + booksList.length + 1}`,
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      isbn: formData.isbn.trim(),
      copies: parseInt(formData.copies, 10),
      available: parseInt(formData.copies, 10),
      publishedYear: parseInt(formData.publishedYear, 10),
    };

    console.log('Sprint 10 — New Book Registered (Controlled Component):', newBook);

    // Update list state
    setBooksList([newBook, ...booksList]);
    setSuccessMessage(`"${newBook.title}" by ${newBook.author} was registered successfully!`);
    handleReset(); // Exercise 6: Clear all fields after submission
    setShowAddForm(false);
    setTimeout(() => setSuccessMessage(''), 4500);
  };

  // Exercise 6: Reset Form Handler
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
  };

  const filteredBooks = booksList.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageTitle
        title="Book Inventory & Catalog"
        subtitle={`Displaying ${filteredBooks.length} of ${booksList.length} cataloged titles • Sprint 10 Controlled Form System`}
        badge={`${filteredBooks.length} Titles`}
        icon={BookOpen}
      >
        <Button
          icon={showAddForm ? X : Plus}
          variant={showAddForm ? 'secondary' : 'primary'}
          onClick={() => {
            setShowAddForm((prev) => !prev);
            if (!showAddForm) handleReset();
          }}
        >
          {showAddForm ? 'Close Form' : 'Register New Book'}
        </Button>
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

      {/* Exercise 1 & 7: Project-Specific Book Registration Form */}
      {showAddForm && (
        <Card
          title="Register New Book in Catalog"
          subtitle="All inputs are controlled components with real-time validation and error feedback."
          badge="Sprint 10 Form"
          headerIcon={BookMarked}
        >
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
                placeholder="e.g. Designing Data-Intensive Applications"
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
                placeholder="e.g. Martin Kleppmann"
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
                label="ISBN Number"
                placeholder="e.g. 978-1449373320"
                value={formData.isbn}
                onChange={handleInputChange}
                error={formErrors.isbn}
                required
              />

              {/* Number of Copies */}
              <Input
                id="book-copies"
                name="copies"
                type="number"
                min="1"
                max="100"
                label="Inventory Copies"
                placeholder="e.g. 5"
                value={formData.copies}
                onChange={handleInputChange}
                error={formErrors.copies}
                required
              />

              {/* Publication Year */}
              <Input
                id="book-year"
                name="publishedYear"
                type="number"
                label="Publication Year"
                placeholder="e.g. 2017"
                value={formData.publishedYear}
                onChange={handleInputChange}
                error={formErrors.publishedYear}
                required
              />
            </div>

            {/* Exercise 6: Action Buttons with Submit and Reset */}
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
              <Button type="submit" variant="primary" icon={Plus}>
                Register Book
              </Button>
              <Button type="button" variant="secondary" icon={RotateCcw} onClick={handleReset}>
                Reset Form
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
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

      {/* Books Table */}
      <Card
        title={`Registered Books Catalog (${filteredBooks.length} titles)`}
        subtitle={
          selectedCategory !== 'All'
            ? `Filtered by category: ${selectedCategory}`
            : 'Showing all active catalog holdings'
        }
        badge={filteredBooks.length > 0 ? 'Data Available' : 'No Data'}
      >
        {filteredBooks.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Total Copies</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{book.id}</td>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{book.isbn}</td>
                    <td>{book.copies}</td>
                    <td style={{ fontWeight: 600 }}>{book.available}</td>
                    <td>
                      <span
                        className={`badge ${
                          book.available > 2
                            ? 'badge-success'
                            : book.available > 0
                            ? 'badge-warning'
                            : 'badge-danger'
                        }`}
                      >
                        {book.available > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
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
            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Matching Books Found</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
              We couldn't find any books matching "{searchTerm}" in category "{selectedCategory}".
            </p>
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
          </div>
        )}
      </Card>
    </div>
  );
}
