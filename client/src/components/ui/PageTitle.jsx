import React from 'react';

/**
 * Reusable PageTitle Component
 * Enhanced for Sprint 9 to accept dynamic props: title, subtitle, badge, icon, breadcrumbs, and action children.
 */
export default function PageTitle({
  title,
  subtitle,
  badge,
  icon: Icon,
  breadcrumbs,
  children,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`page-title-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-color)',
        ...style,
      }}
    >
      <div>
        {breadcrumbs && (
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}
          >
            {breadcrumbs}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {Icon && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
            >
              <Icon size={28} />
            </div>
          )}
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {badge && (
            <span
              className="badge badge-primary"
              style={{ fontSize: '0.75rem', padding: '3px 10px' }}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              marginTop: '4px',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children && <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>{children}</div>}
    </div>
  );
}
