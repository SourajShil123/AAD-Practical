import React from 'react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        padding: '18px 32px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div>
        <strong>Library Management System</strong> | Sprint 1 to 7 Guided Practical
      </div>
      <div>
        (c) {CURRENT_YEAR} All Rights Reserved | Developed by Souraj Shil
      </div>
    </footer>
  );
}
