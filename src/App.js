import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Users from './pages/Users';
import Toolbar from './components/Toolbar';
import Home from './pages/Home';
import Counselors from './pages/Counselors';
import Session from './pages/Session';
import Appointments from './pages/Appointments';
import Queries from './pages/Queries';
import Bookings from './pages/Bookings';
import SecurityPage from './pages/SecurityPage';
import PrivateRoute from './components/PrivateRoute';
import Coupon from './pages/Coupon';

class App extends React.Component {
  render () {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path="/users" exact element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/" exact element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/counselors" exact element={<PrivateRoute><Counselors /></PrivateRoute>} />
          <Route path="/sessions" exact element={<PrivateRoute><Session /></PrivateRoute>} />
          <Route path="/appointments" exact element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/queries" exact element={<PrivateRoute><Queries /></PrivateRoute>} />
          <Route path="/bookings" exact element={<PrivateRoute><Bookings /></PrivateRoute>} />
          <Route path="/coupons" exact element={<PrivateRoute><Coupon /></PrivateRoute>} />
          <Route path="/login" exact element={<SecurityPage />} />
        </Routes>
      </div>
    )
  }
}

export default App;
