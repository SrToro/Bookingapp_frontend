import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import UserPage from './pages/User';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';


function App() {

  //remember use use const and initial states because we are using functional based app, not class based


  //can use the state to manipulate the context value that pass down to all children
  const [state, setState] = useState({
    token: null,
    userId: null,

  })
  // allows call something on our context and implicitly call method login wich then turn the state of the funct
  const login = (token, userId, tokenExpiration) => {
    setState({
      token: token,
      userId: userId
    })
  }

  //to logout set all the data getted before and set to null 
  const logout = () => {
    setState({
      token: null,
      userId: null
    })
  }

  //conditional setings if the user is log or not to the routes, rn if we change the path from the browser we lost the Login values so the user logout automatically
  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{ 
          token: state.token, 
          userId: state.userId, 
          login: login, 
          logout: logout 
        }}> 
          <MainNavigation /> 
          <main className='main-content'> 
            <Routes> 
              {!state.token && <Route path="/" element={<Navigate to="/auth" />} />} 
              {!state.token && <Route path="/bookings" element={<Navigate to="/auth" />} />} 
              {!state.token && <Route path="/user" element={<Navigate to="/auth" />} />} 
              {state.token && <Route path="/" element={<Navigate to="/events" />} />} 
              {!state.token && <Route path="/auth" element={<AuthPage />} />} 
              {state.token && <Route path="/auth" element={<Navigate to="/events" />} />}
              {state.token && <Route path='/user' element={<UserPage />} />}
              <Route path='/events' element={<EventsPage />} />
              {state.token && <Route path='/bookings' element={<BookingsPage />} />}
            </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}


export default App;
