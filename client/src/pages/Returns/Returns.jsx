import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { RotateCcw, CheckCircle, Search, AlertTriangle } from 'lucide-react';

const initialReturns = [
  { id: 'RET-501', member: 'Rahul Sharma', book: 'You Don\'t Know JS', returnDate: '2026-10-03', condition: 'Good', fine: '$0.00' },
  { id: 'RET-502', member: 'Amit Joshi', book: 'Artificial Intelligence', returnDate: '2026-09-28', condition: 'Minor Wear', fine: '$5.00' },
  { id: 'RET-503', member: 'Sneha Roy', book: 'Design Patterns', returnDate: '2026-09-22', condition: 'Good', fine: '$0.00' },
];

export default function Returns() {
  const [returnId, setReturnId] = useState('');
  const [condition, setCondition] = useState('Good');
  const [returnsList, setReturnsList] = useState(initialReturns);
  const [searchTerm, setSearchTerm] = useState('');
  const [returnedMsg, setReturnedMsg] = useState('');

  const handleReturn = (e) => {
    e.preventDefault();
    if (!returnId.trim()) return;

    const newRecord = {
      id: `RET-${500 + returnsList.length + 1}`,
      member: 'Member Record (Auto)',
      book: returnId,
      returnDate: '2026-10-04',
      condition,
      fine: condition === 'Damaged' ? '$10.00' : '$0.00',
    };

    setReturnsList([newRecord, ...returnsList]);
    setReturnId('');
    setReturnedMsg(`Book [${returnId}] successfully processed and returned to inventory.`);
    setTimeout(() => setReturnedMsg(''), 4000);
  };

  const filteredReturns = returnsList.filter((r) =>
    r.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Exercise 2: Dynamic PageTitle */}
      <PageTitle
        title="Book Return Processing"
        subtitle={`Processed inventory returns: ${returnsList.length} • Real-time stock restoration`}
        badge={`${returnsList.length} Processed Returns`}
        icon={RotateCcw}
      />

      {/* Exercise 6: Conditional Return Message */}
      {returnedMsg && (
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
          {returnedMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <Card title="Process Return" subtitle="Enter Book/Borrow ID" badge="Inventory Inflow">
          <form onSubmit={handleReturn}>
            <Input
              label="Borrow ID / Book Code"
              placeholder="e.g. BRW-1003 or BK-105"
              value={returnId}
              onChange={(e) => setReturnId(e.target.value)}
              required
            />
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Book Physical Condition</label>
              <select
                className="form-input"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Good">Good / Like New ($0 fine)</option>
                <option value="Minor Wear">Minor Wear & Tear ($0 fine)</option>
                <option value="Damaged">Damaged ($10 penalty fee)</option>
              </select>
            </div>

            <Button type="submit" variant="primary" icon={RotateCcw} style={{ width: '100%' }}>
              Process Return
            </Button>
          </form>
        </Card>

        <Card
          title={`Recent Return Records (${filteredReturns.length})`}
          subtitle="Audit log of items returned and assessed condition"
          badge={filteredReturns.length > 0 ? 'Data Available' : 'No Data'}
        >
          <div style={{ marginBottom: '16px' }}>
            <Input
              placeholder="Search return records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              style={{ margin: 0 }}
            />
          </div>

          {filteredReturns.length > 0 ? (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Return ID</th>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Return Date</th>
                    <th>Condition</th>
                    <th>Fine Assessed</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReturns.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{r.id}</td>
                      <td>{r.member}</td>
                      <td>{r.book}</td>
                      <td>{r.returnDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            r.condition === 'Good'
                              ? 'badge-success'
                              : r.condition === 'Minor Wear'
                              ? 'badge-primary'
                              : 'badge-danger'
                          }`}
                        >
                          {r.condition}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{r.fine}</td>
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
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Returns Match Search</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
                No records matched "{searchTerm}".
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
