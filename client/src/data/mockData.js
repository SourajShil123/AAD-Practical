/**
 * Central Library Resources & Mock Database
 * Contains seed datasets for catalog inventory, registered members, circulations, and fines.
 */

export const initialBooks = [
  { id: 'BK-101', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', isbn: '978-0132350884', copies: 5, available: 3, publishedYear: 2008 },
  { id: 'BK-102', title: 'Introduction to Algorithms (CLRS)', author: 'Thomas H. Cormen', category: 'Computer Science', isbn: '978-0262033848', copies: 8, available: 2, publishedYear: 2009 },
  { id: 'BK-103', title: 'Design Patterns (Gang of Four)', author: 'Erich Gamma et al.', category: 'Software Engineering', isbn: '978-0201633610', copies: 4, available: 4, publishedYear: 1994 },
  { id: 'BK-104', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: 'Web Development', isbn: '978-0596517748', copies: 6, available: 1, publishedYear: 2008 },
  { id: 'BK-105', title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'Database Systems', isbn: '978-0078022159', copies: 7, available: 5, publishedYear: 2019 },
  { id: 'BK-106', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', category: 'Artificial Intelligence', isbn: '978-0136042594', copies: 3, available: 0, publishedYear: 2020 },
  { id: 'BK-107', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Distributed Systems', isbn: '978-1449373320', copies: 6, available: 4, publishedYear: 2017 },
  { id: 'BK-108', title: 'Computer Networking: Top-Down Approach', author: 'James Kurose & Keith Ross', category: 'Networking', isbn: '978-0133594140', copies: 5, available: 3, publishedYear: 2021 },
  { id: 'BK-109', title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', category: 'Software Engineering', isbn: '978-0135957059', copies: 7, available: 6, publishedYear: 2019 },
  { id: 'BK-110', title: 'Operating System Concepts (Dinosaur Book)', author: 'Abraham Silberschatz', category: 'Computer Science', isbn: '978-1119800361', copies: 5, available: 2, publishedYear: 2021 },
];

export const initialMembers = [
  { id: 'MEM-001', name: 'Rahul Sharma', email: 'rahul.s@univ.edu', department: 'Computer Science', role: 'Student', borrowedCount: 2, status: 'Active' },
  { id: 'MEM-002', name: 'Dr. Priya Desai', email: 'priya.d@univ.edu', department: 'Information Technology', role: 'Faculty', borrowedCount: 4, status: 'Active' },
  { id: 'MEM-003', name: 'Ananya Verma', email: 'ananya.v@univ.edu', department: 'Computer Science', role: 'Student', borrowedCount: 1, status: 'Active' },
  { id: 'MEM-004', name: 'Vikram Patel', email: 'vikram.p@univ.edu', department: 'Electrical Engineering', role: 'Student', borrowedCount: 3, status: 'Suspended' },
  { id: 'MEM-005', name: 'Sneha Roy', email: 'sneha.r@univ.edu', department: 'Mechanical Engineering', role: 'Student', borrowedCount: 0, status: 'Active' },
  { id: 'MEM-006', name: 'Dr. Arindam Das', email: 'arindam.d@univ.edu', department: 'Data Science', role: 'Faculty', borrowedCount: 2, status: 'Active' },
];

export const initialCirculation = [
  { id: 'BRW-1001', member: 'Rahul Sharma (MEM-001)', book: 'Introduction to Algorithms (BK-102)', issueDate: '2026-10-01', dueDate: '2026-10-15', status: 'Active' },
  { id: 'BRW-1002', member: 'Ananya Verma (MEM-003)', book: 'Clean Code (BK-101)', issueDate: '2026-10-02', dueDate: '2026-10-16', status: 'Active' },
  { id: 'BRW-1003', member: 'Vikram Patel (MEM-004)', book: 'Database System Concepts (BK-105)', issueDate: '2026-09-18', dueDate: '2026-10-02', status: 'Overdue' },
  { id: 'BRW-1004', member: 'Dr. Priya Desai (MEM-002)', book: 'Designing Data-Intensive Applications (BK-107)', issueDate: '2026-10-03', dueDate: '2026-11-03', status: 'Active' },
];

export const initialFines = [
  { id: 'FN-301', member: 'Vikram Patel', book: 'Designing Data-Intensive Applications', daysOverdue: 8, amount: 16.00, status: 'Pending' },
  { id: 'FN-302', member: 'Amit Joshi', book: 'Artificial Intelligence: A Modern Approach', daysOverdue: 2, amount: 4.00, status: 'Paid' },
  { id: 'FN-303', member: 'Rohit Gupta', book: 'Operating System Concepts', daysOverdue: 14, amount: 28.00, status: 'Pending' },
  { id: 'FN-304', member: 'Ananya Verma', book: 'Computer Networks (Tanenbaum)', daysOverdue: 5, amount: 10.00, status: 'Paid' },
];
