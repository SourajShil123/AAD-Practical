import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ArrowRightLeft,
  RotateCcw,
  Receipt,
  UserCheck,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/books', label: 'Books Catalog', icon: BookOpen },
  { path: '/members', label: 'Members', icon: Users },
  { path: '/borrowing', label: 'Borrowing', icon: ArrowRightLeft },
  { path: '/returns', label: 'Returns', icon: RotateCcw },
  { path: '/fines', label: 'Fine Management', icon: Receipt },
  { path: '/profile', label: 'Staff Profile', icon: UserCheck },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        color: 'var(--text-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1e293b',
        padding: '24px 16px',
        flexShrink: 0,
      }}
    >
      <div style={{ marginBottom: '24px', paddingLeft: '12px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 700,
            color: '#64748b',
          }}
        >
          Management Portal
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive ? 'var(--text-sidebar-active)' : 'var(--text-sidebar)',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                transition: 'all 0.15s ease',
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div
        style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '16px',
          paddingLeft: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: '#64748b',
        }}
      >
        <HelpCircle size={16} />
        <span>Library System v1.0.0</span>
      </div>
    </aside>
  );
}
