import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { initialMembers as defaultMembers } from '../../data/mockData';
import {
  UserPlus,
  Search,
  Users,
  AlertTriangle,
  CheckCircle,
  X,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

const INITIAL_MEMBER_FORM = {
  name: '',
  email: '',
  department: '',
  role: 'Student',
  phone: '',
};

export default function Members() {
  const [membersList, setMembersList] = useState(defaultMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Controlled Form State & Validation
  const [formData, setFormData] = useState(INITIAL_MEMBER_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateMemberForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full member name is required.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'University email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., student@univ.edu).';
    }

    // Department validation
    if (!formData.department.trim()) {
      errors.department = 'Academic department is required.';
    }

    // Phone validation (optional or 10 digits)
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        errors.phone = 'Phone number must contain at least 10 digits.';
      }
    }

    return errors;
  };

  const handleRegisterMember = (e) => {
    e.preventDefault();
    const errors = validateMemberForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newMember = {
      id: `MEM-00${membersList.length + 1}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      role: formData.role,
      borrowedCount: 0,
      status: 'Active',
    };

    console.log('Sprint 10 — New Member Registered (Controlled Component):', newMember);

    setMembersList([newMember, ...membersList]);
    handleReset();
    setShowAddForm(false);
    setNotification(`Successfully registered member "${newMember.name}"!`);
    setTimeout(() => setNotification(''), 4500);
  };

  const handleReset = () => {
    setFormData(INITIAL_MEMBER_FORM);
    setFormErrors({});
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
      <PageTitle
        title="Member Management"
        subtitle={`Total registered members: ${membersList.length} • Directory listings: ${filteredMembers.length} • Sprint 10 Controlled Forms`}
        badge={`${filteredMembers.length} Members`}
        icon={Users}
      >
        <Button
          icon={showAddForm ? X : UserPlus}
          variant={showAddForm ? 'secondary' : 'primary'}
          onClick={() => {
            setShowAddForm((prev) => !prev);
            if (!showAddForm) handleReset();
          }}
        >
          {showAddForm ? 'Close Form' : 'Register Member'}
        </Button>
      </PageTitle>

      {/* Conditional Success Alert */}
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

      {/* Controlled Member Registration Form */}
      {showAddForm && (
        <Card
          title="Register New Library Member"
          subtitle="All inputs are controlled components with real-time validation and error feedback."
          badge="Registration Form"
          headerIcon={UserCheck}
        >
          <form onSubmit={handleRegisterMember} noValidate>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              <Input
                id="member-name"
                name="name"
                label="Full Name"
                placeholder="e.g. Aditi Sen"
                value={formData.name}
                onChange={handleInputChange}
                error={formErrors.name}
                required
              />

              <Input
                id="member-email"
                name="email"
                type="email"
                label="University Email"
                placeholder="e.g. aditi.s@univ.edu"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
                required
              />

              <Input
                id="member-dept"
                name="department"
                label="Academic Department"
                placeholder="e.g. Data Science & AI"
                value={formData.department}
                onChange={handleInputChange}
                error={formErrors.department}
                required
              />

              <Input
                id="member-phone"
                name="phone"
                label="Contact Phone"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleInputChange}
                error={formErrors.phone}
              />

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="member-role"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '6px',
                    color: 'var(--text-main)',
                  }}
                >
                  Membership Role <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  id="member-role"
                  name="role"
                  className="form-input"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.875rem',
                  }}
                >
                  <option value="Student">Student (Limit: 5 books)</option>
                  <option value="Faculty">Faculty (Limit: 10 books)</option>
                  <option value="Staff">Staff (Limit: 3 books)</option>
                </select>
              </div>
            </div>

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
              <Button type="submit" variant="primary" icon={UserPlus}>
                Register Member
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

      {/* Members Table */}
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
