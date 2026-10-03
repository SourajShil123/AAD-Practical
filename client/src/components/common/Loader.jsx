import React from 'react';

export default function Loader({ message = 'Loading...', size = 'md' }) {
  const sizes = {
    sm: 20,
    md: 36,
    lg: 48,
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        gap: '12px',
        color: 'var(--text-muted)',
      }}
    >
      <div
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          border: '3px solid var(--border-color)',
          borderTop: '3px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {message && <span style={{ fontSize: '0.875rem' }}>{message}</span>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
