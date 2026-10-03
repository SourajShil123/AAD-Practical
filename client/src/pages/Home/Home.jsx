import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Welcome from '../../components/ui/Welcome';
import {
  BookOpen,
  Users,
  ArrowRightLeft,
  LogIn,
  Library,
  Compass,
} from 'lucide-react';

export default function Home() {
  const [visitorRole, setVisitorRole] = useState('Student');

  return (
    <div>
      {/* Exercise 1 & 2: Reusable Welcome Component with Props on Home Page */}
      <Welcome
        userName="Library Visitor"
        projectName="Library Management System"
        dashboardTitle="Central Knowledge & Resource Repository"
        organizationName="Apex Central University Library"
        role={visitorRole}
        message="Browse the public academic catalog, track available book copies, or log in with librarian credentials to access operational circulation desks."
        isLoggedIn={false}
        badge="Open Campus Access"
        actions={
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/login">
              <Button size="sm" variant="primary" icon={LogIn}>
                Staff Sign In
              </Button>
            </Link>
            <Link to="/books">
              <Button size="sm" variant="secondary" icon={Compass}>
                Browse Catalog
              </Button>
            </Link>
          </div>
        }
      />

      {/* Exercise 2: Reusable PageTitle with dynamic values */}
      <PageTitle
        title="Knowledge Discovery & Resource Portal"
        subtitle="Manage library inventory, member records, borrowing flows, and fine auditing seamlessly."
        badge="Platform v1.2"
        icon={Library}
      >
        <Link to="/dashboard">
          <Button variant="primary">Launch Dashboard</Button>
        </Link>
      </PageTitle>

      {/* Role Selection Demonstration */}
      <Card
        title="Explore by Your Academic Role"
        subtitle="Select your role to preview tailored services and lending privileges"
        badge="Interactive View"
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Viewing as:</span>
          {['Student', 'Faculty Researcher', 'Community Scholar', 'Guest'].map((role) => (
            <Button
              key={role}
              size="sm"
              variant={visitorRole === role ? 'primary' : 'secondary'}
              active={visitorRole === role}
              onClick={() => setVisitorRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>
        <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {visitorRole === 'Student' && 'Students can borrow up to 5 books for a duration of 14 days with renewal options.'}
          {visitorRole === 'Faculty Researcher' && 'Faculty members receive extended 30-day loans for up to 10 books with inter-library lending privileges.'}
          {visitorRole === 'Community Scholar' && 'Community scholars enjoy access to on-site reference archives and digital journals.'}
          {visitorRole === 'Guest' && 'Guests can search the open public catalog and review institutional borrowing regulations.'}
        </p>
      </Card>

      {/* Feature Highlights with Reusable Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        <Card
          title="Catalog & Inventory"
          subtitle="Real-time collection status"
          headerIcon={BookOpen}
          badge="1,420 Titles"
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Categorize titles, monitor ISBN registrations, and track book availability in real-time.
          </p>
          <Link to="/books">
            <Button size="sm" variant="secondary">View Catalog &rarr;</Button>
          </Link>
        </Card>

        <Card
          title="Member Management"
          subtitle="Student & faculty tracking"
          headerIcon={Users}
          badge="385 Active"
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Maintain active library memberships, verify borrowing allowances, and update contact profiles.
          </p>
          <Link to="/members">
            <Button size="sm" variant="secondary">View Members &rarr;</Button>
          </Link>
        </Card>

        <Card
          title="Circulation Desk"
          subtitle="Lending & return automation"
          headerIcon={ArrowRightLeft}
          badge="Auto Due Dates"
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Issue books rapidly, schedule return due dates, and calculate overdue penalties automatically.
          </p>
          <Link to="/borrowing">
            <Button size="sm" variant="secondary">Lending Desk &rarr;</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
