import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Receipt, CheckCircle, AlertCircle, Search, AlertTriangle } from 'lucide-react';

const initialFines = [
  { id: 'FN-301', member: 'Vikram Patel', book: 'Designing Data-Intensive Applications', daysOverdue: 8, amount: 16.00, status: 'Pending' },
  { id: 'FN-302', member: 'Amit Joshi', book: 'Artificial Intelligence: A Modern Approach', daysOverdue: 2, amount: 4.00, status: 'Paid' },
  { id: 'FN-303', member: 'Rohit Gupta', book: 'Operating System Concepts', daysOverdue: 14, amount: 28.00, status: 'Pending' },
  { id: 'FN-304', member: 'Ananya Verma', book: 'Computer Networks (Tanenbaum)', daysOverdue: 5, amount: 10.00, status: 'Paid' },
];

export default function Fines() {
  const [finesList, setFinesList] = useState(initialFines);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Exercise 4: Handle Button Click to settle fine and update state
  const settleFine = (id) => {
    const updated = finesList.map((f) =>
      f.id === id ? { ...f, status: 'Paid' } : f
    );
    setFinesList(updated);
    const settledItem = finesList.find((f) => f.id === id);
    setSuccessMessage(`Fine ${id} ($${settledItem?.amount.toFixed(2)}) has been recorded as Paid!`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // Dynamic calculations based on state
  const unpaidTotal = finesList
    .filter((f) => f.status === 'Pending')
    .reduce((sum, f) => sum + f.amount, 0);

  const paidTotal = finesList
    .filter((f) => f.status === 'Paid')
    .reduce((sum, f) => sum + f.amount, 0);

  const pendingCount = finesList.filter((f) => f.status === 'Pending').length;
  const paidCount = finesList.filter((f) => f.status === 'Paid').length;

  const filteredFines = finesList.filter((f) => {
    const matchesSearch =
      f.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || f.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Exercise 2: Dynamic PageTitle */}
      <PageTitle
        title="Fine & Penalty Management"
        subtitle={`Pending balance: $${unpaidTotal.toFixed(2)} across ${pendingCount} unpaid records • ${paidCount} settled`}
        badge={`Unpaid: $${unpaidTotal.toFixed(2)}`}
        icon={Receipt}
      />

      {/* Exercise 6: Conditional Success Notification */}
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

      {/* KPI Cards Calculated Dynamically from State */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p>Total Unpaid Fines</p>
            <h3 style={{ color: 'var(--danger)' }}>${unpaidTotal.toFixed(2)}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 600 }}>
              {pendingCount} records pending payment
            </span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Fines Collected (Settled)</p>
            <h3 style={{ color: 'var(--success)' }}>${paidTotal.toFixed(2)}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
              {paidCount} receipts cleared
            </span>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      <Card
        title="Overdue Penalty Records"
        subtitle={`Displaying ${filteredFines.length} of ${finesList.length} fine records`}
        badge={filteredFines.length > 0 ? 'Data Available' : 'No Data'}
      >
        {/* Search and Status Filter */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <Input
              placeholder="Search fine record by member or book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              style={{ margin: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status:</span>
            {['All', 'Pending', 'Paid'].map((st) => (
              <Button
                key={st}
                size="sm"
                variant={filterStatus === st ? 'primary' : 'secondary'}
                active={filterStatus === st}
                onClick={() => setFilterStatus(st)}
              >
                {st}
              </Button>
            ))}
          </div>
        </div>

        {/* Exercise 6: Conditional Rendering */}
        {filteredFines.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fine ID</th>
                  <th>Member</th>
                  <th>Book Title</th>
                  <th>Days Overdue</th>
                  <th>Fine Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFines.map((f) => (
                  <tr key={f.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{f.id}</td>
                    <td>{f.member}</td>
                    <td>{f.book}</td>
                    <td>{f.daysOverdue} days</td>
                    <td style={{ fontWeight: 600 }}>${f.amount.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          f.status === 'Paid' ? 'badge-success' : 'badge-danger'
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td>
                      {f.status === 'Pending' ? (
                        <Button size="sm" variant="primary" onClick={() => settleFine(f.id)}>
                          Mark as Paid
                        </Button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={14} style={{ color: 'var(--success)' }} /> Settled
                        </span>
                      )}
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
            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Fine Records Found</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>
              No fines match the filter "{filterStatus}" and query "{searchTerm}".
            </p>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
