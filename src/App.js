import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Users from './pages/Users';
import Toolbar from './components/Toolbar';
import Home from './pages/Home';
import Counselors from './pages/Counselors';

class App extends React.Component {
  render () {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path="/users" exact element={<Users />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/counselors" exact element={<Counselors />} />
        </Routes>
      </div>
    )
  }
}

export default App;
