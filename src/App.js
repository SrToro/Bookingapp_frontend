import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import UserPage from './pages/User';
import MainNavigation from './components/Navigation/MainNavigation';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/bookings' element={<BookingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}


export default App;
