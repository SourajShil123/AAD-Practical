import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/ui/PageTitle';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Welcome from '../../components/ui/Welcome';
import {
  BookOpen,
  Users,
  ArrowRightLeft,
  Receipt,
  PlusCircle,
  Search,
  Bell,
  AlertTriangle,
  RotateCcw,
  Plus,
  Minus,
  LogIn,
  LogOut,
} from 'lucide-react';

const statsData = {
  today: [
    { title: 'Total Books in Catalog', value: '1,420', change: '+3 new cataloged today', icon: BookOpen, color: '#4f46e5', bg: '#eef2ff' },
    { title: 'Active Walk-in Members', value: '42', change: '+5 new registrations today', icon: Users, color: '#0ea5e9', bg: '#f0f9ff' },
    { title: 'Books Issued Today', value: '18', change: 'All returns on time', icon: ArrowRightLeft, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Fines Collected Today', value: '$24', change: '3 penalties cleared', icon: Receipt, color: '#f59e0b', bg: '#fffbeb' },
  ],
  week: [
    { title: 'Total Books in Catalog', value: '1,420', change: '+12 added this week', icon: BookOpen, color: '#4f46e5', bg: '#eef2ff' },
    { title: 'Active Weekly Members', value: '385', change: '+24 new this week', icon: Users, color: '#0ea5e9', bg: '#f0f9ff' },
    { title: 'Weekly Borrowed Books', value: '114', change: '84% on schedule', icon: ArrowRightLeft, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Pending Fines', value: '$420', change: '18 overdue records', icon: Receipt, color: '#f59e0b', bg: '#fffbeb' },
  ],
  month: [
    { title: 'Total Books in Catalog', value: '1,420', change: '+48 added this month', icon: BookOpen, color: '#4f46e5', bg: '#eef2ff' },
    { title: 'Monthly Active Members', value: '890', change: '+92 new this month', icon: Users, color: '#0ea5e9', bg: '#f0f9ff' },
    { title: 'Monthly Borrowed Books', value: '462', change: '91% on schedule', icon: ArrowRightLeft, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Pending Fines', value: '$1,150', change: '42 overdue records', icon: Receipt, color: '#f59e0b', bg: '#fffbeb' },
  ],
  all: [
    { title: 'Total Books in Catalog', value: '1,420', change: 'Cumulative total inventory', icon: BookOpen, color: '#4f46e5', bg: '#eef2ff' },
    { title: 'Total Registered Members', value: '1,250', change: 'All active & alumni accounts', icon: Users, color: '#0ea5e9', bg: '#f0f9ff' },
    { title: 'All-Time Circulations', value: '3,840', change: 'Lifetime borrowing events', icon: ArrowRightLeft, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Lifetime Fines Assessed', value: '$3,420', change: '89% collection rate', icon: Receipt, color: '#f59e0b', bg: '#fffbeb' },
  ],
};

const initialTransactions = [
  { id: 'TXN-101', member: 'Rahul Sharma', book: 'Introduction to Algorithms (CLRS)', date: 'Oct 3, 2026', due: 'Oct 17, 2026', status: 'Borrowed' },
  { id: 'TXN-102', member: 'Ananya Verma', book: 'Clean Code: Handbook of Agile Software', date: 'Oct 2, 2026', due: 'Oct 16, 2026', status: 'Borrowed' },
  { id: 'TXN-103', member: 'Vikram Patel', book: 'Designing Data-Intensive Applications', date: 'Sep 25, 2026', due: 'Oct 02, 2026', status: 'Overdue' },
  { id: 'TXN-104', member: 'Sneha Roy', book: 'You Don\'t Know JS: Scope & Closures', date: 'Sep 20, 2026', due: 'Oct 01, 2026', status: 'Returned' },
  { id: 'TXN-105', member: 'Amit Joshi', book: 'Artificial Intelligence: Modern Approach', date: 'Sep 18, 2026', due: 'Sep 28, 2026', status: 'Returned' },
];

export default function Dashboard() {
  // Exercise 3: Component State using useState
  const [operatorName, setOperatorName] = useState('Souraj Shil');
  const [operatorRole, setOperatorRole] = useState('Head Librarian');
  const [timeframe, setTimeframe] = useState('week'); // 'today' | 'week' | 'month' | 'all'
  const [counter, setCounter] = useState(14); // Quick Circulation Counter
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Conditional rendering state
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [showNotifications, setShowNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Exercise 4 & 5: Event handlers updating state
  const handleIncrement = () => setCounter((prev) => prev + 1);
  const handleDecrement = () => setCounter((prev) => Math.max(0, prev - 1));
  const handleResetCounter = () => setCounter(0);
  const handleDismissNotification = () => {
    setNotificationsCount((prev) => Math.max(0, prev - 1));
  };

  // Filtered transactions (Exercise 5 & 6: User Input + Conditional Rendering)
  const currentStats = statsData[timeframe] || statsData.week;

  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesSearch =
      tx.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Exercise 1 & 2: Dynamic Welcome Component Receiving Values via Props */}
      <Welcome
        userName={operatorName}
        role={operatorRole}
        projectName="Library Management System"
        organizationName="Apex Central University Library"
        dashboardTitle="Central Operational Hub & Analytics"
        message={`Currently tracking ${currentStats[2].value} active borrowings and ${counter} on-desk manual circulations.`}
        lastLogin="Today at 00:30 AM"
        isLoggedIn={isLoggedIn}
        badge={isLoggedIn ? 'Active Administrator' : 'Visitor Mode'}
        actions={
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={isLoggedIn ? 'secondary' : 'primary'}
              icon={isLoggedIn ? LogOut : LogIn}
              onClick={() => setIsLoggedIn((prev) => !prev)}
            >
              {isLoggedIn ? 'Simulate Log Out' : 'Simulate Log In'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              icon={Bell}
              onClick={() => setShowNotifications((prev) => !prev)}
              style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
            >
              {showNotifications ? 'Hide Alerts' : `Alerts (${notificationsCount})`}
            </Button>
          </div>
        }
      />

      {/* Exercise 2: Reusable PageTitle with Dynamic Props */}
      <PageTitle
        title="System Overview Dashboard"
        subtitle={`Displaying metrics for ${timeframe.toUpperCase()} • ${counter} walk-in circulations recorded`}
        badge={`Filter: ${timeframe.toUpperCase()}`}
      >
        <Link to="/borrowing">
          <Button icon={PlusCircle} disabled={!isLoggedIn}>
            New Circulation
          </Button>
        </Link>
      </PageTitle>

      {/* Exercise 6: Conditional Rendering - Authentication Status Banner */}
      {!isLoggedIn && (
        <div
          style={{
            backgroundColor: 'var(--warning-light)',
            color: '#b45309',
            border: '1px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            padding: '14px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} />
            <div>
              <strong>Guest / Read-Only Mode:</strong> Please log in with administrator privileges to issue books, process returns, or modify catalog records.
            </div>
          </div>
          <Button size="sm" variant="primary" onClick={() => setIsLoggedIn(true)}>
            Log In Now
          </Button>
        </div>
      )}

      {/* Exercise 6: Conditional Rendering - Notification Drawer */}
      {showNotifications && (
        <div
          style={{
            backgroundColor: notificationsCount > 0 ? '#eff6ff' : '#f8fafc',
            border: `1px solid ${notificationsCount > 0 ? '#bfdbfe' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} style={{ color: notificationsCount > 0 ? 'var(--primary)' : 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {notificationsCount > 0
                ? `System Notice: ${notificationsCount} overdue books require follow-up reminders today.`
                : 'All caught up! There are no pending overdue alert notices.'}
            </span>
          </div>
          {notificationsCount > 0 ? (
            <Button size="sm" variant="ghost" onClick={handleDismissNotification}>
              Dismiss Alert
            </Button>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => setNotificationsCount(2)}>
              Reset Alerts
            </Button>
          )}
        </div>
      )}

      {/* Interactive Controls Bar: Timeframe Filter State & Live Inputs */}
      <Card
        title="Interactive State & Event Controls"
        subtitle="Test dynamic props, state updating hooks, button click events, and live input binding"
        badge="Sprint 9 Interactive Lab"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            alignItems: 'flex-start',
          }}
        >
          {/* Exercise 4: Timeframe Filter Buttons */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '8px',
              }}
            >
              1. Switch Metric Timeframe (useState + onClick):
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['today', 'week', 'month', 'all'].map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={timeframe === t ? 'primary' : 'secondary'}
                  active={timeframe === t}
                  onClick={() => setTimeframe(t)}
                >
                  {t === 'today' ? 'Today' : t === 'week' ? 'This Week' : t === 'month' ? 'This Month' : 'All-Time'}
                </Button>
              ))}
            </div>
          </div>

          {/* Exercise 3 & 4: Quick Circulation Counter */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '8px',
              }}
            >
              2. Walk-in Circulation Counter (State: {counter}):
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button size="sm" variant="secondary" icon={Minus} onClick={handleDecrement} disabled={counter <= 0}>
                -1
              </Button>
              <span
                style={{
                  minWidth: '48px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '4px 10px',
                  background: 'var(--bg-body)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {counter}
              </span>
              <Button size="sm" variant="primary" icon={Plus} onClick={handleIncrement}>
                +1 Issue
              </Button>
              <Button size="sm" variant="ghost" icon={RotateCcw} onClick={handleResetCounter} title="Reset Counter">
                Reset
              </Button>
            </div>
          </div>

          {/* Exercise 5: Live User Input Event */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '8px',
              }}
            >
              3. Live Operator Info (onChange inputs):
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Input
                placeholder="Type operator name..."
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                style={{ margin: 0 }}
              />
              <Input
                placeholder="Type operator role..."
                value={operatorRole}
                onChange={(e) => setOperatorRole(e.target.value)}
                style={{ margin: 0 }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Dynamically updates Welcome component props on each keystroke.
            </span>
          </div>
        </div>
      </Card>

      {/* KPI Stats Grid - Dynamically Rendered Based on Timeframe State */}
      <div className="stat-grid">
        {currentStats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="stat-card">
              <div className="stat-info">
                <p>{s.title}</p>
                <h3>{s.value}</h3>
                <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: 600 }}>
                  {s.change}
                </span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: s.bg, color: s.color }}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Transactions Table with Search & Status Filter */}
        <Card
          title="Recent Circulation Activity"
          subtitle={`Showing ${filteredTransactions.length} of ${initialTransactions.length} records`}
          action={
            <Link to="/borrowing">
              <Button size="sm" variant="secondary">View All</Button>
            </Link>
          }
        >
          {/* Table Search & Filter Bar (Exercise 5: Input event) */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}
          >
            <div style={{ flex: 1, minWidth: '200px' }}>
              <Input
                placeholder="Search member, book, or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                style={{ margin: 0 }}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Borrowed', 'Returned', 'Overdue'].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={statusFilter === status ? 'primary' : 'secondary'}
                  active={statusFilter === status}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Exercise 6: Conditional Rendering - Data Available vs No Data */}
          {filteredTransactions.length > 0 ? (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>Member</th>
                    <th>Book Title</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{tx.id}</td>
                      <td>{tx.member}</td>
                      <td>{tx.book}</td>
                      <td>{tx.due}</td>
                      <td>
                        <span
                          className={`badge ${
                            tx.status === 'Returned'
                              ? 'badge-success'
                              : tx.status === 'Overdue'
                              ? 'badge-danger'
                              : 'badge-primary'
                          }`}
                        >
                          {tx.status}
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
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>No Transactions Found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                No circulation records match your filter criteria: "{searchQuery || statusFilter}".
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }}
              >
                Clear Search & Filter
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Actions Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card title="Quick Management" subtitle="Frequent administrative tasks" collapsible>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/books" style={{ width: '100%' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }} icon={BookOpen}>
                  Manage Books Catalog
                </Button>
              </Link>
              <Link to="/members" style={{ width: '100%' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }} icon={Users}>
                  Register New Member
                </Button>
              </Link>
              <Link to="/borrowing" style={{ width: '100%' }}>
                <Button
                  variant="outline"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  icon={ArrowRightLeft}
                  disabled={!isLoggedIn}
                >
                  Process Circulation Issue
                </Button>
              </Link>
              <Link to="/fines" style={{ width: '100%' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }} icon={Receipt}>
                  Review Overdue Fines
                </Button>
              </Link>
            </div>
          </Card>

          <Card title="System Health & State" subtitle="MERN Connectivity & Runtime" badge="Live">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Backend Express API</span>
                <span className="badge badge-success">Online (:5000)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Vite Frontend Client</span>
                <span className="badge badge-success">Ready (:5173)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>React State Engine</span>
                <span className="badge badge-primary">useState Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Active Session Mode</span>
                <span className={`badge ${isLoggedIn ? 'badge-success' : 'badge-warning'}`}>
                  {isLoggedIn ? 'Authenticated' : 'Guest'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
