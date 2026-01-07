
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import LoginPage from './LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;