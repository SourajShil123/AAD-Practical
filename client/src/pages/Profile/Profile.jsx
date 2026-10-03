import React, { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Mail, Shield, Calendar, Key, Check, CheckCircle2, Edit3, Save } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Souraj Shil');
  const [userRole, setUserRole] = useState('Head Librarian / Admin');
  const [userEmail, setUserEmail] = useState('sourajshil@gmail.com');
  const [organization, setOrganization] = useState('Central University Library');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveMessage('Profile information saved successfully!');
    setTimeout(() => setSaveMessage(''), 4000);
  };

  return (
    <div>
      {/* Exercise 2: Reusable PageTitle with Dynamic Props */}
      <PageTitle
        title="Staff & Operator Profile"
        subtitle={`Active session profile for ${userName} (${userRole})`}
        badge="Session Active"
        icon={User}
      >
        <Button
          variant={isEditing ? 'secondary' : 'primary'}
          icon={isEditing ? Check : Edit3}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </Button>
      </PageTitle>

      {/* Exercise 6: Conditional Save Message */}
      {saveMessage && (
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
          {saveMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Profile Summary Card with State Variables */}
        <Card>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <User size={44} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{userName}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
              {userRole}
            </p>
            <div style={{ marginTop: '12px' }}>
              <span className="badge badge-success">Active Session</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.875rem' }}>
              <Mail size={16} style={{ color: 'var(--text-muted)' }} />
              <span>{userEmail}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.875rem' }}>
              <Shield size={16} style={{ color: 'var(--text-muted)' }} />
              <span>{organization}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
              <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
              <span>Registered: Oct 2026</span>
            </div>
          </div>
        </Card>

        {/* Edit Form or Read-Only System Privileges (Conditional Rendering) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isEditing ? (
            <Card title="Edit Operator Profile" subtitle="Update profile credentials stored in component state" badge="Editing Mode">
              <form onSubmit={handleSave}>
                <Input
                  label="Operator Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <Input
                  label="Operator Role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <Input
                  label="Organization / Campus"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <Button type="submit" variant="primary" icon={Save}>
                    Save Changes
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card title="System Roles & Authorizations" badge="Verified Permissions">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} style={{ color: 'var(--success)' }} />
                  <span>Full Book Inventory Catalog Read / Write access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} style={{ color: 'var(--success)' }} />
                  <span>Member Registration, Suspension, and Penalty Management</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} style={{ color: 'var(--success)' }} />
                  <span>Circulation Desk checkout and return authority</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} style={{ color: 'var(--success)' }} />
                  <span>Financial fine settlement and auditing capabilities</span>
                </div>
              </div>
            </Card>
          )}

          <Card title="Security Settings" subtitle="Credential protection & session control">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
              Authentication is configured using Express.js session tokens and MongoDB storage.
            </p>
            <Button variant="secondary" icon={Key}>Update Password</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
