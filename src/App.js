import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/Auth';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path='/events' element={null} />
        <Route path='/bookings' element={null} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
