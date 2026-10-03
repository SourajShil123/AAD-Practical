import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Library, LogIn, User, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700,
          fontSize: '1.2rem',
          color: 'var(--primary)',
        }}
      >
        <div
          style={{
            background: 'var(--primary)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Library size={22} />
        </div>
        <span>LibMaster</span>
      </Link>

      {/* Top Navigation Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontSize: '0.9rem',
            fontWeight: 500,
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
            transition: 'all 0.2s',
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            fontSize: '0.9rem',
            fontWeight: 500,
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
            transition: 'all 0.2s',
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/books"
          style={({ isActive }) => ({
            fontSize: '0.9rem',
            fontWeight: 500,
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
            transition: 'all 0.2s',
          })}
        >
          Books
        </NavLink>
      </nav>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-body)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <Search size={15} />
          <span>Quick Search...</span>
        </div>

        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            padding: '6px',
            borderRadius: '50%',
            transition: 'color 0.2s',
          }}
          title="User Profile"
        >
          <User size={20} />
        </Link>

        <Link
          to="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: 'var(--primary)',
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            transition: 'background-color 0.2s',
          }}
        >
          <LogIn size={16} />
          <span>Login</span>
        </Link>
      </div>
    </header>
  );
}
