import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import CounselorProfile from './pages/CounselorProfile';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import Privacy from './pages/Privacy';
import Refund from "./pages/Refund"
import Terms from './pages/Terms';
import Login from './pages/Login';
import CounselorIntro from './pages/CounselorIntro';
import Appointment from './pages/Appointment';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/counselor-profiles' exact element={
            <PrivateRoute>
              <CounselorProfile />
            </PrivateRoute>
          } />
          <Route path='/counselor/:id' exact element={
            <PrivateRoute>
              <CounselorIntro />
            </PrivateRoute>
          } />
          <Route path='/session/:sessionId' exact element={
            <PrivateRoute>
              <Appointment />
            </PrivateRoute>} />
          <Route path='/privacy' exact element={<Privacy />} />
          <Route path='/refund' exact element={<Refund />} />
          <Route path='/terms' exact element={<Terms />} />
          <Route path='/login' exact element={<Login />} />
          <Route path="*" element={<NotFound />}
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
