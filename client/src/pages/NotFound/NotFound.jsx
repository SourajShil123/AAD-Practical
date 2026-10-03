import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 20px',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--danger-light)',
          color: 'var(--danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <AlertCircle size={36} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)' }}>404</h1>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>
        Page Not Found
      </h2>
      <p style={{ maxWidth: '420px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
        The requested library page or resource does not exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" icon={Home}>
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
