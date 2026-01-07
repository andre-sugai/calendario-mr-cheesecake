
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mr-cheesecake" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/:clientSlug" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;