import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/Auth';

import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" component={AuthPage} />
          <Route path='/events' component={null} />
          <Route path='/bookings' component={null} />
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
