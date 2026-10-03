import React from 'react';
import { Building2, ShieldCheck, Clock, BookMarked } from 'lucide-react';

/**
 * Reusable Dynamic Welcome Component (Exercise 1)
 * 
 * Demonstrates:
 * - Receiving dynamic data via React Props from a parent component
 * - Displaying dynamic values without hardcoding:
 *   - User Name (userName)
 *   - Project Name (projectName)
 *   - Dashboard Title (dashboardTitle)
 *   - Organization Name (organizationName)
 *   - Role, Status, and Custom Greeting Messages
 * - Conditional rendering based on props (e.g. isLoggedIn, badge)
 */
export default function Welcome({
  userName = 'Guest User',
  projectName = 'Library Management System',
  dashboardTitle = 'System Overview',
  organizationName = 'Central University Library',
  role = 'Operator',
  message,
  lastLogin,
  isLoggedIn = true,
  badge,
  actions,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`welcome-banner ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Decorative background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1, minWidth: '280px' }}>
          {/* Metadata Badges from Props */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              <Building2 size={13} />
              {organizationName}
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <BookMarked size={13} />
              {projectName}
            </span>

            {badge && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                <ShieldCheck size={12} />
                {badge}
              </span>
            )}
          </div>

          {/* Dynamic Greeting & User Information from Props */}
          <h2
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {isLoggedIn ? (
              <>
                <span>Welcome back, {userName}!</span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {role}
                </span>
              </>
            ) : (
              <span>Welcome to {projectName}</span>
            )}
          </h2>

          {/* Dashboard Title & Dynamic Message */}
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#c7d2fe',
              marginBottom: '6px',
            }}
          >
            {dashboardTitle}
          </p>

          <p
            style={{
              fontSize: '0.9rem',
              opacity: 0.9,
              lineHeight: 1.5,
              maxWidth: '680px',
            }}
          >
            {message ||
              `Signed in to ${organizationName}. All circulation records and inventory data are synced with real-time state.`}
          </p>

          {lastLogin && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                opacity: 0.8,
                marginTop: '10px',
              }}
            >
              <Clock size={13} />
              <span>Session Active • {lastLogin}</span>
            </div>
          )}
        </div>

        {/* Dynamic Actions Passed via Props */}
        {actions && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '10px',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
