import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from React Router
import Register from './Pages/Register.js';
import Login from './Pages/Login.js';
import Header from './Pages/Header';

function App() {
  return (
    <Router>
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
