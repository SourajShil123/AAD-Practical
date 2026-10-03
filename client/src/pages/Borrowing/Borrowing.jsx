import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { ArrowRightLeft, CheckCircle2, Search, AlertTriangle, BookCheck } from 'lucide-react';

const initialBorrowings = [
  { id: 'BRW-1001', member: 'Rahul Sharma (MEM-001)', book: 'Introduction to Algorithms (BK-102)', issueDate: '2026-10-01', dueDate: '2026-10-15', status: 'Active' },
  { id: 'BRW-1002', member: 'Ananya Verma (MEM-003)', book: 'Clean Code (BK-101)', issueDate: '2026-10-02', dueDate: '2026-10-16', status: 'Active' },
  { id: 'BRW-1003', member: 'Vikram Patel (MEM-004)', book: 'Database System Concepts (BK-105)', issueDate: '2026-09-18', dueDate: '2026-10-02', status: 'Overdue' },
];

export default function Borrowing() {
  const [borrowings, setBorrowings] = useState(initialBorrowings);
  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-18');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleIssue = (e) => {
    e.preventDefault();
    if (!memberId.trim() || !bookId.trim()) return;

    const newIssue = {
      id: `BRW-${1000 + borrowings.length + 1}`,
      member: memberId,
      book: bookId,
      issueDate: '2026-10-04',
      dueDate: dueDate || '2026-10-18',
      status: 'Active',
    };

    setBorrowings([newIssue, ...borrowings]);
    setMemberId('');
    setBookId('');
    setSuccessMsg(`Book successfully issued with ID ${newIssue.id}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const filteredBorrowings = borrowings.filter((b) =>
    b.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Exercise 2: Reusable PageTitle with dynamic props */}
      <PageTitle
        title="Book Borrowing & Circulation Desk"
        subtitle={`Managing ${borrowings.length} total active loans • Authorized circulation counter active`}
        badge={`${borrowings.length} Active Loans`}
        icon={BookCheck}
      />

      {/* Exercise 6: Conditional Notification */}
      {successMsg && (
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
          <CheckCircle2 size={18} />
          {successMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Issue Book Form */}
        <Card title="Issue New Book" subtitle="Enter checkout transaction data" badge="Circulation">
          <form onSubmit={handleIssue}>
            <Input
              label="Member ID / Name"
              placeholder="e.g. MEM-001 or Rahul Sharma"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
            <Input
              label="Book ID / Title"
              placeholder="e.g. BK-101 or Clean Code"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
            <Input
              label="Return Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <Button type="submit" icon={ArrowRightLeft} style={{ width: '100%', marginTop: '8px' }}>
              Confirm & Issue Book
            </Button>
          </form>
        </Card>

        {/* Active Borrowings Table */}
        <Card
          title={`Active Loans (${filteredBorrowings.length})`}
          subtitle="Real-time circulation tracking and return due calendar"
          badge={filteredBorrowings.length > 0 ? 'Data Available' : 'No Data'}
        >
          <div style={{ marginBottom: '16px' }}>
            <Input
              placeholder="Search by loan ID, member name, or book title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              style={{ margin: 0 }}
            />
          </div>

          {filteredBorrowings.length > 0 ? (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Borrow ID</th>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBorrowings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{b.id}</td>
                      <td>{b.member}</td>
                      <td>{b.book}</td>
                      <td>{b.issueDate}</td>
                      <td>{b.dueDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            b.status === 'Active' ? 'badge-primary' : 'badge-danger'
                          }`}
                        >
                          {b.status}
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
                padding: '36px 20px',
                backgroundColor: 'var(--bg-body)',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--border-color)',
              }}
            >
              <AlertTriangle size={32} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Active Loans Found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
                No active loans matched your search query "{searchTerm}".
              </p>
              <Button size="sm" variant="secondary" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
