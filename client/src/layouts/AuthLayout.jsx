import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Library } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        padding: '24px',
      }}
    >
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'var(--primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              display: 'flex',
            }}
          >
            <Library size={24} />
          </div>
          <span>Library Management System</span>
        </Link>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: '36px',
        }}
      >
        <Outlet />
      </div>

      <div style={{ marginTop: '24px', color: '#64748b', fontSize: '0.85rem' }}>
        &copy; {CURRENT_YEAR} Library Management System
      </div>
    </div>
  );
}
