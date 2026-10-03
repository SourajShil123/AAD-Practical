/**
 * Utility formatting functions for the Library Management System
 */

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? dateString
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
};

export const formatCurrency = (amount) => {
  const num = Number(amount);
  return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
};

export const formatISBN = (isbn) => {
  if (!isbn) return '';
  const clean = isbn.replace(/[^0-9X]/gi, '');
  if (clean.length === 13) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 4)}-${clean.slice(4, 9)}-${clean.slice(9, 12)}-${clean.slice(12)}`;
  }
  return isbn;
};

export const truncateText = (text, maxLength = 60) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
