/**
 * Validation utilities for client-side forms
 */

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
};

export const isValidISBN = (isbn) => {
  const clean = String(isbn || '').replace(/[- ]|^ISBN(?:-1[03])?:?/gi, '');
  return clean.length === 10 || clean.length === 13;
};

export const isValidPhone = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};
