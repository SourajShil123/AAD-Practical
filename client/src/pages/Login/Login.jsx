import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { LogIn, Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@library.edu');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Sign In
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
          Enter credentials to access the Library Management System
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          required
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            marginBottom: '20px',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Remember me</span>
          </label>
          <a href="#forgot" style={{ color: 'var(--primary)', fontWeight: 500 }}>
            Forgot Password?
          </a>
        </div>

        <Button type="submit" variant="primary" icon={LogIn} style={{ width: '100%' }}>
          Log In to Portal
        </Button>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>
            &larr; Back to Public Home
          </Link>
        </div>
      </form>
    </div>
  );
}
