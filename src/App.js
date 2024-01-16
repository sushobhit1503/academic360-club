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

class App extends React.Component {
  render () {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path="/users" exact element={<Users />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/counselors" exact element={<Counselors />} />
          <Route path="/sessions" exact element={<Session />} />
          <Route path="/appointments" exact element={<Appointments />} />
          <Route path="/queries" exact element={<Queries />} />
          <Route path="/bookings" exact element={<Bookings />} />
        </Routes>
      </div>
    )
  }
}

export default App;
