import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Users from './pages/Users';
import Toolbar from './components/Toolbar';
import Home from './pages/Home';

class App extends React.Component {
  render () {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path="/users" exact element={<Users />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    )
  }
}

export default App;
