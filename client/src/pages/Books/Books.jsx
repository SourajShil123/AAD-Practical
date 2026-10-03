import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { BookOpen, Plus, Search, Filter, AlertTriangle, CheckCircle, X } from 'lucide-react';

const initialBooks = [
  { id: 'BK-101', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', isbn: '978-0132350884', copies: 5, available: 3 },
  { id: 'BK-102', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', isbn: '978-0262033848', copies: 8, available: 2 },
  { id: 'BK-103', title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma et al.', category: 'Software Engineering', isbn: '978-0201633610', copies: 4, available: 4 },
  { id: 'BK-104', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: 'Web Development', isbn: '978-0596517748', copies: 6, available: 1 },
  { id: 'BK-105', title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'Database Systems', isbn: '978-0078022159', copies: 7, available: 5 },
  { id: 'BK-106', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', category: 'Artificial Intelligence', isbn: '978-0136042594', copies: 3, available: 0 },
];

export default function Books() {
  const [booksList, setBooksList] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Software Engineering');
  const [newCopies, setNewCopies] = useState(5);
  const [notification, setNotification] = useState('');

  const categories = ['All', 'Software Engineering', 'Computer Science', 'Web Development', 'Database Systems', 'Artificial Intelligence'];

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const newBook = {
      id: `BK-${100 + booksList.length + 1}`,
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      isbn: `978-0${Math.floor(100000000 + Math.random() * 900000000)}`,
      copies: Number(newCopies),
      available: Number(newCopies),
    };

    setBooksList([newBook, ...booksList]);
    setNewTitle('');
    setNewAuthor('');
    setShowAddForm(false);
    setNotification(`Successfully added "${newBook.title}" to library catalog!`);
    setTimeout(() => setNotification(''), 4000);
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
      {/* Exercise 2: PageTitle with Dynamic Props */}
      <PageTitle
        title="Book Inventory & Catalog"
        subtitle={`Displaying ${filteredBooks.length} of ${booksList.length} total cataloged books in system`}
        badge={`${filteredBooks.length} Titles Listed`}
        icon={BookOpen}
      >
        <Button
          icon={showAddForm ? X : Plus}
          variant={showAddForm ? 'secondary' : 'primary'}
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? 'Cancel' : 'Add New Book'}
        </Button>
      </PageTitle>

      {/* Exercise 6: Conditional Notification Message */}
      {notification && (
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
          {notification}
        </div>
      )}

      {/* Exercise 6: Conditional Rendering - Add New Book Form Drawer */}
      {showAddForm && (
        <Card title="Register New Book in Inventory" subtitle="Fill in details to catalog a new title" badge="Catalog Form">
          <form onSubmit={handleAddBook}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <Input
                label="Book Title"
                placeholder="e.g. Clean Architecture"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <Input
                label="Author Name"
                placeholder="e.g. Robert C. Martin"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
              />
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Number of Copies"
                type="number"
                min="1"
                max="50"
                value={newCopies}
                onChange={(e) => setNewCopies(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <Button type="submit" variant="primary" icon={Plus}>
                Save to Catalog
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Filter and Search Bar (Exercise 5: Input event) */}
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
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={15} /> Category:
            </span>
            {categories.map((cat) => (
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

      {/* Books Table (Exercise 6: Conditional Rendering - Data Available vs Empty State) */}
      <Card
        title={`Books List (${filteredBooks.length} titles)`}
        subtitle={selectedCategory !== 'All' ? `Filtered by category: ${selectedCategory}` : 'Showing all catalog items'}
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
              We couldn't find any books matching "{searchTerm}" in the {selectedCategory} category.
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
