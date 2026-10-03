import React from 'react';

/**
 * Reusable Button Component
 * Supports dynamic props: variant, size, icon, active, disabled, onClick, and standard button attributes.
 * Enhanced for Sprint 9 to support interactive event handling and active state toggles.
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary | secondary | danger | outline | success | ghost
  size = 'md',         // sm | md | lg
  disabled = false,
  active = false,
  className = '',
  icon: Icon,
  style = {},
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '500',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    userSelect: 'none',
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '0.8rem' },
    md: { padding: '9px 18px', fontSize: '0.875rem' },
    lg: { padding: '12px 24px', fontSize: '1rem' },
  };

  const variants = {
    primary: {
      backgroundColor: active ? 'var(--primary-hover)' : 'var(--primary)',
      color: '#ffffff',
      borderColor: 'var(--primary)',
      boxShadow: active ? '0 0 0 2px var(--primary-glow)' : 'none',
    },
    secondary: {
      backgroundColor: active ? 'var(--border-color)' : '#f1f5f9',
      color: 'var(--text-main)',
      borderColor: 'var(--border-color)',
    },
    danger: {
      backgroundColor: 'var(--danger)',
      color: '#ffffff',
      borderColor: 'var(--danger)',
    },
    success: {
      backgroundColor: 'var(--success)',
      color: '#ffffff',
      borderColor: 'var(--success)',
    },
    outline: {
      backgroundColor: active ? 'var(--primary-light)' : 'transparent',
      color: 'var(--primary)',
      borderColor: 'var(--primary)',
      fontWeight: active ? 600 : 500,
    },
    ghost: {
      backgroundColor: active ? 'var(--border-light)' : 'transparent',
      color: 'var(--text-main)',
      borderColor: 'transparent',
    },
  };

  const currentStyle = {
    ...baseStyles,
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary),
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={currentStyle}
      className={`btn btn-${variant} ${active ? 'btn-active' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
}
