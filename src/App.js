import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import CounselorProfile from './pages/CounselorProfile';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import ContactUs from './pages/ContactUs';
import Privacy from './pages/Privacy';
import Refund from "./pages/Refund"
import Terms from './pages/Terms';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/counselor-profiles' exact element={<CounselorProfile />} />
          <Route path='/contact' exact element={<ContactUs />} />
          <Route path='/privacy' exact element={<Privacy />} />
          <Route path='/refund' exact element={<Refund />} />
          <Route path='/terms' exact element={<Terms />} />
          <Route path='/login' exact element={<Login />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
