import React from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className={`form-group ${className}`} style={{ marginBottom: '16px' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '6px',
            color: 'var(--text-main)',
          }}
        >
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              color: 'var(--text-muted)',
            }}
          >
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            width: '100%',
            padding: '10px 14px',
            paddingLeft: Icon ? '38px' : '14px',
            fontSize: '0.875rem',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#ffffff',
            color: 'var(--text-main)',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          {...props}
        />
      </div>
      {error && (
        <p style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
