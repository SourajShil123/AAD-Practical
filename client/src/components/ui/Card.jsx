import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Reusable Card Component
 * Enhanced for Sprint 9 with configurable props: title, subtitle, badge, action,
 * headerIcon, collapsible toggle with internal state, and footer.
 */
export default function Card({
  title,
  subtitle,
  children,
  action,
  className = '',
  style = {},
  headerIcon: Icon,
  badge,
  footer,
  collapsible = false,
  defaultOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    if (collapsible) {
      setIsOpen((prev) => !prev);
    }
  };

  const hasHeader = title || subtitle || Icon || action || badge || collapsible;

  return (
    <div
      className={`card ${className}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        padding: '24px',
        marginBottom: '20px',
        transition: 'box-shadow 0.2s ease',
        ...style,
      }}
    >
      {hasHeader && (
        <div
          onClick={collapsible ? toggleOpen : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: children && isOpen ? '18px' : 0,
            paddingBottom: children && isOpen ? '14px' : 0,
            borderBottom: children && isOpen ? '1px solid var(--border-light)' : 'none',
            cursor: collapsible ? 'pointer' : 'default',
            userSelect: collapsible ? 'none' : 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {Icon && <Icon size={20} style={{ color: 'var(--primary)' }} />}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {title && (
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      margin: 0,
                    }}
                  >
                    {title}
                  </h3>
                )}
                {badge && (
                  <span
                    className="badge badge-primary"
                    style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p
                  style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                    margin: 0,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {action && <div>{action}</div>}
            {collapsible && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpen();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
                title={isOpen ? 'Collapse card' : 'Expand card'}
              >
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            )}
          </div>
        </div>
      )}

      {isOpen && children}

      {isOpen && footer && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
