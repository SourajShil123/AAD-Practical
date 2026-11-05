import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { memberService } from '../../services/memberService';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  X,
  RotateCcw,
  UserCheck,
  Pencil,
  Trash2,
  RefreshCw,
  Loader2,
  Check,
} from 'lucide-react';

const ROLES = ['All', 'Student', 'Faculty', 'Staff', 'Researcher'];
const STATUSES = ['Active', 'Suspended', 'Expired'];

const INITIAL_MEMBER_FORM = {
  membershipId: '',
  name: '',
  email: '',
  department: '',
  role: 'Student',
  phone: '',
  status: 'Active',
};

export default function Members() {
  const [membersList, setMembersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Form states (Sprint 17: Second CRUD Module)
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // null = Create, object = Edit
  const [formData, setFormData] = useState(INITIAL_MEMBER_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState('');
  const [formApiError, setFormApiError] = useState('');

  // Fetch members from MongoDB through Express REST API
  const loadMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await memberService.getAllMembers();
      if (response && response.data) {
        setMembersList(response.data);
      } else if (Array.isArray(response)) {
        setMembersList(response);
      } else {
        setMembersList([]);
      }
    } catch (err) {
      console.error('Error fetching members from backend:', err);
      const msg =
        err.response?.data?.message ||
        'Unable to load members from backend server (http://localhost:5000/api/members). Please ensure Express server is running and MongoDB is connected.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      try {
        const response = await memberService.getAllMembers();
        if (isMounted) {
          if (response && response.data) {
            setMembersList(response.data);
          } else if (Array.isArray(response)) {
            setMembersList(response);
          } else {
            setMembersList([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
            'Unable to load members from backend server. Please verify database connection.'
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

  const validateMemberForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Full member name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'University email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., student@univ.edu).';
    }

    if (!formData.department.trim()) {
      errors.department = 'Academic department is required.';
    }

    if (formData.phone && formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        errors.phone = 'Phone number must contain at least 10 digits.';
      }
    }

    return errors;
  };

  // Create (POST) or Update (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateMemberForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitting(true);
    setFormApiError('');

    const payload = {
      membershipId: formData.membershipId.trim() || undefined,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      department: formData.department.trim(),
      role: formData.role,
      phone: formData.phone.trim(),
      status: formData.status,
    };

    try {
      if (editingMember) {
        const memberId = editingMember._id || editingMember.id;
        await memberService.updateMember(memberId, payload);
        setNotification(`Member "${payload.name}" updated successfully in database!`);
      } else {
        await memberService.createMember(payload);
        setNotification(`Member "${payload.name}" registered successfully in MongoDB!`);
      }

      handleCloseForm();
      await loadMembers();
      setTimeout(() => setNotification(''), 5000);
    } catch (err) {
      console.error('Failed to submit member:', err);
      const apiMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(', ') ||
        'Server failed to process the request. Please verify unique email and membership ID.';
      setFormApiError(apiMsg);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete (DELETE /api/members/:id)
  const handleDelete = async (member) => {
    const memberId = member._id || member.id;
    const confirmMessage = `Are you sure you want to delete member "${member.name}" (${member.membershipId || member.email}) from the database?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await memberService.deleteMember(memberId);
      setNotification(`Member "${member.name}" was permanently removed from MongoDB.`);
      await loadMembers();
      setTimeout(() => setNotification(''), 5000);
    } catch (err) {
      console.error('Failed to delete member:', err);
      alert(
        err.response?.data?.message ||
        'Failed to delete member. Please verify server connection.'
      );
    }
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setFormData({
      membershipId: member.membershipId || '',
      name: member.name || '',
      email: member.email || '',
      department: member.department || '',
      role: member.role || 'Student',
      phone: member.phone || '',
      status: member.status || 'Active',
    });
    setFormErrors({});
    setFormApiError('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAddForm = () => {
    setEditingMember(null);
    setFormData(INITIAL_MEMBER_FORM);
    setFormErrors({});
    setFormApiError('');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData(INITIAL_MEMBER_FORM);
    setFormErrors({});
    setFormApiError('');
  };

  const handleReset = () => {
    if (editingMember) {
      setFormData({
        membershipId: editingMember.membershipId || '',
        name: editingMember.name || '',
        email: editingMember.email || '',
        department: editingMember.department || '',
        role: editingMember.role || 'Student',
        phone: editingMember.phone || '',
        status: editingMember.status || 'Active',
      });
    } else {
      setFormData(INITIAL_MEMBER_FORM);
    }
    setFormErrors({});
    setFormApiError('');
  };

  const filteredMembers = membersList.filter((m) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (m.name && m.name.toLowerCase().includes(term)) ||
      (m.email && m.email.toLowerCase().includes(term)) ||
      (m.membershipId && m.membershipId.toLowerCase().includes(term)) ||
      (m.department && m.department.toLowerCase().includes(term));
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <PageTitle
        title="Member Management"
        subtitle={`Connected to MongoDB Atlas API • Displaying ${filteredMembers.length} of ${membersList.length} registered members`}
        badge={`${filteredMembers.length} Active Records`}
        icon={Users}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            icon={RefreshCw}
            variant="secondary"
            onClick={loadMembers}
            disabled={loading}
            title="Refresh from MongoDB"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>

          <Button
            icon={showForm ? X : UserPlus}
            variant={showForm ? 'secondary' : 'primary'}
            onClick={showForm ? handleCloseForm : handleOpenAddForm}
          >
            {showForm ? 'Close Form' : 'Register Member'}
          </Button>
        </div>
      </PageTitle>

      {/* Success Notification */}
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

      {/* Error Banner */}
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
          <Button size="sm" variant="secondary" onClick={loadMembers} icon={RefreshCw}>
            Retry
          </Button>
        </div>
      )}

      {/* Create / Edit Member Form */}
      {showForm && (
        <Card
          title={editingMember ? `Edit Member: "${editingMember.name}"` : 'Register New Library Member'}
          subtitle={
            editingMember
              ? 'Submitting this form executes a PUT request to update member data in MongoDB Atlas.'
              : 'Submitting this form executes a POST request to persist a new member document in MongoDB Atlas.'
          }
          badge={editingMember ? 'PUT /api/members/:id' : 'POST /api/members'}
          headerIcon={UserCheck}
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Membership ID */}
              <Input
                id="member-id"
                name="membershipId"
                label="Membership ID (Optional)"
                placeholder="e.g. MEM-007 (Auto-generated if empty)"
                value={formData.membershipId}
                onChange={handleInputChange}
                error={formErrors.membershipId}
                disabled={!!editingMember}
              />

              {/* Full Name */}
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

              {/* Email */}
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

              {/* Department */}
              <Input
                id="member-dept"
                name="department"
                label="Academic Department"
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={handleInputChange}
                error={formErrors.department}
                required
              />

              {/* Role Select */}
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
                  Member Role <span style={{ color: 'var(--danger)' }}>*</span>
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
                  {ROLES.filter((r) => r !== 'All').map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <Input
                id="member-phone"
                name="phone"
                label="Phone Number"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleInputChange}
                error={formErrors.phone}
              />

              {/* Status Select */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="member-status"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginBottom: '6px',
                    color: 'var(--text-main)',
                  }}
                >
                  Membership Status <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <select
                  id="member-status"
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
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
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
                icon={editingMember ? Check : UserPlus}
                disabled={formSubmitting}
              >
                {formSubmitting
                  ? editingMember
                    ? 'Updating in MongoDB...'
                    : 'Saving to MongoDB...'
                  : editingMember
                  ? 'Update Member'
                  : 'Register Member'}
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
              placeholder="Search by name, email, department, or ID..."
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
              <Filter size={15} /> Role:
            </span>
            {ROLES.map((role) => (
              <Button
                key={role}
                size="sm"
                variant={roleFilter === role ? 'primary' : 'secondary'}
                active={roleFilter === role}
                onClick={() => setRoleFilter(role)}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card
        title={`Registered Members Directory (${filteredMembers.length} records)`}
        subtitle={
          roleFilter !== 'All'
            ? `Filtered by role: ${roleFilter}`
            : 'All member records stored persistently in MongoDB Atlas members collection'
        }
        badge={loading ? 'Fetching...' : `${filteredMembers.length} Active`}
      >
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
              Loading members from MongoDB Atlas...
            </h4>
            <p style={{ fontSize: '0.875rem' }}>Communicating via Express REST API service layer</p>
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => {
                  const id = member._id || member.id;
                  return (
                    <tr key={id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'monospace' }}>
                        {member.membershipId || id.slice(-6).toUpperCase()}
                      </td>
                      <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                        {member.name}
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{member.email}</td>
                      <td>{member.department}</td>
                      <td>
                        <span
                          className={`badge ${
                            member.role === 'Faculty'
                              ? 'badge-primary'
                              : member.role === 'Student'
                              ? 'badge-info'
                              : 'badge-secondary'
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            member.status === 'Active'
                              ? 'badge-success'
                              : member.status === 'Suspended'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          {member.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Pencil}
                            onClick={() => handleEditClick(member)}
                            title="Edit member details (PUT)"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            icon={Trash2}
                            onClick={() => handleDelete(member)}
                            title="Delete member document (DELETE)"
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
            <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Members Found</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
              {membersList.length === 0
                ? 'Your MongoDB members collection is currently empty. Click "Register Member" above to add your first member!'
                : `No members match "${searchTerm}" in role "${roleFilter}".`}
            </p>
            {membersList.length > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('All');
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
