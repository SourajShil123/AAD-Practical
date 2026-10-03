import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Books from '../pages/Books/Books';
import Members from '../pages/Members/Members';
import Borrowing from '../pages/Borrowing/Borrowing';
import Returns from '../pages/Returns/Returns';
import Fines from '../pages/Fines/Fines';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Authentication Route */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main Application Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/borrowing" element={<Borrowing />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/fines" element={<Fines />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
