import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { UserPlus, Search, Users, AlertTriangle, CheckCircle, X } from 'lucide-react';

const initialMembers = [
  { id: 'MEM-001', name: 'Rahul Sharma', email: 'rahul.s@univ.edu', department: 'Computer Science', role: 'Student', borrowedCount: 2, status: 'Active' },
  { id: 'MEM-002', name: 'Dr. Priya Desai', email: 'priya.d@univ.edu', department: 'Information Technology', role: 'Faculty', borrowedCount: 4, status: 'Active' },
  { id: 'MEM-003', name: 'Ananya Verma', email: 'ananya.v@univ.edu', department: 'Computer Science', role: 'Student', borrowedCount: 1, status: 'Active' },
  { id: 'MEM-004', name: 'Vikram Patel', email: 'vikram.p@univ.edu', department: 'Electrical Engineering', role: 'Student', borrowedCount: 3, status: 'Suspended' },
  { id: 'MEM-005', name: 'Sneha Roy', email: 'sneha.r@univ.edu', department: 'Mechanical Engineering', role: 'Student', borrowedCount: 0, status: 'Active' },
];

export default function Members() {
  const [membersList, setMembersList] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newRole, setNewRole] = useState('Student');
  const [notification, setNotification] = useState('');

  const handleRegisterMember = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newMember = {
      id: `MEM-00${membersList.length + 1}`,
      name: newName,
      email: newEmail,
      department: newDept || 'General Studies',
      role: newRole,
      borrowedCount: 0,
      status: 'Active',
    };

    setMembersList([newMember, ...membersList]);
    setNewName('');
    setNewEmail('');
    setNewDept('');
    setShowAddForm(false);
    setNotification(`Successfully registered member "${newMember.name}"!`);
    setTimeout(() => setNotification(''), 4000);
  };

  const filteredMembers = membersList.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      {/* Exercise 2: PageTitle with Dynamic Props */}
      <PageTitle
        title="Member Management"
        subtitle={`Total registered members: ${membersList.length} • Active in directory: ${filteredMembers.length}`}
        badge={`${filteredMembers.length} Members Displayed`}
        icon={Users}
      >
        <Button
          icon={showAddForm ? X : UserPlus}
          variant={showAddForm ? 'secondary' : 'primary'}
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? 'Cancel' : 'Register Member'}
        </Button>
      </PageTitle>

      {/* Exercise 6: Conditional Notification */}
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

      {/* Conditional Rendering: Register Member Drawer */}
      {showAddForm && (
        <Card title="Register New Library Member" subtitle="Input student or faculty registration credentials" badge="Registration">
          <form onSubmit={handleRegisterMember}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <Input
                label="Full Name"
                placeholder="e.g. Aditi Sen"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. aditi.s@univ.edu"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <Input
                label="Academic Department"
                placeholder="e.g. Data Science"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                required
              />
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Membership Role</label>
                <select
                  className="form-input"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="Student">Student (Limit: 5 books)</option>
                  <option value="Faculty">Faculty (Limit: 10 books)</option>
                  <option value="Staff">Staff (Limit: 3 books)</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <Button type="submit" variant="primary" icon={UserPlus}>
                Confirm Registration
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
              placeholder="Search member by name, ID, department or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              style={{ margin: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Role Filter:</span>
            {['All', 'Student', 'Faculty'].map((r) => (
              <Button
                key={r}
                size="sm"
                variant={roleFilter === r ? 'primary' : 'secondary'}
                active={roleFilter === r}
                onClick={() => setRoleFilter(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Members Table with Conditional Rendering */}
      <Card
        title={`Registered Members (${filteredMembers.length})`}
        subtitle="Active borrowing rights and university identification"
        badge={filteredMembers.length > 0 ? 'Data Available' : 'No Data'}
      >
        {filteredMembers.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Books Borrowed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{m.id}</td>
                    <td style={{ fontWeight: 500 }}>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.department}</td>
                    <td>
                      <span className="badge badge-primary">{m.role}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{m.borrowedCount} / 5</td>
                    <td>
                      <span
                        className={`badge ${
                          m.status === 'Active' ? 'badge-success' : 'badge-danger'
                        }`}
                      >
                        {m.status}
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
            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Members Found</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
              No member accounts matched query "{searchTerm}" under role "{roleFilter}".
            </p>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('All');
              }}
            >
              Reset Search & Filter
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
